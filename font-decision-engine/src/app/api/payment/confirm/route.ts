// src/app/api/payment/confirm/route.ts
// Payment confirmation API endpoint

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { confirmTossPayment } from '@/lib/payment/toss'

export const runtime = 'edge'

interface ConfirmPaymentRequest {
  paymentKey: string
  orderId: string
  amount: number
  items: {
    fontId: string
    fontName: string
    foundry: string
    licenseType: 'personal' | 'commercial' | 'enterprise'
    price: number
  }[]
  billingName: string
  billingEmail: string
  billingPhone?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ConfirmPaymentRequest = await request.json()
    const { paymentKey, orderId, amount, items, billingName, billingEmail, billingPhone } = body

    // Validate request
    if (!paymentKey || !orderId || !amount || !items?.length) {
      return NextResponse.json(
        { error: '잘못된 요청입니다.' },
        { status: 400 }
      )
    }

    // Confirm payment with Toss
    const paymentResult = await confirmTossPayment({ paymentKey, orderId, amount })

    if (!paymentResult.success || !paymentResult.data) {
      return NextResponse.json(
        { error: paymentResult.error || '결제 승인에 실패했습니다.' },
        { status: 400 }
      )
    }

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

    // Get current user (optional - supports guest checkout)
    const { data: { user } } = await supabase.auth.getUser()

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price, 0)
    const total = subtotal // No discounts for now

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderId,
        user_id: user?.id || null,
        email: billingEmail,
        status: 'paid',
        subtotal,
        discount: 0,
        total,
        currency: 'KRW',
        payment_method: paymentResult.data.method,
        payment_id: paymentKey,
        payment_data: paymentResult.data,
        billing_name: billingName,
        billing_email: billingEmail,
        billing_phone: billingPhone || null,
        paid_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json(
        { error: '주문 생성에 실패했습니다.' },
        { status: 500 }
      )
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      font_id: item.fontId,
      font_name: item.fontName,
      foundry: item.foundry,
      license_type: item.licenseType,
      price: item.price,
    }))

    const { data: createdItems, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select()

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      // Order was created, but items failed - log but don't fail
    }

    // Create download tokens for each item
    if (createdItems) {
      const downloads = createdItems.map((item) => ({
        order_item_id: item.id,
        user_id: user?.id || null,
        download_token: generateDownloadToken(),
        max_downloads: 5,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      }))

      const { error: downloadsError } = await supabase
        .from('downloads')
        .insert(downloads)

      if (downloadsError) {
        console.error('Downloads creation error:', downloadsError)
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
    })
  } catch (error) {
    console.error('Payment confirmation error:', error)
    return NextResponse.json(
      { error: '결제 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// Generate a secure download token
function generateDownloadToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}
