'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/cart/store'
import CartItem from './CartItem'

export default function CartDrawer() {
  const { items, isOpen, closeCart, clearCart } = useCartStore()

  const subtotal = items.reduce((total, item) => total + item.price, 0)
  const formattedSubtotal = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(subtotal)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-paper z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-beige bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-brand-black" />
            <h2 className="text-lg font-bold text-brand-black">장바구니</h2>
            <span className="px-2 py-0.5 bg-brand-gold text-xs font-bold text-brand-black rounded-full">
              {items.length}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-zinc-400 hover:text-brand-black hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-brand-beige/50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-zinc-400" />
              </div>
              <p className="text-zinc-500 mb-4">장바구니가 비어있습니다</p>
              <button
                onClick={closeCart}
                className="text-brand-gold font-medium hover:underline"
              >
                폰트 둘러보기
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <CartItem
                  key={`${item.fontId}-${item.licenseType}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-beige bg-white p-6 space-y-4">
            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              장바구니 비우기
            </button>

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">소계</span>
              <span className="text-xl font-bold text-brand-black">{formattedSubtotal}</span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all flex items-center justify-center gap-2"
            >
              결제하기
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-zinc-400 text-center">
              결제 시 이용약관 및 개인정보처리방침에 동의하게 됩니다
            </p>
          </div>
        )}
      </div>
    </>
  )
}
