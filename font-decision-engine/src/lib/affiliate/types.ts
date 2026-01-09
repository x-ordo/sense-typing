// src/lib/affiliate/types.ts
// Affiliate system type definitions

export interface AffiliatePartner {
  id: string
  name: string
  slug: string
  domain: string | null
  logo_url: string | null
  commission_rate: number
  commission_type: 'percentage' | 'fixed'
  cookie_duration_days: number
  is_active: boolean
  contact_email: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface AffiliateLink {
  id: string
  partner_id: string | null
  font_id: string | null
  target_url: string
  tracking_code: string
  click_count: number
  conversion_count: number
  revenue_generated: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AffiliateClick {
  id: string
  link_id: string | null
  font_id: string | null
  partner_id: string | null
  session_id: string | null
  visitor_id: string | null
  user_id: string | null
  referrer: string | null
  landing_page: string | null
  target_url: string | null
  user_agent: string | null
  ip_hash: string | null
  country: string | null
  device_type: string | null
  browser: string | null
  os: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  converted: boolean
  conversion_order_id: string | null
  conversion_value: number | null
  conversion_at: string | null
  created_at: string
}

export interface AffiliateConversion {
  id: string
  click_id: string | null
  partner_id: string | null
  order_id: string
  font_id: string | null
  order_total: number
  commission_rate: number
  commission_amount: number
  status: 'pending' | 'approved' | 'paid' | 'rejected'
  paid_at: string | null
  notes: string | null
  created_at: string
}

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export interface ClickTrackingData {
  fontId?: string
  partnerId?: string
  linkId?: string
  targetUrl: string
  referrer?: string
  landingPage?: string
  utmParams?: UTMParams
}

export interface VisitorInfo {
  visitorId: string
  sessionId: string
  deviceType: 'desktop' | 'mobile' | 'tablet'
  browser: string
  os: string
  userAgent: string
}
