'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { useCartStore, useIsInCart } from '@/lib/cart/store'

interface AddToCartButtonProps {
  fontId: string
  fontName: string
  foundry: string
  price: number
  licenseType: 'personal' | 'commercial' | 'enterprise'
  previewImage?: string
  variant?: 'default' | 'small' | 'icon'
  className?: string
}

export default function AddToCartButton({
  fontId,
  fontName,
  foundry,
  price,
  licenseType,
  previewImage,
  variant = 'default',
  className = '',
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)
  const isInCart = useIsInCart(fontId, licenseType)

  const handleAddToCart = async () => {
    if (isInCart) {
      openCart()
      return
    }

    setIsAdding(true)

    // Simulate a brief delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300))

    addItem({
      fontId,
      fontName,
      foundry,
      price,
      licenseType,
      previewImage,
    })

    setIsAdding(false)
    openCart()
  }

  // Icon variant (for card hover state)
  if (variant === 'icon') {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`p-2 rounded-full transition-all ${
          isInCart
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black'
        } disabled:opacity-50 ${className}`}
        aria-label={isInCart ? '장바구니에 있음' : '장바구니에 담기'}
      >
        {isAdding ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isInCart ? (
          <Check className="w-4 h-4" />
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}
      </button>
    )
  }

  // Small variant (for inline buttons)
  if (variant === 'small') {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
          isInCart
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black'
        } disabled:opacity-50 ${className}`}
      >
        {isAdding ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isInCart ? (
          <>
            <Check className="w-3.5 h-3.5" />
            담김
          </>
        ) : (
          <>
            <ShoppingCart className="w-3.5 h-3.5" />
            담기
          </>
        )}
      </button>
    )
  }

  // Default variant (full button)
  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`flex items-center justify-center gap-2 w-full py-3 font-bold rounded-xl transition-all ${
        isInCart
          ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
          : 'bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black'
      } disabled:opacity-50 ${className}`}
    >
      {isAdding ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isInCart ? (
        <>
          <Check className="w-5 h-5" />
          장바구니에 담김
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          장바구니에 담기
        </>
      )}
    </button>
  )
}
