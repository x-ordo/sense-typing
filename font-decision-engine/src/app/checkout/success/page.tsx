'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, ArrowRight, Loader2, Package } from 'lucide-react'
import { useCartStore } from '@/lib/cart/store'
import { formatAmount } from '@/lib/payment/toss'

function SuccessContent() {
  const searchParams = useSearchParams()
  const clearCart = useCartStore((state) => state.clearCart)
  const items = useCartStore((state) => state.items)

  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')

  useEffect(() => {
    const confirmPayment = async () => {
      if (!paymentKey || !orderId || !amount) {
        setError('결제 정보가 올바르지 않습니다.')
        setIsProcessing(false)
        return
      }

      if (items.length === 0) {
        // Cart already cleared, probably refreshed page
        setIsProcessing(false)
        setOrderNumber(orderId)
        return
      }

      try {
        const response = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount),
            items: items.map((item) => ({
              fontId: item.fontId,
              fontName: item.fontName,
              foundry: item.foundry,
              licenseType: item.licenseType,
              price: item.price,
            })),
            billingName: '', // Already collected in checkout
            billingEmail: '', // Already collected in checkout
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || '결제 확인에 실패했습니다.')
        }

        setOrderNumber(data.orderNumber)
        clearCart()
      } catch (err) {
        console.error('Payment confirmation error:', err)
        setError(err instanceof Error ? err.message : '결제 처리 중 오류가 발생했습니다.')
      } finally {
        setIsProcessing(false)
      }
    }

    confirmPayment()
  }, [paymentKey, orderId, amount, items, clearCart])

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-gold mx-auto mb-4" />
          <p className="text-zinc-500">결제를 처리하고 있습니다...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <div className="w-full max-w-md px-6 text-center">
          <div className="bg-white border border-brand-beige rounded-2xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-brand-black mb-3">
              결제 확인 실패
            </h1>
            <p className="text-zinc-500 mb-6">{error}</p>
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all"
            >
              다시 시도하기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md px-6 text-center">
        <div className="bg-white border border-brand-beige rounded-2xl p-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>

          <h1 className="text-2xl font-bold text-brand-black mb-2">
            결제가 완료되었습니다!
          </h1>
          <p className="text-zinc-500 mb-6">
            주문해 주셔서 감사합니다.
            <br />
            이메일로 영수증과 다운로드 링크를 보내드렸습니다.
          </p>

          {/* Order Info */}
          <div className="bg-brand-beige/30 rounded-xl p-4 mb-6 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-500">주문번호</span>
              <span className="font-mono font-medium text-brand-black">
                {orderNumber || orderId}
              </span>
            </div>
            {amount && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">결제금액</span>
                <span className="font-bold text-brand-black">
                  {formatAmount(parseInt(amount))}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/mypage/orders"
              className="w-full py-3 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              다운로드 페이지로 이동
            </Link>
            <Link
              href="/"
              className="w-full py-3 bg-white border border-brand-beige text-brand-black font-medium rounded-xl hover:bg-brand-beige/30 transition-all flex items-center justify-center gap-2"
            >
              계속 쇼핑하기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-gold" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
