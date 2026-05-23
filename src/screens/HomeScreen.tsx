import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProductGrid } from "@/components/ProductGrid";
import { TextField } from "@/components/TextField";
import { theme } from "@/global/theme";
import { useProducts } from "@/hooks/useProducts";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";

export default function HomeScreen() {
  const { currentUser } = useAuthStore();
  const { addToCart } = useCartStore();
  const {
    filteredProducts,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    error,
    page,
    query,
    setQuery,
    totalPages,
    refetch,
  } = useProducts();

  return (
    <AppShell
      actions={
        <PrimaryButton
          label="Update catalog"
          onPress={refetch}
          variant="secondary"
        />
      }
      subtitle={
        currentUser
          ? `Welcome, ${currentUser.name}.`
          : "Login or sign up in the Profile tab to complete a purchase."
      }
      title="Workshop Store"
    >
      <View style={styles.controls}>
        <TextField
          fullWidth
          autoCapitalize="none"
          label="Search products"
          onChangeText={setQuery}
          placeholder="Search by title, brand or category"
          testID="product-search-input"
          value={query}
        />
      </View>

      {error && (
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>Error in catalog</Text>
          <Text style={styles.feedbackText}>{error}</Text>
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingState}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
          <Text style={styles.feedbackText}>Loading products...</Text>
        </View>
      ) : (
        <>
          <ProductGrid onAddToCart={addToCart} products={filteredProducts} />
          {totalPages > 1 && (
            <View style={styles.pagination}>
              <PrimaryButton
                disabled={!hasPreviousPage}
                label="Previous"
                onPress={goToPreviousPage}
                variant="secondary"
              />
              <Text style={styles.paginationText}>
                Page {page} of {totalPages}
              </Text>
              <PrimaryButton
                disabled={!hasNextPage}
                label="Next"
                onPress={goToNextPage}
                variant="secondary"
              />
            </View>
          )}
        </>
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  controls: {
    gap: theme.spacing.md,
    alignItems: "flex-start",
  },
  feedbackCard: {
    backgroundColor: "#FFF4F4",
    borderColor: "#F0C5C5",
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  feedbackText: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  feedbackTitle: {
    color: theme.colors.danger,
    fontFamily: theme.fonts.bold,
    fontSize: 18,
  },
  loadingState: {
    alignItems: "center",
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.xl,
  },
  pagination: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
    justifyContent: "center",
  },
  paginationText: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.medium,
    fontSize: 15,
  },
});
