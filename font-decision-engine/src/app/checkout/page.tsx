'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import {
  ShoppingBag,
  CreditCard,
  ArrowLeft,
  Lock,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { useCartStore } from '@/lib/cart/store'
import { useAuth } from '@/components/auth/AuthProvider'
import { getTossClientKey, generateOrderId, formatAmount } from '@/lib/payment/toss'

declare global {
  interface Window {
    TossPayments: (clientKey: string) => {
      requestPayment: (method: string, options: Record<string, unknown>) => Promise<void>
    }
  }
}

const LICENSE_LABELS = {
  personal: '개인용 라이선스',
  commercial: '상업용 라이선스',
  enterprise: '기업용 라이선스',
}

export default function CheckoutPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const { items } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tossReady, setTossReady] = useState(false)

  // Form state
  const [billingName, setBillingName] = useState(profile?.display_name || '')
  const [billingEmail, setBillingEmail] = useState(user?.email || '')
  const [billingPhone, setBillingPhone] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const discount = 0 // TODO: Add coupon support
  const total = subtotal - discount

  // Update form when user data loads
  useEffect(() => {
    if (profile?.display_name) setBillingName(profile.display_name)
    if (user?.email) setBillingEmail(user.email)
  }, [user, profile])

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/')
    }
  }, [items.length, router])

  const handlePayment = async () => {
    if (!tossReady) {
      setError('결제 시스템을 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }

    if (!billingName || !billingEmail) {
      setError('이름과 이메일을 입력해주세요.')
      return
    }

    if (!agreeTerms) {
      setError('이용약관에 동의해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const orderId = generateOrderId()
      const orderName = items.length === 1
        ? items[0].fontName
        : `${items[0].fontName} 외 ${items.length - 1}건`

      const tossPayments = window.TossPayments(getTossClientKey())

      await tossPayments.requestPayment('카드', {
        amount: total,
        orderId,
        orderName,
        customerName: billingName,
        customerEmail: billingEmail,
        customerMobilePhone: billingPhone || undefined,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      })
    } catch (err) {
      console.error('Payment error:', err)
      setError('결제 요청 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    )
  }

  return (
    <>
      {/* Toss Payments SDK */}
      <Script
        src="https://js.tosspayments.com/v1/payment"
        onLoad={() => setTossReady(true)}
      />

      <div className="min-h-screen bg-brand-paper pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className="p-2 text-zinc-400 hover:text-brand-black hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-brand-black">결제하기</h1>
              <p className="text-sm text-zinc-500">안전하게 결제를 완료하세요</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Info */}
              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                <h2 className="text-lg font-bold text-brand-black mb-4">결제 정보</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                      이름 *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={billingName}
                      onChange={(e) => setBillingName(e.target.value)}
                      placeholder="홍길동"
                      required
                      className="w-full px-4 py-3 bg-brand-beige/30 border border-brand-beige rounded-xl text-brand-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                      이메일 *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 bg-brand-beige/30 border border-brand-beige rounded-xl text-brand-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                    />
                    <p className="mt-1 text-xs text-zinc-500">영수증과 다운로드 링크가 이 이메일로 발송됩니다</p>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">
                      연락처 (선택)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={billingPhone}
                      onChange={(e) => setBillingPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-3 bg-brand-beige/30 border border-brand-beige rounded-xl text-brand-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                <h2 className="text-lg font-bold text-brand-black mb-4">
                  주문 상품 ({items.length}개)
                </h2>
                <div className="divide-y divide-brand-beige">
                  {items.map((item) => (
                    <div
                      key={`${item.fontId}-${item.licenseType}`}
                      className="py-4 first:pt-0 last:pb-0 flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium text-brand-black">{item.fontName}</p>
                        <p className="text-sm text-zinc-500">{item.foundry}</p>
                        <p className="text-xs text-zinc-400 mt-1">
                          {LICENSE_LABELS[item.licenseType]}
                        </p>
                      </div>
                      <p className="font-bold text-brand-black">
                        {formatAmount(item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-gold bg-brand-beige/30 border-brand-beige rounded focus:ring-brand-gold"
                  />
                  <span className="text-sm text-zinc-600">
                    <Link href="/terms" className="text-brand-gold hover:underline">이용약관</Link>,{' '}
                    <Link href="/privacy" className="text-brand-gold hover:underline">개인정보처리방침</Link>,{' '}
                    그리고{' '}
                    <Link href="/license" className="text-brand-gold hover:underline">폰트 라이선스 정책</Link>에
                    동의합니다.
                  </span>
                </label>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-brand-beige p-6 sticky top-24">
                <h2 className="text-lg font-bold text-brand-black mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  주문 요약
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">상품 금액</span>
                    <span className="text-brand-black">{formatAmount(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>할인</span>
                      <span>-{formatAmount(discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-brand-beige pt-3 flex justify-between">
                    <span className="font-bold text-brand-black">총 결제금액</span>
                    <span className="text-xl font-bold text-brand-black">
                      {formatAmount(total)}
                    </span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={isLoading || !tossReady}
                  className="mt-6 w-full py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      {formatAmount(total)} 결제하기
                    </>
                  )}
                </button>

                {/* Security Note */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-400">
                  <Lock className="w-3 h-3" />
                  <span>SSL 암호화로 안전하게 보호됩니다</span>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-4 border-t border-brand-beige">
                  <p className="text-xs text-zinc-400 text-center mb-2">결제 수단</p>
                  <div className="flex justify-center gap-2">
                    <div className="px-2 py-1 bg-brand-beige/50 rounded text-[10px] text-zinc-500">
                      신용카드
                    </div>
                    <div className="px-2 py-1 bg-brand-beige/50 rounded text-[10px] text-zinc-500">
                      카카오페이
                    </div>
                    <div className="px-2 py-1 bg-brand-beige/50 rounded text-[10px] text-zinc-500">
                      네이버페이
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
