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
  name: string;
  foundry: string;
  designer?: string;
  license_type: 'free' | 'commercial' | 'subscription' | 'ofl';
  license_details?: LicenseDetails;
  preview_image?: string;
  tags: string[];
  description: string;
  webfont_url?: string;
  price?: number;
  file_formats?: string[];
  glyph_count?: {
    korean: number;
    english?: number;
  };
  source_url: string;
  views?: number;
  created_at?: string;
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
