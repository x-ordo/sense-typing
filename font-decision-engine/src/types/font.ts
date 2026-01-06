// src/types/font.ts
export interface LicenseDetails {
  printing: boolean;    // 인쇄
  website: boolean;     // 웹사이트
  video: boolean;       // 영상
  embedding: boolean;   // 임베딩
  packaging: boolean;   // 포장지
  bi_ci: boolean;       // BI/CI
}

export interface Font {
  id: string;
  name: string;
  foundry: string;
  license_type: string;
  license_details?: LicenseDetails;
  preview_image?: string;
  tags: string[];
  description: string;
  webfont_url?: string;
}
