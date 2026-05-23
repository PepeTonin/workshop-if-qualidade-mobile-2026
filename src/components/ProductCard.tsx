import { Image, StyleSheet, Text, View } from "react-native";

import { theme } from "@/global/theme";
import type { Product } from "@/types/product";
import { formatCurrency, formatRating } from "@/utils/numbers";

import { PrimaryButton } from "./PrimaryButton";

type ProductCardProps = {
  onAddToCart: () => void;
  product: Product;
};

export function ProductCard({ onAddToCart, product }: ProductCardProps) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <View style={styles.card} testID={`product-card-${product.id}`}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.chips}>
          <Text style={styles.chip}>{product.category}</Text>
          <Text style={styles.chip}>{formatRating(product.rating)}</Text>
        </View>
        <Text
          numberOfLines={2}
          style={styles.title}
          testID={`product-title-${product.id}`}
        >
          {product.title}
        </Text>
        <Text numberOfLines={3} style={styles.description}>
          {product.description}
        </Text>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>{formatCurrency(discountedPrice)}</Text>
            <Text style={styles.previousPrice}>
              {formatCurrency(product.price)}
            </Text>
          </View>
          <Text style={styles.stock}>{product.stock} in stock</Text>
        </View>
        <PrimaryButton
          label="Add to cart"
          onPress={onAddToCart}
          testID={`add-to-cart-${product.id}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%",
  },
  chip: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.pill,
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  content: {
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  description: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  image: {
    backgroundColor: theme.colors.surfaceMuted,
    height: 220,
    resizeMode: "cover",
    width: "100%",
  },
  previousPrice: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    textDecorationLine: "line-through",
  },
  price: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 22,
  },
  priceRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stock: {
    color: theme.colors.success,
    fontFamily: theme.fonts.medium,
    fontSize: 13,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 19,
    lineHeight: 24,
  },
});
