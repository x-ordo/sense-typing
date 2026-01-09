// src/app/api/affiliate/track/route.ts
// Affiliate click tracking API

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const runtime = 'edge'

interface TrackClickRequest {
  fontId?: string
  partnerId?: string
  linkId?: string
  targetUrl: string
  referrer?: string
  landingPage?: string
  visitorId: string
  sessionId: string
  deviceType: string
  browser: string
  os: string
  userAgent: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

// Simple hash function for IP privacy
function hashIP(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

export async function POST(request: NextRequest) {
  try {
    const body: TrackClickRequest = await request.json()

    // Validate required fields
    if (!body.targetUrl || !body.visitorId || !body.sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get client IP for hashing (privacy-safe)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIP = forwardedFor?.split(',')[0]?.trim() || 'unknown'
    const ipHash = hashIP(clientIP)

    // Create Supabase client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    // Get current user if logged in
    const { data: { user } } = await supabase.auth.getUser()

    // Insert click record
    const { data: click, error: clickError } = await supabase
      .from('affiliate_clicks')
      .insert({
        link_id: body.linkId || null,
        font_id: body.fontId || null,
        partner_id: body.partnerId || null,
        session_id: body.sessionId,
        visitor_id: body.visitorId,
        user_id: user?.id || null,
        referrer: body.referrer || null,
        landing_page: body.landingPage || null,
        target_url: body.targetUrl,
        user_agent: body.userAgent || null,
        ip_hash: ipHash,
        device_type: body.deviceType || null,
        browser: body.browser || null,
        os: body.os || null,
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        utm_term: body.utm_term || null,
        utm_content: body.utm_content || null,
      })
      .select('id')
      .single()

    if (clickError) {
      console.error('Error recording click:', clickError)
      return NextResponse.json(
        { error: 'Failed to record click' },
        { status: 500 }
      )
    }

    // Update click count on affiliate link if linkId provided
    if (body.linkId) {
      try {
        await supabase.rpc('increment_click_count', { link_id: body.linkId })
      } catch {
        // Ignore error if RPC doesn't exist yet
      }
    }

    return NextResponse.json({
      success: true,
      clickId: click.id,
    })
  } catch (error) {
    console.error('Click tracking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve click stats (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fontId = searchParams.get('fontId')
    const partnerId = searchParams.get('partnerId')
    const days = parseInt(searchParams.get('days') || '30')

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('user_type')
      .eq('id', user.id)
      .single()

    if (profile?.user_type !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Build query
    let query = supabase
      .from('affiliate_clicks')
      .select('*', { count: 'exact' })
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(100)

    if (fontId) {
      query = query.eq('font_id', fontId)
    }
    if (partnerId) {
      query = query.eq('partner_id', partnerId)
    }

    const { data: clicks, count, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      clicks,
      total: count,
      days,
    })
  } catch (error) {
    console.error('Error fetching clicks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
