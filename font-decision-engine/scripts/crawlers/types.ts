// scripts/crawlers/types.ts
// Types for font crawler system

/**
 * Raw font data from noonnu.cc
 */
export interface NoonuuRawFont {
  noonnu_id: string;
  name: string;
  foundry: string;
  license_text: string;
  permissions: {
    printing: boolean;
    website: boolean;
    video: boolean;
    embedding: boolean;
    packaging: boolean;
    bi_ci: boolean;
  };
  preview_image_url?: string;
  download_url?: string;
  webfont_css_url?: string;
  category: string;
  weight_count?: number;
  description?: string;
  tags?: string[];
}

/**
 * Processed font data ready for database
 */
export interface ProcessedFont {
  id: string;
  slug: string;
  name: string;
  korean_name?: string;
  foundry: string;
  designer?: string;
  license_type: 'free' | 'commercial' | 'subscription' | 'ofl';
  license_details?: {
    printing: boolean;
    website: boolean;
    video: boolean;
    embedding: boolean;
    packaging: boolean;
    bi_ci: boolean;
  };
  preview_image?: string;
  webfont_url?: string;
  download_url?: string;
  tags: string[];
  emotion_tags?: string[];
  category: string;
  description: string;
  weight_count?: number;
  file_formats?: string[];
  source_url: string;
  crawl_source: 'noonnu' | 'google' | 'manual';
  crawl_source_id: string;
  views?: number;
  price: number;
  is_verified: boolean;
  is_active: boolean;
}

/**
 * Google Fonts API response item
 */
export interface GoogleFontItem {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: string;
  kind: string;
}

/**
 * Crawl job result
 */
export interface CrawlResult {
  source: string;
  total_crawled: number;
  fonts_added: number;
  fonts_updated: number;
  fonts_skipped: number;
  errors: CrawlError[];
  started_at: Date;
  completed_at: Date;
}

/**
 * Crawl error record
 */
export interface CrawlError {
  font_id?: string;
  font_name?: string;
  error_type: 'fetch' | 'parse' | 'validation' | 'database';
  message: string;
  stack?: string;
}

/**
 * Crawl options
 */
export interface CrawlOptions {
  limit?: number;
  offset?: number;
  skipExisting?: boolean;
  generateTags?: boolean;
  saveCheckpoint?: boolean;
  dryRun?: boolean;
}

/**
 * Emotion tag vocabulary
 */
export const EMOTION_TAGS = {
  // Primary emotions
  '권위적': 'authoritative',
  '친근한': 'friendly',
  '전문적': 'professional',
  '캐주얼': 'casual',
  '고급스러운': 'luxurious',
  '미니멀': 'minimal',
  '따뜻한': 'warm',
  '차가운': 'cold',

  // Style-based
  '레트로': 'retro',
  '모던': 'modern',
  '전통적': 'traditional',
  '트렌디': 'trendy',
  '클래식': 'classic',
  '펑키': 'funky',

  // Mood-based
  '귀여운': 'cute',
  '세련된': 'sophisticated',
  '장난스러운': 'playful',
  '진지한': 'serious',
  '활기찬': 'energetic',
  '차분한': 'calm',

  // Usage-based
  '제목용': 'display',
  '본문용': 'body',
  '로고용': 'logo',
  '캡션용': 'caption',
} as const;

export type EmotionTag = keyof typeof EMOTION_TAGS;
