import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";

import { theme } from "@/global/theme";
import type { Product } from "@/types/product";

import { ProductCard } from "./ProductCard";
import { ProductEmptyState } from "./ProductEmptyState";

const GRID_GAP = theme.spacing.md;
const PAGE_HORIZONTAL_PADDING = theme.spacing.md * 2;

type ProductGridProps = {
  onAddToCart: (product: Product) => void;
  products: Product[];
};

function getColumnCount(width: number) {
  if (width >= 1024) {
    return 3;
  }

  if (width >= 700) {
    return 2;
  }

  return 1;
}

export function ProductGrid({ onAddToCart, products }: ProductGridProps) {
  const { width } = useWindowDimensions();
  const columns = getColumnCount(width);
  const contentWidth =
    Math.min(width, theme.layout.maxWidth) - PAGE_HORIZONTAL_PADDING;
  const itemWidth = (contentWidth - GRID_GAP * (columns - 1)) / columns;

  return (
    <FlatList
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      contentContainerStyle={styles.grid}
      data={products}
      key={columns}
      keyExtractor={(product) => product.id.toString()}
      ListEmptyComponent={ProductEmptyState}
      numColumns={columns}
      renderItem={({ item: product }) => (
        <View key={product.id} style={[styles.item, { width: itemWidth }]}>
          <ProductCard
            onAddToCart={() => onAddToCart(product)}
            product={product}
          />
        </View>
      )}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: GRID_GAP,
  },
  item: {
    minWidth: 0,
  },
  row: {
    flexDirection: "row",
    gap: GRID_GAP,
  },
});
