import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/global/theme";

type ProductEmptyStateProps = {
  description?: string;
  title?: string;
};

export function ProductEmptyState({
  description = "Try searching by a different name, brand or category.",
  title = "No products found",
}: ProductEmptyStateProps) {
  return (
    <View style={styles.container} testID="products-empty-state">
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.sm,
    padding: theme.spacing.xl,
  },
  description: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center",
  },
});
