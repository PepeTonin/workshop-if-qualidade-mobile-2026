import { Image, StyleSheet, Text, View } from "react-native";

import { theme } from "@/global/theme";
import type { CartItem } from "@/types/cart";
import { formatCurrency } from "@/utils/numbers";

import { PrimaryButton } from "./PrimaryButton";

type CartItemCardProps = {
  item: CartItem;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

export function CartItemCard({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemCardProps) {
  const totalPrice = item.product.price * item.quantity;
  const totalPriceWithDiscount =
    totalPrice * (1 - item.discountPercentage / 100);

  const hasDiscount = item.discountPercentage > 0;

  return (
    <View style={styles.card} testID={`cart-item-container-${item.product.id}`}>
      <Image source={{ uri: item.product.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.info}>
            <Text
              style={styles.title}
              testID={`cart-item-title-${item.product.id}`}
            >
              {item.product.title}
            </Text>
            <Text style={styles.meta}>{item.product.category}</Text>
            <Text style={styles.price}>
              {formatCurrency(item.product.price)}
            </Text>
          </View>
          <PrimaryButton label="Remove" onPress={onRemove} variant="ghost" />
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.quantityControls}>
            <PrimaryButton label="−" onPress={onDecrease} variant="secondary" />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <PrimaryButton label="+" onPress={onIncrease} variant="secondary" />
          </View>
          <View>
            <Text style={[styles.total, hasDiscount && styles.totalDiscounted]}>
              {formatCurrency(totalPrice)}
            </Text>
            {hasDiscount && (
              <Text style={styles.total}>
                {formatCurrency(totalPriceWithDiscount)}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  content: {
    flex: 1,
    gap: theme.spacing.md,
    minWidth: 240,
  },
  image: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    height: 112,
    width: 112,
  },
  info: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  meta: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
  price: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium,
    fontSize: 16,
  },
  quantity: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 18,
    minWidth: 32,
    textAlign: "center",
  },
  quantityControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 18,
  },
  topRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
    justifyContent: "space-between",
  },
  total: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 18,
  },
  totalDiscounted: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    textDecorationLine: "line-through",
  },
});
