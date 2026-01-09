'use client'

import Link from 'next/link'
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md px-6 text-center">
        <div className="bg-white border border-brand-beige rounded-2xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-brand-black mb-3">
            인증 오류
          </h1>
          <p className="text-zinc-500 mb-6">
            로그인 중 문제가 발생했습니다.
            다시 시도해 주세요.
          </p>
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="w-full py-3 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              다시 로그인
            </Link>
            <Link
              href="/"
              className="w-full py-3 bg-white border border-brand-beige text-brand-black font-medium rounded-xl hover:bg-brand-beige/30 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
