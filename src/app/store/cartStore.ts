import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/app/types/cart'

type CartStore = {
  items: CartItem[]

  addItem: (productId: string, variantId: string) => void
  removeItem: (productId: string, variantId: string) => void
  incrementItem: (productId: string, variantId: string) => void
  decrementItem: (productId: string, variantId: string) => void
  setQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
}

const isSameItem = (item: CartItem, productId: string, variantId: string) =>
  item.productId === productId && item.variantId === variantId

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (productId, variantId) =>
        set((state) => {
          const existingItem = state.items.find((item) => isSameItem(item, productId, variantId))

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                isSameItem(item, productId, variantId)
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return {
            items: [...state.items, { productId, variantId, quantity: 1 }],
          }
        }),

      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter((item) => !isSameItem(item, productId, variantId)),
        })),

      incrementItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.map((item) =>
            isSameItem(item, productId, variantId)
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decrementItem: (productId, variantId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              isSameItem(item, productId, variantId)
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      setQuantity: (productId, variantId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => !isSameItem(item, productId, variantId)),
            }
          }

          return {
            items: state.items.map((item) =>
              isSameItem(item, productId, variantId) ? { ...item, quantity } : item,
            ),
          }
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'xymera-cart',
    },
  ),
)
