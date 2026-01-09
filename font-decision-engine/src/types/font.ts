// src/types/font.ts

/**
 * License permissions for a font
 */
export interface LicenseDetails {
  printing: boolean;    // 인쇄
  website: boolean;     // 웹사이트
  video: boolean;       // 영상
  embedding: boolean;   // 임베딩
  packaging: boolean;   // 포장지
  bi_ci: boolean;       // BI/CI
}

/**
 * Core font asset data from database
 */
export interface Font {
  id: string;
  slug?: string;
  name: string;
  korean_name?: string;
  foundry: string;
  designer?: string;
  license_type: 'free' | 'commercial' | 'subscription' | 'ofl' | 'mixed';
  license_details?: LicenseDetails;
  preview_image?: string;
  webfont_url?: string;
  download_url?: string;
  tags: string[];
  emotion_tags?: string[];
  category?: string;
  description: string;
  weight_count?: number;
  price?: number;
  file_formats?: string[];
  glyph_count?: {
    korean: number;
    english?: number;
    total?: number;
  };
  source_url: string;
  crawl_source?: 'noonnu' | 'google' | 'manual';
  crawl_source_id?: string;
  views?: number;
  is_verified?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  // Extended fields for detail page
  pros?: string[];
  cons?: string[];
  usage?: string[];
  preview_text?: string;
  related_fonts?: RelatedFont[];
}

/**
 * Minimal font reference for related fonts
 */
export interface RelatedFont {
  id: string;
  name: string;
  preview_image?: string;
}

/**
 * Font card display props (subset of Font)
 */
export interface FontCardProps {
  id: string;
  name: string;
  foundry: string;
  preview_image?: string;
  license_type: string;
  tags?: string[];
  description?: string;
  views?: number;
  price?: number;
  source_url?: string;
}

/**
 * Font search result with scoring
 */
export interface FontSearchResult {
  font: Font;
  score: number;
  matchReasons: string[];
}
