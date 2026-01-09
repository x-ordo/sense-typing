// src/lib/cart/store.ts
// Cart state management with Zustand

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  fontId: string
  fontName: string
  foundry: string
  price: number
  licenseType: 'personal' | 'commercial' | 'enterprise'
  previewImage?: string
  addedAt: Date
}

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (item: Omit<CartItem, 'addedAt'>) => void
  removeItem: (fontId: string, licenseType: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  // Computed
  getItemCount: () => number
  getSubtotal: () => number
  hasItem: (fontId: string, licenseType?: string) => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existingItem = get().items.find(
          (i) => i.fontId === item.fontId && i.licenseType === item.licenseType
        )

        if (existingItem) {
          // Item already in cart, don't add duplicate
          return
        }

        set((state) => ({
          items: [...state.items, { ...item, addedAt: new Date() }],
        }))
      },

      removeItem: (fontId, licenseType) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.fontId === fontId && item.licenseType === licenseType)
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getItemCount: () => get().items.length,

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price, 0)
      },

      hasItem: (fontId, licenseType) => {
        const items = get().items
        if (licenseType) {
          return items.some(
            (item) => item.fontId === fontId && item.licenseType === licenseType
          )
        }
        return items.some((item) => item.fontId === fontId)
      },
    }),
    {
      name: 'sense-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
    }
  )
)

// Helper hook for cart item count (for badge display)
export const useCartItemCount = () => useCartStore((state) => state.items.length)

// Helper hook for checking if an item is in cart
export const useIsInCart = (fontId: string, licenseType?: string) =>
  useCartStore((state) =>
    licenseType
      ? state.items.some((item) => item.fontId === fontId && item.licenseType === licenseType)
      : state.items.some((item) => item.fontId === fontId)
  )
