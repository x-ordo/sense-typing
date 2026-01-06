'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, Lock } from 'lucide-react'
import { shouldLock, getLockReason } from '@/lib/paywall'

export default function PremiumLock({ initialLocked = false }: { initialLocked?: boolean }) {
  const router = useRouter()
  const [locked, setLocked] = useState(initialLocked)
  const [reason, setReason] = useState('')

  useEffect(() => {
    // Initial check
    const isLocked = shouldLock()
    setLocked(isLocked)
    setReason(getLockReason())

    // Listen for signal updates
    const handleUpdate = () => {
        const isNowLocked = shouldLock()
        setLocked(isNowLocked)
        setReason(getLockReason())
    }

    window.addEventListener('paywall-signal-updated', handleUpdate)
    return () => window.removeEventListener('paywall-signal-updated', handleUpdate)
  }, [])

  if (!locked) return null

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg flex flex-col gap-3 animate-in fade-in duration-300">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-red-900">
            {reason}
          </h3>
          <p className="text-xs text-red-700 mt-1 leading-relaxed">
            귀하의 행동 패턴에서 <strong>고위험 의사결정 의도</strong>가 감지되었습니다.
            <br/>
            이 기준은 무료로 제공되지 않습니다.
          </p>
        </div>
      </div>
      
      <button
        onClick={() => router.push('/pricing')}
        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded shadow-sm transition-colors flex items-center justify-center gap-2"
      >
        <Lock className="w-3 h-3" />
        판단 근거 열기 (월 9,900원)
      </button>
    </div>
  )
}