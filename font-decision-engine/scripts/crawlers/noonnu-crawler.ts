// scripts/crawlers/noonnu-crawler.ts
// Crawler for noonnu.cc Korean free fonts

import { RateLimiter, retryWithBackoff, delay } from './utils/rate-limiter';
import {
  mapLicenseType,
  parsePermission,
  extractWeightCount,
  mapCategory,
  generateSlug,
  extractTags,
} from './utils/license-mapper';
import type { NoonuuRawFont, ProcessedFont, CrawlResult, CrawlError, CrawlOptions } from './types';

const NOONNU_BASE_URL = 'https://noonnu.cc';
const FONTS_LIST_URL = `${NOONNU_BASE_URL}/font_page`;

/**
 * Parse HTML using regex (simple DOM-like extraction)
 * Note: For production, consider using cheerio or jsdom
 */
function extractText(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match ? match[1].trim() : null;
}

/**
 * Noonnu.cc crawler class
 */
export class NoonuuCrawler {
  private rateLimiter: RateLimiter;
  private errors: CrawlError[] = [];

  constructor() {
    // 1 request per second to be respectful
    this.rateLimiter = new RateLimiter(1, 1);
  }

  /**
   * Fetch a URL with rate limiting and retries
   */
  private async fetch(url: string): Promise<string> {
    await this.rateLimiter.acquire();

    return retryWithBackoff(
      async () => {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Sense-Typing-Crawler/1.0',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'ko-KR,ko;q=0.9',
          },
        });

        if (response.status === 429) {
          this.rateLimiter.rateLimited();
          throw new Error('Rate limited');
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        this.rateLimiter.success();
        return response.text();
      },
      {
        maxRetries: 3,
        initialDelayMs: 2000,
        shouldRetry: (error) => error.message.includes('Rate limited') || error.message.includes('5'),
      }
    );
  }

  /**
   * Get list of font IDs from the main listing page
   */
  async getFontIds(page: number = 1): Promise<string[]> {
    const url = `${FONTS_LIST_URL}?page=${page}`;
    console.log(`Fetching font list page ${page}...`);

    try {
      const html = await this.fetch(url);

      // Extract font IDs from href="/font_page/123" patterns
      const idPattern = /href="\/font_page\/(\d+)"/g;
      const ids = new Set<string>();
      let match;

      while ((match = idPattern.exec(html)) !== null) {
        ids.add(match[1]);
      }

      return Array.from(ids);
    } catch (error) {
      this.errors.push({
        error_type: 'fetch',
        message: `Failed to fetch page ${page}: ${(error as Error).message}`,
      });
      return [];
    }
  }

  /**
   * Parse individual font page
   */
  async parseFontPage(fontId: string): Promise<NoonuuRawFont | null> {
    const url = `${NOONNU_BASE_URL}/font_page/${fontId}`;
    console.log(`Parsing font ${fontId}...`);

    try {
      const html = await this.fetch(url);

      // Extract font name - usually in h1 or title
      const name = extractText(html, /<h1[^>]*>([^<]+)<\/h1>/i)
        || extractText(html, /<title>([^|<]+)/i)
        || `Font ${fontId}`;

      // Extract foundry/maker
      const foundry = extractText(html, /제작[자사]?\s*[:：]?\s*([^<\n]+)/i)
        || extractText(html, /maker[^>]*>([^<]+)/i)
        || '알 수 없음';

      // Extract license text
      const licenseText = extractText(html, /라이선스\s*[:：]?\s*([^<\n]+)/i)
        || extractText(html, /license[^>]*>([^<]+)/i)
        || 'free';

      // Extract category
      const category = extractText(html, /카테고리\s*[:：]?\s*([^<\n]+)/i)
        || extractText(html, /분류\s*[:：]?\s*([^<\n]+)/i)
        || '기타';

      // Extract preview image
      const previewImage = extractText(html, /preview[^>]*src="([^"]+)"/i)
        || extractText(html, /<img[^>]*class="[^"]*font[^"]*"[^>]*src="([^"]+)"/i);

      // Extract description
      const description = extractText(html, /description[^>]*>([^<]+)/i)
        || extractText(html, /소개\s*[:：]?\s*([^<\n]+)/i)
        || '';

      // Extract permissions (try to find license table)
      const permissions = {
        printing: this.extractPermission(html, '인쇄'),
        website: this.extractPermission(html, '웹'),
        video: this.extractPermission(html, '영상'),
        embedding: this.extractPermission(html, '임베딩'),
        packaging: this.extractPermission(html, '포장'),
        bi_ci: this.extractPermission(html, 'BI|CI'),
      };

      // Extract weight count
      const weightText = extractText(html, /(\d+\s*가지\s*굵기)/i) || '';
      const weightCount = extractWeightCount(weightText);

      return {
        noonnu_id: fontId,
        name: this.cleanText(name),
        foundry: this.cleanText(foundry),
        license_text: licenseText,
        permissions,
        preview_image_url: previewImage || undefined,
        category: this.cleanText(category),
        weight_count: weightCount,
        description: this.cleanText(description),
      };
    } catch (error) {
      this.errors.push({
        font_id: fontId,
        error_type: 'parse',
        message: `Failed to parse font ${fontId}: ${(error as Error).message}`,
      });
      return null;
    }
  }

  /**
   * Extract permission from HTML
   */
  private extractPermission(html: string, permissionName: string): boolean {
    const pattern = new RegExp(`${permissionName}[^<]*<[^>]*>([^<]+)`, 'i');
    const match = html.match(pattern);
    if (match) {
      return parsePermission(match[1]);
    }
    // Default to true for noonnu (verified free fonts)
    return true;
  }

  /**
   * Clean extracted text
   */
  private cleanText(text: string): string {
    return text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Convert raw font to processed font
   */
  processFont(raw: NoonuuRawFont): ProcessedFont {
    const tags = extractTags(raw.category, raw.description || '', raw.weight_count);

    return {
      id: `noonnu-${raw.noonnu_id}`,
      slug: generateSlug(raw.name, raw.noonnu_id),
      name: raw.name,
      korean_name: raw.name,
      foundry: raw.foundry,
      license_type: mapLicenseType(raw.license_text),
      license_details: raw.permissions,
      preview_image: raw.preview_image_url,
      tags,
      category: mapCategory(raw.category),
      description: raw.description || `${raw.foundry}에서 제작한 ${raw.name} 폰트입니다.`,
      weight_count: raw.weight_count,
      source_url: `${NOONNU_BASE_URL}/font_page/${raw.noonnu_id}`,
      crawl_source: 'noonnu',
      crawl_source_id: raw.noonnu_id,
      views: 0,
      price: 0,
      is_verified: false,
      is_active: true,
    };
  }

  /**
   * Main crawl function
   */
  async crawl(options: CrawlOptions = {}): Promise<{ fonts: ProcessedFont[]; result: CrawlResult }> {
    const { limit = 200, offset = 0, dryRun = false } = options;
    const startTime = new Date();
    const fonts: ProcessedFont[] = [];
    this.errors = [];

    console.log(`Starting noonnu.cc crawl (limit: ${limit}, offset: ${offset})...`);

    // Get all font IDs (paginate through listing)
    let allIds: string[] = [];
    let page = 1;
    const maxPages = Math.ceil((limit + offset) / 20); // ~20 fonts per page

    while (page <= maxPages) {
      const pageIds = await this.getFontIds(page);
      if (pageIds.length === 0) break;

      allIds.push(...pageIds);
      console.log(`Found ${pageIds.length} fonts on page ${page}. Total: ${allIds.length}`);

      // Check if we have enough
      if (allIds.length >= limit + offset) break;

      page++;
      await delay(500); // Small delay between pages
    }

    // Remove duplicates and apply offset/limit
    allIds = [...new Set(allIds)].slice(offset, offset + limit);
    console.log(`Processing ${allIds.length} unique font IDs...`);

    if (dryRun) {
      console.log('Dry run - would process:', allIds);
      return {
        fonts: [],
        result: {
          source: 'noonnu',
          total_crawled: allIds.length,
          fonts_added: 0,
          fonts_updated: 0,
          fonts_skipped: allIds.length,
          errors: [],
          started_at: startTime,
          completed_at: new Date(),
        },
      };
    }

    // Process each font
    let processed = 0;
    for (const id of allIds) {
      const raw = await this.parseFontPage(id);

      if (raw) {
        const font = this.processFont(raw);
        fonts.push(font);
        processed++;
        console.log(`[${processed}/${allIds.length}] Processed: ${font.name}`);
      }

      // Progress checkpoint every 50 fonts
      if (processed % 50 === 0 && options.saveCheckpoint) {
        console.log(`Checkpoint: ${processed} fonts processed`);
      }
    }

    const result: CrawlResult = {
      source: 'noonnu',
      total_crawled: allIds.length,
      fonts_added: fonts.length,
      fonts_updated: 0,
      fonts_skipped: allIds.length - fonts.length,
      errors: this.errors,
      started_at: startTime,
      completed_at: new Date(),
    };

    console.log(`Crawl complete. ${fonts.length} fonts processed.`);
    if (this.errors.length > 0) {
      console.log(`Errors: ${this.errors.length}`);
    }

    return { fonts, result };
  }
}
