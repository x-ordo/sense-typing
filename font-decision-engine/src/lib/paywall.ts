'use client'

export type PaywallSignal = {
  premiumTagTouched: boolean
  useCaseSelected: boolean
  detailViewed: boolean
  aiHighRiskDetected: boolean // New signal
}

const STORAGE_KEY = 'fde_paywall_signal'

export function getSignals(): PaywallSignal {
  if (typeof window === 'undefined') {
    return {
      premiumTagTouched: false,
      useCaseSelected: false,
      detailViewed: false,
      aiHighRiskDetected: false
    }
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {
      premiumTagTouched: false,
      useCaseSelected: false,
      detailViewed: false,
      aiHighRiskDetected: false
    }
  } catch {
    return {
      premiumTagTouched: false,
      useCaseSelected: false,
      detailViewed: false,
      aiHighRiskDetected: false
    }
  }
}

export function trackSignal(key: keyof PaywallSignal) {
  if (typeof window === 'undefined') return

  const current = getSignals()
  // Idempotent update: if it's already true, don't write again to save IO/events
  if (current[key]) return

  const updated = { ...current, [key]: true }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  // Dispatch a custom event so components can react immediately
  window.dispatchEvent(new Event('paywall-signal-updated'))
}

export function shouldLock(): boolean {
  const signals = getSignals()
  const score = Object.values(signals).filter(Boolean).length
  // 2/3 Rule: Lock if 2 or more risky behaviors are detected
  return score >= 2
}

export function getLockReason(): string {
  const signals = getSignals()
  const reasons = []
  
  if (signals.aiHighRiskDetected) reasons.push("전문가용 고위험 문맥")
  if (signals.useCaseSelected) reasons.push("특수 목적(IR/법무) 선택")
  if (signals.premiumTagTouched) reasons.push("프리미엄 리스크 기준 접근")
  if (signals.detailViewed) reasons.push("상세 판단 근거 조회")
  
  if (reasons.length === 0) return "접근 제한"
  
  return reasons.join(" 및 ") + " 감지됨"
}

export function resetSignals() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event('paywall-signal-updated'))
}