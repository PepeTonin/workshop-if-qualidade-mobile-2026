export const theme = {
  colors: {
    background: "#F4F7FB",
    surface: "#FFFFFF",
    surfaceMuted: "#E9F1F8",
    primary: "#0F766E",
    primaryMuted: "#D8F1ED",
    text: "#17212B",
    textMuted: "#5F6C7B",
    border: "#D5DEE8",
    success: "#1E8F5D",
    warning: "#D48A14",
    danger: "#C53B3B",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 24,
    pill: 999,
  },
  fonts: {
    regular: "Roboto_400Regular",
    medium: "Roboto_500Medium",
    bold: "Roboto_700Bold",
  },
  layout: {
    maxWidth: 1120,
  },
} as const;
