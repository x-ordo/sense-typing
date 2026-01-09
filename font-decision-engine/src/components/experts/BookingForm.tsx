'use client'

import { useState } from 'react'
import { Loader2, Send, Calendar, DollarSign } from 'lucide-react'
import type { ExpertService, BookingFormData } from '@/types/expert'
import ServiceCard from './ServiceCard'

interface BookingFormProps {
  expertId: string
  expertName: string
  services: ExpertService[]
  onSubmit: (data: BookingFormData) => Promise<void>
  isLoggedIn: boolean
  onLoginRequired: () => void
}

const BUDGET_OPTIONS = [
  { value: '50만원 미만', label: '50만원 미만' },
  { value: '50-100만원', label: '50-100만원' },
  { value: '100-300만원', label: '100-300만원' },
  { value: '300-500만원', label: '300-500만원' },
  { value: '500만원 이상', label: '500만원 이상' },
  { value: '협의 필요', label: '예산 협의 필요' },
]

export default function BookingForm({
  expertId: _expertId,
  expertName,
  services,
  onSubmit,
  isLoggedIn,
  onLoginRequired,
}: BookingFormProps) {
  const [selectedService, setSelectedService] = useState<ExpertService | null>(null)
  const [projectBrief, setProjectBrief] = useState('')
  const [budgetRange, setBudgetRange] = useState('')
  const [deadline, setDeadline] = useState('')
  const [clientMessage, setClientMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isLoggedIn) {
      onLoginRequired()
      return
    }

    if (!projectBrief.trim()) {
      setError('프로젝트 설명을 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        service_id: selectedService?.id,
        project_brief: projectBrief.trim(),
        budget_range: budgetRange || undefined,
        deadline: deadline || undefined,
        client_message: clientMessage.trim() || undefined,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : '상담 신청 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Selection */}
      {services.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-brand-black mb-3">
            서비스 선택 <span className="text-zinc-400">(선택)</span>
          </label>
          <div className="space-y-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={setSelectedService}
                isSelected={selectedService?.id === service.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Project Brief */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          프로젝트 설명 <span className="text-red-500">*</span>
        </label>
        <textarea
          value={projectBrief}
          onChange={(e) => setProjectBrief(e.target.value)}
          placeholder="프로젝트에 대해 자세히 설명해주세요. 어떤 목적으로, 어떤 결과물이 필요한지 알려주세요."
          rows={5}
          className="w-full px-4 py-3 bg-white border border-brand-beige rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
          required
        />
      </div>

      {/* Budget & Deadline */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-black mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            예산 범위
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
          >
            <option value="">선택 안함</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-black mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            희망 마감일
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2.5 bg-white border border-brand-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
          />
        </div>
      </div>

      {/* Additional Message */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          추가 메시지 <span className="text-zinc-400">(선택)</span>
        </label>
        <textarea
          value={clientMessage}
          onChange={(e) => setClientMessage(e.target.value)}
          placeholder={`${expertName} 전문가에게 전하고 싶은 말이 있다면 적어주세요.`}
          rows={3}
          className="w-full px-4 py-3 bg-white border border-brand-beige rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !projectBrief.trim()}
        className="w-full py-3.5 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            신청 중...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            상담 신청하기
          </>
        )}
      </button>

      {/* Login Notice */}
      {!isLoggedIn && (
        <p className="text-center text-sm text-zinc-500">
          상담 신청을 위해{' '}
          <button
            type="button"
            onClick={onLoginRequired}
            className="text-brand-gold font-medium hover:underline"
          >
            로그인
          </button>
          이 필요합니다.
        </p>
      )}
    </form>
  )
}
