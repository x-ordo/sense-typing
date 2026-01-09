// src/types/expert.ts
// Expert marketplace type definitions

export type ExpertSpecialty =
  | 'typography-consulting'
  | 'brand-identity'
  | 'catchphrase'
  | 'logo-design'
  | 'font-pairing'
  | 'visual-identity'

export type ExpertServiceCategory =
  | 'consultation'
  | 'design'
  | 'writing'
  | 'package'

export type BookingStatus =
  | 'inquiry'
  | 'quoted'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type ApplicationStatus =
  | 'pending'
  | 'reviewing'
  | 'approved'
  | 'rejected'

export interface Expert {
  id: string
  user_id: string
  display_name: string
  slug: string
  title: string
  bio: string | null
  profile_image_url: string | null
  specialties: ExpertSpecialty[]
  years_experience: number
  hourly_rate: number | null
  minimum_project_rate: number | null
  is_verified: boolean
  is_available: boolean
  rating_avg: number
  review_count: number
  completed_projects: number
  response_time_hours: number | null
  languages: string[]
  location: string | null
  website_url: string | null
  portfolio_url: string | null
  created_at: string
  updated_at: string
}

export interface ExpertService {
  id: string
  expert_id: string
  name: string
  description: string | null
  category: ExpertServiceCategory
  price: number
  price_type: 'fixed' | 'starting_from' | 'hourly'
  delivery_days: number | null
  revisions_included: number
  is_active: boolean
  display_order: number
  created_at: string
}

export interface ExpertPortfolio {
  id: string
  expert_id: string
  title: string
  description: string | null
  image_url: string
  project_url: string | null
  client_name: string | null
  tags: string[]
  display_order: number
  created_at: string
}

export interface Booking {
  id: string
  booking_number: string
  expert_id: string
  client_id: string
  service_id: string | null
  status: BookingStatus
  project_brief: string
  budget_range: string | null
  deadline: string | null
  quoted_price: number | null
  quoted_delivery_days: number | null
  client_message: string | null
  expert_response: string | null
  created_at: string
  updated_at: string
  completed_at: string | null
}

export interface ExpertReview {
  id: string
  booking_id: string
  expert_id: string
  client_id: string
  rating: number
  review_text: string | null
  is_verified: boolean
  created_at: string
}

export interface ExpertApplication {
  id: string
  user_id: string
  display_name: string
  title: string
  bio: string
  specialties: ExpertSpecialty[]
  years_experience: number
  portfolio_url: string | null
  website_url: string | null
  sample_work_urls: string[]
  why_join: string | null
  status: ApplicationStatus
  admin_notes: string | null
  reviewed_by: string | null
  reviewed_at: string | null
  created_at: string
}

// API Response types
export interface ExpertWithServices extends Expert {
  services: ExpertService[]
}

export interface ExpertWithPortfolio extends Expert {
  portfolio: ExpertPortfolio[]
}

export interface ExpertFull extends Expert {
  services: ExpertService[]
  portfolio: ExpertPortfolio[]
  reviews: (ExpertReview & { client_name?: string })[]
}

export interface BookingWithDetails extends Booking {
  expert: Pick<Expert, 'id' | 'display_name' | 'slug' | 'profile_image_url'>
  service?: Pick<ExpertService, 'id' | 'name' | 'price'>
}

// Form types
export interface BookingFormData {
  service_id?: string
  project_brief: string
  budget_range?: string
  deadline?: string
  client_message?: string
}

export interface ExpertApplicationFormData {
  display_name: string
  title: string
  bio: string
  specialties: ExpertSpecialty[]
  years_experience: number
  portfolio_url?: string
  website_url?: string
  sample_work_urls: string[]
  why_join?: string
}

// UI Helper types
export const SPECIALTY_LABELS: Record<ExpertSpecialty, string> = {
  'typography-consulting': '타이포그래피 컨설팅',
  'brand-identity': '브랜드 아이덴티티',
  'catchphrase': '캐치프레이즈/슬로건',
  'logo-design': '로고 디자인',
  'font-pairing': '폰트 조합',
  'visual-identity': '비주얼 아이덴티티',
}

export const SERVICE_CATEGORY_LABELS: Record<ExpertServiceCategory, string> = {
  'consultation': '컨설팅',
  'design': '디자인',
  'writing': '카피라이팅',
  'package': '패키지',
}

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  'inquiry': '문의 접수',
  'quoted': '견적 발송',
  'accepted': '수락됨',
  'in_progress': '진행 중',
  'completed': '완료',
  'cancelled': '취소됨',
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  'pending': '검토 대기',
  'reviewing': '검토 중',
  'approved': '승인됨',
  'rejected': '거절됨',
}
