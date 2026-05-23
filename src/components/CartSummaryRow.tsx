import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/global/theme";

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLabel: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
  },
  summaryValue: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
});
