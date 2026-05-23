import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppShell } from "@/components/AppShell";
import { CartItemCard } from "@/components/CartItemCard";
import { SummaryRow } from "@/components/CartSummaryRow";
import { PrimaryButton } from "@/components/PrimaryButton";
import { TextField } from "@/components/TextField";

import { useCheckout } from "@/hooks/useCheckout";
import { useCouponDiscount } from "@/hooks/useCouponDiscount";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";

import { theme } from "@/global/theme";
import { formatCurrency } from "@/utils/numbers";

export default function CartScreen() {
  const router = useRouter();

  const { currentUser } = useAuthStore();

  const {
    items,
    totalQuantity,
    subtotal,
    storeDiscount,
    couponDiscount,
    discountTotal,
    total,
    updateQuantity,
    removeFromCart,
  } = useCartStore();

  const {
    appliedCoupon,
    error: couponError,
    isLoading: isCouponLoading,
    handleApplyCoupon,
    removeCoupon,
  } = useCouponDiscount();

  const { error: checkoutError, isSubmitting, submitCheckout } = useCheckout();

  const [couponCode, setCouponCode] = useState("");

  console.log("cart store", useCartStore());

  async function handleCheckout() {
    const cart = {
      items,
      totalQuantity,
      subtotal,
      storeDiscount,
      couponDiscount,
      discountTotal,
      total,
    };

    const result = await submitCheckout(cart);

    if (result.success) {
      router.push("/checkout-success");
    }
  }

  return (
    <AppShell
      actions={
        !currentUser && (
          <PrimaryButton
            label="Login"
            onPress={() => router.push("/profile")}
          />
        )
      }
      subtitle={
        currentUser
          ? `Thanks for buying with us, ${currentUser.name}.`
          : "You need to login to finish your purchase."
      }
      title="Your cart"
    >
      {items.length ? (
        <>
          <View style={styles.list}>
            {items.map((item) => (
              <CartItemCard
                item={item}
                key={item.product.id}
                onDecrease={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                onIncrease={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                onRemove={() => removeFromCart(item.product.id)}
              />
            ))}
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Do you have a coupon code?</Text>
            <TextField
              label="Coupon code"
              onChangeText={setCouponCode}
              placeholder="insert your coupon code here"
              testID="coupon-code-input"
              value={couponCode}
            />
            <PrimaryButton
              label="Apply"
              loading={isCouponLoading}
              onPress={() => handleApplyCoupon(couponCode)}
              testID="apply-coupon-button"
              disabled={!!appliedCoupon}
            />
            {couponError && <Text style={styles.errorText}>{couponError}</Text>}
            {appliedCoupon && (
              <>
                <PrimaryButton
                  label="Remove coupon"
                  onPress={removeCoupon}
                  testID="remove-coupon-button"
                  variant="ghost"
                />
                <View
                  style={styles.couponSuccess}
                  testID="coupon-applied-feedback"
                >
                  <Text style={styles.couponSuccessText}>
                    Coupon {appliedCoupon.code} applied.
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order summary</Text>

            <SummaryRow label="Items" value={String(totalQuantity)} />

            <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />

            {storeDiscount > 0 && (
              <SummaryRow
                label="Store discount"
                value={`-${formatCurrency(storeDiscount)}`}
              />
            )}

            {appliedCoupon ? (
              <SummaryRow
                label={`Coupon (${appliedCoupon.code})`}
                value={`-${formatCurrency(couponDiscount)}`}
              />
            ) : null}

            <SummaryRow label="Final price" value={formatCurrency(total)} />

            {checkoutError && (
              <Text style={styles.errorText}>{checkoutError}</Text>
            )}

            <View style={styles.checkoutActions}>
              {!currentUser && (
                <>
                  <Text style={styles.checkoutTitle}>Login required</Text>
                  <PrimaryButton
                    label="Login"
                    onPress={() => router.push("/profile")}
                  />
                </>
              )}
              <PrimaryButton
                disabled={!currentUser || !items.length}
                fullWidth
                label="Finish purchase"
                loading={isSubmitting}
                onPress={handleCheckout}
                testID="finish-purchase-button"
              />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.summaryTitle}>Your cart is empty.</Text>
          <Text style={styles.checkoutText}>
            Add some products first, then come back to checkout.
          </Text>
          <PrimaryButton
            fullWidth
            label="Browse products"
            onPress={() => router.push("/")}
          />
        </View>
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  checkoutActions: {
    gap: theme.spacing.sm,
  },
  checkoutText: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  checkoutTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 18,
  },
  couponSuccess: {
    backgroundColor: theme.colors.primaryMuted,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
  },
  couponSuccessText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  emptyState: {
    alignItems: "flex-start",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.danger,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
  },
  list: {
    gap: theme.spacing.md,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  summaryTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 24,
  },
});
