import { dummyjson } from "@/api/dummyjson";
import type { CartItem, CheckoutResponse, CouponResponse } from "@/types/cart";

const COUPON_ROUTES: Record<string, string> = {
  WORKSHOPIFSUMMIT: "/c/6a9a-1f68-4544-b70e",
};

const generateRandomOrderId = () => {
  const timestamp = new Date().toISOString();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${timestamp}-${random}`;
};

interface FinishPurchasePayload {
  items: CartItem[];
  quantity: number;
  total: number;
}

export async function finishPurchase(payload: FinishPurchasePayload) {
  return new Promise((resolve: (value: CheckoutResponse) => void, reject) => {
    setTimeout(() => {
      for (const item of payload.items) {
        const totalDiscountPercentage =
          item.discountPercentage + (item.couponDiscountPercentage ?? 0);
        const MAX_ALLOWED_DISCOUNT_PERCENTAGE = 20;
        if (totalDiscountPercentage > MAX_ALLOWED_DISCOUNT_PERCENTAGE) {
          reject(
            new Error(
              `Discount for "${item.product.title}" is ${item.discountPercentage.toFixed(2)}%, which exceeds the maximum allowed ${MAX_ALLOWED_DISCOUNT_PERCENTAGE}%.`,
            ),
          );
          return;
        }
      }

      const calculatedQuantity = payload.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      if (calculatedQuantity !== payload.quantity) {
        reject(
          new Error(
            `Quantity does not match. Expected: ${payload.quantity}, Calculated: ${calculatedQuantity}`,
          ),
        );
        return;
      }

      const calculatedTotal = payload.items.reduce(
        (sum, item) =>
          sum +
          item.unitPrice *
            item.quantity *
            (1 -
              (item.discountPercentage + (item.couponDiscountPercentage ?? 0)) /
                100),
        0,
      );
      if (Math.abs(calculatedTotal - payload.total) > 0.01) {
        reject(
          new Error(
            `Total price does not match. Expected: ${payload.total.toFixed(2)}, Calculated: ${calculatedTotal.toFixed(2)}`,
          ),
        );
        return;
      }

      resolve({
        orderId: generateRandomOrderId(),
      });
    }, 1000);
  });
}

export async function applyCoupon(payload: {
  normalizedCouponCode: string;
}): Promise<CouponResponse> {
  const route = COUPON_ROUTES[payload.normalizedCouponCode];

  if (!route) {
    throw new Error("Invalid coupon code");
  }

  const response = await dummyjson.get<CouponResponse>(route);
  return response.data;
}
