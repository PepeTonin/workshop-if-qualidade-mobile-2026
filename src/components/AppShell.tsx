import { ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/global/theme";

type AppShellProps = {
  actions?: ReactNode;
  children: ReactNode;
  subtitle: string;
  title: string;
};

export function AppShell({
  actions,
  children,
  subtitle,
  title,
}: AppShellProps) {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.page}>
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            {actions ? <View style={styles.actions}>{actions}</View> : null}
          </View>
          <View style={styles.body}>{children}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    justifyContent: "flex-end",
  },
  body: {
    gap: theme.spacing.lg,
  },
  titleBlock: {
    flex: 1,
    gap: theme.spacing.xs,
    minWidth: 260,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
    justifyContent: "space-between",
  },
  page: {
    alignSelf: "center",
    gap: theme.spacing.xl,
    maxWidth: theme.layout.maxWidth,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    width: "100%",
  },
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 720,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 32,
    lineHeight: 38,
  },
});
