'use client'

import { Tag, isPremiumTag } from '@/lib/access'

export default function TagChip({ tag, onClick }: { tag: Tag, onClick?: (tag: Tag) => void }) {
  const premium = isPremiumTag(tag);

  return (
    <span
      onClick={() => onClick && onClick(tag)}
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200
        ${premium 
          ? 'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'}
      `}
    >
      {tag.name}
      {premium && <span className="ml-1" title="Premium Context">🔒</span>}
    </span>
  )
}
