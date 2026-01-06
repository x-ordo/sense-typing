'use client'

import { useRouter } from 'next/navigation'
import { ShieldAlert } from 'lucide-react'

export default function PremiumLock({ locked }: { locked: boolean }) {
  const router = useRouter()

  if (!locked) return null

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-red-900">
            검증된 리스크 방지 기준 잠금
          </h3>
          <p className="text-xs text-red-700 mt-1 leading-relaxed">
            실무·IR·계약 문서에서 사용되는 <strong>고위험군 분류(High-Stakes Taxonomy)</strong>는 무료로 제공되지 않습니다.
            <br/>
            이 폰트가 왜 안전한지, <strong>데이터 근거</strong>를 확인하세요.
          </p>
        </div>
      </div>
      
      <button
        onClick={() => router.push('/pricing')}
        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded shadow-sm transition-colors"
      >
        기준 잠금 해제 (월 9,900원)
      </button>
    </div>
  )
}
