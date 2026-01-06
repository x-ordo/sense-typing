'use client'

import { Tag, isPremiumTag } from '@/lib/access'
import { trackSignal } from '@/lib/paywall'

export default function TagChip({ tag, onClick }: { tag: Tag, onClick?: (tag: Tag) => void }) {
  const premium = isPremiumTag(tag);

  const handleClick = () => {
    if (premium) {
      trackSignal('premiumTagTouched')
    }
    if (onClick) {
      onClick(tag)
    }
  }

  return (
    <span
      onClick={handleClick}
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200 select-none
        ${premium 
          ? 'bg-red-50 text-red-700 border border-red-100 hover:bg-red-100' 
          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'}
      `}
    >
      {tag.name}
      {premium && <span className="ml-1 text-[10px]" title="Premium Context">🔒</span>}
    </span>
  )
}