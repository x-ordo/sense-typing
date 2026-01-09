'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { XCircle, ArrowLeft, RefreshCw, Loader2 } from 'lucide-react'

function FailContent() {
  const searchParams = useSearchParams()

  const errorCode = searchParams.get('code')
  const errorMessage = searchParams.get('message')

  // Map common error codes to user-friendly messages
  const getErrorDescription = (code: string | null, message: string | null): string => {
    if (!code) return message || '알 수 없는 오류가 발생했습니다.'

    const errorMap: Record<string, string> = {
      'PAY_PROCESS_CANCELED': '결제가 취소되었습니다.',
      'PAY_PROCESS_ABORTED': '결제가 중단되었습니다.',
      'REJECT_CARD_COMPANY': '카드사에서 결제를 거부했습니다. 카드사에 문의해주세요.',
      'INVALID_CARD_COMPANY': '유효하지 않은 카드입니다.',
      'INVALID_CARD_EXPIRATION': '카드 유효기간이 만료되었습니다.',
      'INVALID_CARD_NUMBER': '카드 번호가 올바르지 않습니다.',
      'INVALID_CARD_LOST': '분실 신고된 카드입니다.',
      'INVALID_CARD_STOLEN': '도난 신고된 카드입니다.',
      'EXCEED_MAX_DAILY_PAYMENT_COUNT': '일일 결제 한도를 초과했습니다.',
      'EXCEED_MAX_PAYMENT_AMOUNT': '결제 금액 한도를 초과했습니다.',
      'NOT_FOUND_TERMINAL_ID': '결제 단말기 정보를 찾을 수 없습니다.',
      'INVALID_AUTHORIZE_AUTH': '인증에 실패했습니다.',
      'INVALID_PASSWORD': '비밀번호가 올바르지 않습니다.',
      'INSUFFICIENT_BALANCE': '잔액이 부족합니다.',
    }

    return errorMap[code] || message || '결제 처리 중 오류가 발생했습니다.'
  }

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md px-6 text-center">
        <div className="bg-white border border-brand-beige rounded-2xl p-8">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-brand-black mb-2">
            결제에 실패했습니다
          </h1>
          <p className="text-zinc-500 mb-6">
            {getErrorDescription(errorCode, errorMessage)}
          </p>

          {/* Error Details */}
          {errorCode && (
            <div className="bg-red-50 rounded-xl p-4 mb-6 text-left">
              <div className="text-xs text-red-600">
                <span className="font-medium">오류 코드: </span>
                <span className="font-mono">{errorCode}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/checkout"
              className="w-full py-3 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              다시 시도하기
            </Link>
            <Link
              href="/"
              className="w-full py-3 bg-white border border-brand-beige text-brand-black font-medium rounded-xl hover:bg-brand-beige/30 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              홈으로 돌아가기
            </Link>
          </div>

          {/* Help */}
          <p className="mt-6 text-xs text-zinc-400">
            문제가 계속되면{' '}
            <Link href="/support" className="text-brand-gold hover:underline">
              고객센터
            </Link>
            로 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutFailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-gold" />
        </div>
      }
    >
      <FailContent />
    </Suspense>
  )
}
