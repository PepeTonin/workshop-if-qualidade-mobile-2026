import { create } from "zustand";

import type { Cart, CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import { round } from "@/utils/numbers";

function computeTotals(items: CartItem[]) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = round(
    items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    2,
  );

  const storeDiscount = round(
    items.reduce(
      (sum, item) =>
        sum + item.unitPrice * item.quantity * (item.discountPercentage / 100),
      0,
    ),
    2,
  );

  const couponDiscount = round(
    items.reduce(
      (sum, item) =>
        sum +
        item.unitPrice *
          item.quantity *
          ((item.couponDiscountPercentage ?? 0) / 100),
      0,
    ),
    2,
  );

  const discountTotal = round(
    items.reduce(
      (sum, item) =>
        sum +
        item.unitPrice *
          item.quantity *
          ((item.discountPercentage + (item.couponDiscountPercentage ?? 0)) /
            100),

      0,
    ),
    2,
  );

  const total = round(subtotal - discountTotal, 2);

  return {
    totalQuantity,
    subtotal,
    storeDiscount,
    couponDiscount,
    discountTotal,
    total,
  };
}

type CartState = Cart & {
  setItems: (items: CartItem[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyCouponDiscount: (couponPercentage: number) => void;
  removeDiscount: () => void;
  setLastOrderId: (orderId: string | null) => void;
  lastOrderId: string | null;
};

const emptyState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
  storeDiscount: 0,
  couponDiscount: 0,
  discountTotal: 0,
  total: 0,
  lastOrderId: null,
};

export const useCartStore = create<CartState>((set) => ({
  ...emptyState,

  setItems: (items) =>
    set(() => ({
      items,
      ...computeTotals(items),
    })),

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.id === product.id,
      );

      const items = existing
        ? state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [
            ...state.items,
            {
              product,
              quantity: 1,
              unitPrice: product.price,
              discountPercentage: product.discountPercentage,
            },
          ];

      return { items, ...computeTotals(items) };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const items = state.items.filter((item) => item.product.id !== productId);
      return {
        items,
        ...computeTotals(items),
      };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const items =
        quantity <= 0
          ? state.items.filter((item) => item.product.id !== productId)
          : state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            );
      return {
        items,
        ...computeTotals(items),
      };
    }),

  clearCart: () => set(emptyState),

  applyCouponDiscount: (couponPercentage) =>
    set((state) => {
      const items = state.items.map((item) => {
        const totalDiscountPercentage =
          item.discountPercentage + couponPercentage;

        let couponDiscountPercentage = couponPercentage;

        if (totalDiscountPercentage >= 20) {
          couponDiscountPercentage = round(20 - item.discountPercentage, 2);
        }

        const itemWithCouponApplied = {
          ...item,
          couponDiscountPercentage,
        };

        return itemWithCouponApplied;
      });

      return {
        items,
        ...computeTotals(items),
      };
    }),

  removeDiscount: () =>
    set((state) => {
      const items = state.items.map((item) => ({
        ...item,
        couponDiscountPercentage: undefined,
      }));

      return {
        items,
        ...computeTotals(items),
      };
    }),

  setLastOrderId: (orderId) => set({ lastOrderId: orderId }),
}));
