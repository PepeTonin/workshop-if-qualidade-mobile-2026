import { useState } from "react";

import { finishPurchase } from "@/api/connectors/checkout.connector";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import type { Cart } from "@/types/cart";

type CheckoutResult = {
  success: boolean;
  error?: string;
};

export function useCheckout() {
  const { currentUser } = useAuthStore();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setLastOrderId, clearCart } = useCartStore();

  async function submitCheckout(cart: Cart): Promise<CheckoutResult> {
    if (!currentUser) {
      const message = "You need to log in before finishing your purchase.";
      setError(message);
      return { success: false, error: message };
    }

    if (!cart.items.length) {
      const message = "Your cart is empty.";
      setError(message);
      return { success: false, error: message };
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload = {
        items: cart.items,
        quantity: cart.totalQuantity,
        total: cart.total,
      };

      const result = await finishPurchase(payload);

      setLastOrderId(result.orderId);
      clearCart();

      return { success: true };
    } catch (error) {
      console.error(error);
      const message =
        "An error occurred while finishing your purchase. Please try again.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    error,
    isSubmitting,
    submitCheckout,
  };
}
