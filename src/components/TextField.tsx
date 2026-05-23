import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { theme } from "@/global/theme";

type TextFieldProps = {
  autoCapitalize?: TextInputProps["autoCapitalize"];
  keyboardType?: KeyboardTypeOptions;
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  testID?: string;
  value: string;
  fullWidth?: boolean;
};

export function TextField({
  autoCapitalize = "none",
  keyboardType = "default",
  label,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  testID,
  value,
  fullWidth = false,
}: TextFieldProps) {
  return (
    <View style={[styles.wrapper, fullWidth && styles.fullWidth]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        testID={testID}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
  },
  label: {
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    marginBottom: theme.spacing.sm,
  },
  wrapper: {
    gap: theme.spacing.xs,
  },
});
