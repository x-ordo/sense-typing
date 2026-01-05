
export enum FontCategory {
  SERIF = 'Serif',
  SANS_SERIF = 'Sans Serif',
  DISPLAY = 'Display',
  HANDWRITING = 'Handwriting',
  KOREAN = 'Korean'
}

export enum Emotion {
  MINIMAL = 'Minimal',
  EMOTIONAL = 'Emotional',
  BOLD = 'Bold',
  CUTE = 'Cute',
  TRADITIONAL = 'Traditional',
  MODERN = 'Modern',
  LUXURY = 'Luxury',
  PLAYFUL = 'Playful',
  CALM = 'Calm'
}

export interface FontLicense {
  commercial: boolean;
  print: boolean;
  web: boolean;
  video: boolean;
  embedding: boolean;
}

export interface Font {
  id: string;
  name: string;
  creator: string;
  category: FontCategory;
  emotions: Emotion[];
  industries?: string[]; // Added for industry-based filtering
  price: number | 'Free';
  fontFamily: string;
  description: string;
  isNew?: boolean;
  isPopular?: boolean;
  license: FontLicense;
  sourceUrl: string;
}

export interface AIRecommendation {
  fontId: string;
  reason: string;
}

export interface AnalysisResult {
  tone: string;
  summary: string;
  recommendations: AIRecommendation[];
  filterCriteria?: {
    category?: FontCategory | 'All';
    emotion?: Emotion | 'All';
    industry?: string;
  };
}

export interface DesignSystemRecommendation {
  rank: number;
  name: string;
  reason: string;
  pros: string[];
  refPoints: string;
}

export interface DesignSystemAnalysis {
  techStack: string;
  serviceNature: string;
  designGoal: string;
  top3: DesignSystemRecommendation[];
}

export interface DesignAdvice {
  layoutAdvice: string;
  colorPalette: string[];
  suggestedComponents: string[];
  vibeLevel: string;
}
