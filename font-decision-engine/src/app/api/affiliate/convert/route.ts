// src/app/api/affiliate/convert/route.ts
// Affiliate conversion tracking API

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const runtime = 'edge'

interface ConversionRequest {
  orderId: string
  clickId?: string
  partnerId?: string
  fontId?: string
  orderTotal: number
}

export async function POST(request: NextRequest) {
  try {
    const body: ConversionRequest = await request.json()

    if (!body.orderId || !body.orderTotal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

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

    // Get commission rate from partner (default 5%)
    let commissionRate = 0.05

    if (body.partnerId) {
      const { data: partner } = await supabase
        .from('affiliate_partners')
        .select('commission_rate')
        .eq('id', body.partnerId)
        .single()

      if (partner) {
        commissionRate = partner.commission_rate
      }
    }

    const commissionAmount = body.orderTotal * commissionRate

    // Create conversion record
    const { data: conversion, error: conversionError } = await supabase
      .from('affiliate_conversions')
      .insert({
        click_id: body.clickId || null,
        partner_id: body.partnerId || null,
        order_id: body.orderId,
        font_id: body.fontId || null,
        order_total: body.orderTotal,
        commission_rate: commissionRate,
        commission_amount: commissionAmount,
        status: 'pending',
      })
      .select()
      .single()

    if (conversionError) {
      console.error('Error recording conversion:', conversionError)
      return NextResponse.json(
        { error: 'Failed to record conversion' },
        { status: 500 }
      )
    }

    // Update click record with conversion
    if (body.clickId) {
      await supabase
        .from('affiliate_clicks')
        .update({
          converted: true,
          conversion_order_id: body.orderId,
          conversion_value: body.orderTotal,
          conversion_at: new Date().toISOString(),
        })
        .eq('id', body.clickId)
    }

    // Update affiliate link stats if we have the click
    if (body.clickId) {
      const { data: click } = await supabase
        .from('affiliate_clicks')
        .select('link_id')
        .eq('id', body.clickId)
        .single()

      if (click?.link_id) {
        try {
          await supabase.rpc('increment_conversion_count', {
            link_id: click.link_id,
            revenue: body.orderTotal,
          })
        } catch {
          // Ignore if RPC doesn't exist
        }
      }
    }

    return NextResponse.json({
      success: true,
      conversionId: conversion.id,
      commissionAmount,
    })
  } catch (error) {
    console.error('Conversion tracking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
