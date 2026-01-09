'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useCartStore, type CartItem as CartItemType } from '@/lib/cart/store'

interface CartItemProps {
  item: CartItemType
}

const LICENSE_LABELS = {
  personal: '개인용',
  commercial: '상업용',
  enterprise: '기업용',
}

export default function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem)

  const formattedPrice = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(item.price)

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-brand-beige">
      {/* Preview Image */}
      <div className="w-16 h-16 bg-brand-beige/30 rounded-lg flex-shrink-0 overflow-hidden">
        {item.previewImage ? (
          <Image
            src={item.previewImage}
            alt={item.fontName}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-zinc-300">
            Aa
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/fonts/${item.fontId}`}
          className="block font-medium text-brand-black hover:text-brand-gold transition-colors truncate"
        >
          {item.fontName}
        </Link>
        <p className="text-xs text-zinc-500 truncate">{item.foundry}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] px-2 py-0.5 bg-brand-beige/50 rounded-full text-zinc-600">
            {LICENSE_LABELS[item.licenseType]}
          </span>
          <span className="text-sm font-bold text-brand-black">{formattedPrice}</span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.fontId, item.licenseType)}
        className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="삭제"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
