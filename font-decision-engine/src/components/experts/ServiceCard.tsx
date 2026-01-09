'use client'

import { Clock, RefreshCw, Check } from 'lucide-react'
import type { ExpertService } from '@/types/expert'

interface ServiceCardProps {
  service: ExpertService
  onSelect?: (service: ExpertService) => void
  isSelected?: boolean
}

const categoryColors: Record<string, string> = {
  consultation: 'bg-blue-100 text-blue-700',
  design: 'bg-purple-100 text-purple-700',
  writing: 'bg-emerald-100 text-emerald-700',
  package: 'bg-brand-gold/20 text-brand-gold',
}

const categoryLabels: Record<string, string> = {
  consultation: '컨설팅',
  design: '디자인',
  writing: '카피라이팅',
  package: '패키지',
}

const priceTypeLabels: Record<string, string> = {
  fixed: '',
  starting_from: '~',
  hourly: '/시간',
}

export default function ServiceCard({
  service,
  onSelect,
  isSelected = false,
}: ServiceCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(service)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        relative p-5 bg-white rounded-xl border-2 transition-all
        ${onSelect ? 'cursor-pointer' : ''}
        ${isSelected
          ? 'border-brand-gold shadow-md'
          : 'border-brand-beige hover:border-brand-gold/50'
        }
      `}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
              categoryColors[service.category] || 'bg-zinc-100 text-zinc-600'
            }`}
          >
            {categoryLabels[service.category] || service.category}
          </span>
          <h3 className="mt-2 font-bold text-brand-black">{service.name}</h3>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-brand-black">
            {service.price_type === 'starting_from' && (
              <span className="text-sm font-normal text-zinc-400">시작가 </span>
            )}
            {service.price.toLocaleString()}원
            {priceTypeLabels[service.price_type]}
          </p>
        </div>
      </div>

      {/* Description */}
      {service.description && (
        <p className="mt-3 text-sm text-zinc-600 line-clamp-2">
          {service.description}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-brand-beige text-xs text-zinc-500">
        {service.delivery_days && (
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {service.delivery_days}일 소요
          </span>
        )}
        {service.revisions_included > 0 && (
          <span className="flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" />
            수정 {service.revisions_included}회 포함
          </span>
        )}
      </div>
    </div>
  )
}

// Compact version for list display
export function ServiceCardCompact({ service }: { service: ExpertService }) {
  return (
    <div className="flex items-center justify-between p-3 bg-brand-paper rounded-lg">
      <div className="flex items-center gap-3">
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            categoryColors[service.category] || 'bg-zinc-100 text-zinc-600'
          }`}
        >
          {categoryLabels[service.category] || service.category}
        </span>
        <span className="text-sm font-medium text-brand-black">{service.name}</span>
      </div>
      <span className="font-bold text-brand-black">
        {service.price.toLocaleString()}원
        {service.price_type === 'starting_from' && '~'}
      </span>
    </div>
  )
}
