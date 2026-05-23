import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { theme } from "@/global/theme";

type ButtonVariant = "primary" | "secondary" | "ghost";

type PrimaryButtonProps = {
  disabled?: boolean;
  fullWidth?: boolean;
  label: string;
  loading?: boolean;
  onPress?: () => void;
  testID?: string;
  variant?: ButtonVariant;
};

export function PrimaryButton({
  disabled = false,
  fullWidth = false,
  label,
  loading = false,
  onPress,
  testID,
  variant = "primary",
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary" ? theme.colors.surface : theme.colors.primary
          }
        />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
      )}
    </Pressable>
  );
}

const baseShadow: ViewStyle = {
  shadowColor: "#102030",
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: {
    width: 0,
    height: 6,
  },
  elevation: 3,
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: theme.radius.pill,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
  },
  disabled: {
    opacity: 0.55,
  },
  fullWidth: {
    width: "100%",
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  ghostLabel: {
    color: theme.colors.text,
  },
  label: {
    fontFamily: theme.fonts.medium,
    fontSize: 15,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  primary: {
    backgroundColor: theme.colors.primary,
    ...baseShadow,
  },
  primaryLabel: {
    color: theme.colors.surface,
  },
  secondary: {
    backgroundColor: theme.colors.primaryMuted,
  },
  secondaryLabel: {
    color: theme.colors.primary,
  },
});
