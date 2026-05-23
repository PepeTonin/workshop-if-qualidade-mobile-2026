import { useState } from "react";

import { applyCoupon } from "@/api/connectors/checkout.connector";
import { useCartStore } from "@/stores/cart-store";
import type { AppliedCoupon } from "@/types/cart";

export function useCouponDiscount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );

  const { applyCouponDiscount, removeDiscount } = useCartStore();

  async function handleApplyCoupon(couponCode: string) {
    setError(null);
    setIsLoading(true);

    try {
      const normalizedCouponCode = couponCode.trim().toUpperCase();
      const result = await applyCoupon({ normalizedCouponCode });

      setAppliedCoupon({
        code: normalizedCouponCode,
        ...result,
      });

      applyCouponDiscount(result.discountPercentage);
    } catch {
      setAppliedCoupon(null);
      setError("Invalid coupon code.");
    } finally {
      setIsLoading(false);
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setError(null);
    removeDiscount();
  }

  return {
    appliedCoupon,
    error,
    isLoading,
    handleApplyCoupon,
    removeCoupon,
  };
}
