import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { TextField } from "@/components/TextField";
import { theme } from "@/global/theme";
import { useAuthStore } from "@/stores/auth-store";

type AuthMode = "login" | "signup";

export default function ProfileScreen() {
  const { currentUser, login, logout, signUp } = useAuthStore();

  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleLogin() {
    const result = login({ email, password });

    if (!result.success) {
      setError(result.error ?? "Login failed.");
      return;
    }

    setError(null);
  }

  function handleSignUp() {
    const result = signUp({ email, name, password });

    if (!result.success) {
      setError(result.error ?? "Sign up failed.");
      return;
    }

    setError(null);
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError(null);
    setEmail("");
    setPassword("");
    setName("");
  }

  if (currentUser) {
    return (
      <AppShell
        subtitle={`Logged in as ${currentUser.email}`}
        title={`Hello, ${currentUser.name}`}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Account details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{currentUser.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{currentUser.email}</Text>
          </View>
          <PrimaryButton
            fullWidth
            label="Logout"
            onPress={logout}
            testID="logout-button"
            variant="ghost"
          />
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell
      subtitle={
        mode === "login"
          ? "Enter your email and password to login."
          : "Create an account to complete your purchase."
      }
      title={mode === "login" ? "Login" : "Sign up"}
    >
      <View style={styles.card}>
        {mode === "signup" && (
          <TextField
            autoCapitalize="words"
            label="Full name"
            onChangeText={setName}
            placeholder="Ada Lovelace"
            value={name}
          />
        )}
        <TextField
          label="Email"
          onChangeText={setEmail}
          placeholder="name@example.com"
          value={email}
        />
        <TextField
          label="Password"
          onChangeText={setPassword}
          placeholder={
            mode === "login" ? "Enter your password" : "Choose a password"
          }
          secureTextEntry
          value={password}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.actions}>
          {mode === "login" ? (
            <>
              <PrimaryButton
                fullWidth
                label="Login"
                onPress={handleLogin}
                testID="login-submit-button"
              />
              <PrimaryButton
                fullWidth
                label="Create a new account"
                onPress={() => switchMode("signup")}
                testID="signup-button"
                variant="ghost"
              />
            </>
          ) : (
            <>
              <PrimaryButton
                fullWidth
                label="Create account"
                onPress={handleSignUp}
                testID="signup-submit-button"
              />
              <PrimaryButton
                fullWidth
                label="I already have an account"
                onPress={() => switchMode("login")}
                variant="ghost"
              />
            </>
          )}
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: theme.spacing.sm,
  },
  card: {
    alignSelf: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.md,
    maxWidth: 520,
    padding: theme.spacing.lg,
    width: "100%",
  },
  detailLabel: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
  detailRow: {
    gap: theme.spacing.xs,
  },
  detailValue: {
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
    fontSize: 16,
  },
  error: {
    color: theme.colors.danger,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    lineHeight: 26,
  },
});
