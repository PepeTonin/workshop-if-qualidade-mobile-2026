import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { theme } from "@/global/theme";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";

export default function CheckoutSuccessScreen() {
  const router = useRouter();

  const { currentUser } = useAuthStore();
  const { lastOrderId } = useCartStore();

  return (
    <AppShell
      subtitle="Your order has been submitted successfully."
      title="Order submitted"
    >
      <View style={styles.card} testID="checkout-success-card">
        <Text style={styles.title} testID="checkout-success-greeting">
          Thanks, {currentUser?.name ?? "shopper"}.
        </Text>
        <Text style={styles.text}>
          Your order has been submitted successfully
        </Text>
        {lastOrderId && (
          <Text style={styles.text}>Order reference: #{lastOrderId}.</Text>
        )}

        <PrimaryButton
          label="Continue shopping"
          onPress={() => router.replace("/")}
        />
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.md,
    maxWidth: 720,
    padding: theme.spacing.lg,
    width: "100%",
  },
  text: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    lineHeight: 30,
  },
});
