import type { Product } from "./product";

export type CouponResponse = {
  discountPercentage: number;
};

export type AppliedCoupon = CouponResponse & {
  code: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  couponDiscountPercentage?: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  storeDiscount: number;
  couponDiscount: number;
  discountTotal: number;
  total: number;
};

export type CheckoutResponse = {
  orderId: string;
};
