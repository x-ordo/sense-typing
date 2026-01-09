// scripts/seed/index.ts
// Database seeding script for fonts

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NoonuuCrawler } from '../crawlers/noonnu-crawler';
import type { ProcessedFont, CrawlResult } from '../crawlers/types';

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface SeedOptions {
  source: 'noonnu' | 'google' | 'mock' | 'all';
  limit?: number;
  skipExisting?: boolean;
  dryRun?: boolean;
}

interface SeedResult {
  source: string;
  total: number;
  inserted: number;
  updated: number;
  skipped: number;
  errors: string[];
}

/**
 * Create Supabase client with service role
 */
function createSupabaseAdmin(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error(
      'Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Get existing font IDs from database
 */
async function getExistingFontIds(supabase: SupabaseClient): Promise<Set<string>> {
  const { data, error } = await supabase.from('fonts').select('id');

  if (error) {
    console.error('Error fetching existing fonts:', error.message);
    return new Set();
  }

  return new Set(data?.map((f) => f.id) || []);
}

/**
 * Insert fonts into database
 */
async function insertFonts(
  supabase: SupabaseClient,
  fonts: ProcessedFont[],
  options: { skipExisting?: boolean; dryRun?: boolean } = {}
): Promise<SeedResult> {
  const result: SeedResult = {
    source: fonts[0]?.crawl_source || 'unknown',
    total: fonts.length,
    inserted: 0,
    updated: 0,
    skipped: 0,
    errors: [],
  };

  if (options.dryRun) {
    console.log('Dry run - would insert:', fonts.length, 'fonts');
    result.skipped = fonts.length;
    return result;
  }

  // Get existing IDs if skipping
  let existingIds = new Set<string>();
  if (options.skipExisting) {
    existingIds = await getExistingFontIds(supabase);
    console.log(`Found ${existingIds.size} existing fonts in database`);
  }

  // Process in batches
  const batchSize = 50;
  for (let i = 0; i < fonts.length; i += batchSize) {
    const batch = fonts.slice(i, i + batchSize);

    // Filter out existing fonts if skipExisting
    const toInsert = options.skipExisting
      ? batch.filter((f) => !existingIds.has(f.id))
      : batch;

    if (toInsert.length === 0) {
      result.skipped += batch.length;
      continue;
    }

    // Map to database format
    const dbFonts = toInsert.map((font) => ({
      id: font.id,
      slug: font.slug,
      name: font.name,
      korean_name: font.korean_name,
      foundry: font.foundry,
      designer: font.designer,
      license_type: font.license_type,
      license_summary: font.license_details,
      source_url: font.source_url,
      preview_image: font.preview_image,
      webfont_url: font.webfont_url,
      download_url: font.download_url,
      description: font.description,
      category: font.category,
      tags: font.tags,
      emotion_tags: font.emotion_tags,
      weight_count: font.weight_count,
      file_formats: font.file_formats,
      price: font.price,
      views: font.views || 0,
      crawl_source: font.crawl_source,
      crawl_source_id: font.crawl_source_id,
      is_verified: font.is_verified,
      is_active: font.is_active,
    }));

    // Upsert (insert or update)
    const { error } = await supabase
      .from('fonts')
      .upsert(dbFonts, { onConflict: 'id' });

    if (error) {
      result.errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
      console.error(`Error inserting batch:`, error.message);
    } else {
      result.inserted += toInsert.length;
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${toInsert.length} fonts`);
    }

    result.skipped += batch.length - toInsert.length;
  }

  return result;
}

/**
 * Log crawl result to database
 */
async function logCrawlResult(
  supabase: SupabaseClient,
  crawlResult: CrawlResult,
  seedResult: SeedResult
): Promise<void> {
  const duration = Math.floor(
    (crawlResult.completed_at.getTime() - crawlResult.started_at.getTime()) / 1000
  );

  await supabase.from('crawl_logs').insert({
    source: crawlResult.source,
    fonts_added: seedResult.inserted,
    fonts_updated: seedResult.updated,
    fonts_skipped: seedResult.skipped,
    errors: seedResult.errors.length > 0 ? seedResult.errors : null,
    status: seedResult.errors.length > 0 ? 'completed' : 'completed',
    duration_seconds: duration,
  });
}

/**
 * Seed from noonnu.cc
 */
async function seedFromNoonnu(
  supabase: SupabaseClient,
  options: SeedOptions
): Promise<SeedResult> {
  console.log('\n=== Seeding from noonnu.cc ===\n');

  const crawler = new NoonuuCrawler();
  const { fonts, result: crawlResult } = await crawler.crawl({
    limit: options.limit || 200,
    dryRun: options.dryRun,
  });

  if (options.dryRun || fonts.length === 0) {
    return {
      source: 'noonnu',
      total: crawlResult.total_crawled,
      inserted: 0,
      updated: 0,
      skipped: crawlResult.total_crawled,
      errors: [],
    };
  }

  const seedResult = await insertFonts(supabase, fonts, {
    skipExisting: options.skipExisting,
    dryRun: options.dryRun,
  });

  // Log to crawl_logs table
  await logCrawlResult(supabase, crawlResult, seedResult);

  return seedResult;
}

/**
 * Seed from mock data (for development)
 */
async function seedFromMock(
  supabase: SupabaseClient,
  options: SeedOptions
): Promise<SeedResult> {
  console.log('\n=== Seeding from mock data ===\n');

  // Import mock data
  const { MOCK_FONTS } = await import('../../src/lib/mock-data');

  // Convert mock format to ProcessedFont format
  const fonts: ProcessedFont[] = MOCK_FONTS.map((font) => ({
    id: font.id,
    slug: font.id,
    name: font.name,
    korean_name: font.name,
    foundry: font.foundry,
    license_type: (font.license_type as 'free' | 'ofl') || 'free',
    tags: font.tags || [],
    category: font.tags?.[0] || '기타',
    description: font.description || '',
    source_url: font.source_url || '',
    crawl_source: 'manual' as const,
    crawl_source_id: font.id,
    views: font.views || 0,
    price: font.price || 0,
    is_verified: true,
    is_active: true,
  }));

  return insertFonts(supabase, fonts, {
    skipExisting: options.skipExisting,
    dryRun: options.dryRun,
  });
}

/**
 * Main seed function
 */
async function seed(options: SeedOptions): Promise<void> {
  console.log('Starting database seed...');
  console.log('Options:', options);

  let supabase: SupabaseClient;
  try {
    supabase = createSupabaseAdmin();
    console.log('Connected to Supabase');
  } catch (error) {
    console.error('Failed to connect to Supabase:', (error as Error).message);
    console.log('\nTo use this script, set these environment variables:');
    console.log('  SUPABASE_URL=your_project_url');
    console.log('  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
    process.exit(1);
  }

  const results: SeedResult[] = [];

  if (options.source === 'noonnu' || options.source === 'all') {
    const result = await seedFromNoonnu(supabase, options);
    results.push(result);
  }

  if (options.source === 'mock') {
    const result = await seedFromMock(supabase, options);
    results.push(result);
  }

  // Summary
  console.log('\n=== Seed Summary ===\n');
  for (const result of results) {
    console.log(`Source: ${result.source}`);
    console.log(`  Total: ${result.total}`);
    console.log(`  Inserted: ${result.inserted}`);
    console.log(`  Updated: ${result.updated}`);
    console.log(`  Skipped: ${result.skipped}`);
    if (result.errors.length > 0) {
      console.log(`  Errors: ${result.errors.length}`);
    }
    console.log('');
  }
}

// CLI entry point
async function main() {
  const args = process.argv.slice(2);

  const source = (args.find((a) => a.startsWith('--source='))?.split('=')[1] ||
    'noonnu') as SeedOptions['source'];
  const limit = parseInt(
    args.find((a) => a.startsWith('--limit='))?.split('=')[1] || '200',
    10
  );
  const skipExisting = args.includes('--skip-existing');
  const dryRun = args.includes('--dry-run');

  await seed({
    source,
    limit,
    skipExisting,
    dryRun,
  });
}

main().catch(console.error);

export { seed, seedFromNoonnu, seedFromMock };
