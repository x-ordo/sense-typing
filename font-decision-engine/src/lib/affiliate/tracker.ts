// src/lib/affiliate/tracker.ts
// Affiliate click tracking and attribution

import type { UTMParams, VisitorInfo, ClickTrackingData } from './types'

// Cookie names
const VISITOR_ID_COOKIE = 'sense_vid'
const SESSION_ID_COOKIE = 'sense_sid'
const ATTRIBUTION_COOKIE = 'sense_attr'

// Cookie durations
const VISITOR_COOKIE_DAYS = 365
const SESSION_COOKIE_MINUTES = 30
const ATTRIBUTION_COOKIE_DAYS = 30

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Set a cookie
 */
function setCookie(name: string, value: string, days?: number, minutes?: number): void {
  if (typeof document === 'undefined') return

  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  } else if (minutes) {
    const date = new Date()
    date.setTime(date.getTime() + minutes * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }

  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax`
}

/**
 * Get a cookie value
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';')

  for (let cookie of cookies) {
    cookie = cookie.trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length)
    }
  }

  return null
}

/**
 * Get or create visitor ID (persistent across sessions)
 */
export function getVisitorId(): string {
  let visitorId = getCookie(VISITOR_ID_COOKIE)

  if (!visitorId) {
    visitorId = `v_${generateId()}`
    setCookie(VISITOR_ID_COOKIE, visitorId, VISITOR_COOKIE_DAYS)
  }

  return visitorId
}

/**
 * Get or create session ID (expires after inactivity)
 */
export function getSessionId(): string {
  let sessionId = getCookie(SESSION_ID_COOKIE)

  if (!sessionId) {
    sessionId = `s_${generateId()}`
  }

  // Refresh session cookie on each call
  setCookie(SESSION_ID_COOKIE, sessionId, undefined, SESSION_COOKIE_MINUTES)

  return sessionId
}

/**
 * Store attribution data for conversion tracking
 */
export function setAttribution(data: {
  clickId: string
  partnerId?: string
  fontId?: string
}): void {
  setCookie(ATTRIBUTION_COOKIE, JSON.stringify(data), ATTRIBUTION_COOKIE_DAYS)
}

/**
 * Get stored attribution data
 */
export function getAttribution(): {
  clickId: string
  partnerId?: string
  fontId?: string
} | null {
  const data = getCookie(ATTRIBUTION_COOKIE)
  if (!data) return null

  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}

/**
 * Clear attribution data (after conversion)
 */
export function clearAttribution(): void {
  setCookie(ATTRIBUTION_COOKIE, '', -1)
}

/**
 * Parse UTM parameters from URL
 */
export function parseUTMParams(url?: string): UTMParams {
  if (typeof window === 'undefined') return {}

  const searchParams = new URLSearchParams(url || window.location.search)

  return {
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_term: searchParams.get('utm_term') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
  }
}

/**
 * Detect device type from user agent
 */
export function detectDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
  const ua = userAgent.toLowerCase()

  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'tablet'
  }

  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    return 'mobile'
  }

  return 'desktop'
}

/**
 * Detect browser from user agent
 */
export function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  if (ua.includes('firefox')) return 'Firefox'
  if (ua.includes('edg')) return 'Edge'
  if (ua.includes('chrome')) return 'Chrome'
  if (ua.includes('safari')) return 'Safari'
  if (ua.includes('opera') || ua.includes('opr')) return 'Opera'

  return 'Unknown'
}

/**
 * Detect OS from user agent
 */
export function detectOS(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  if (ua.includes('windows')) return 'Windows'
  if (ua.includes('mac os') || ua.includes('macos')) return 'macOS'
  if (ua.includes('linux')) return 'Linux'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS'

  return 'Unknown'
}

/**
 * Get visitor information
 */
export function getVisitorInfo(): VisitorInfo {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''

  return {
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    deviceType: detectDeviceType(userAgent),
    browser: detectBrowser(userAgent),
    os: detectOS(userAgent),
    userAgent,
  }
}

/**
 * Track an affiliate click
 */
export async function trackClick(data: ClickTrackingData): Promise<{ clickId: string } | null> {
  try {
    const visitorInfo = getVisitorInfo()
    const utmParams = data.utmParams || parseUTMParams()

    const response = await fetch('/api/affiliate/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fontId: data.fontId,
        partnerId: data.partnerId,
        linkId: data.linkId,
        targetUrl: data.targetUrl,
        referrer: data.referrer || (typeof document !== 'undefined' ? document.referrer : ''),
        landingPage: data.landingPage || (typeof window !== 'undefined' ? window.location.href : ''),
        ...visitorInfo,
        ...utmParams,
      }),
    })

    if (!response.ok) {
      console.error('Failed to track click')
      return null
    }

    const result = await response.json()

    // Store attribution for conversion tracking
    if (result.clickId) {
      setAttribution({
        clickId: result.clickId,
        partnerId: data.partnerId,
        fontId: data.fontId,
      })
    }

    return result
  } catch (error) {
    console.error('Error tracking click:', error)
    return null
  }
}

/**
 * Build a tracked URL with UTM parameters
 */
export function buildTrackedUrl(
  baseUrl: string,
  params?: {
    trackingCode?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
  }
): string {
  const url = new URL(baseUrl)

  if (params?.trackingCode) {
    url.searchParams.set('ref', params.trackingCode)
  }
  if (params?.utmSource) {
    url.searchParams.set('utm_source', params.utmSource)
  }
  if (params?.utmMedium) {
    url.searchParams.set('utm_medium', params.utmMedium)
  }
  if (params?.utmCampaign) {
    url.searchParams.set('utm_campaign', params.utmCampaign)
  }

  return url.toString()
}
