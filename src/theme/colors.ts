/**
 * Lingua Design System — Color Tokens
 * Source of truth for all colors in the app.
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    purple: "#6C4EF5",
    deepPurple: "#5B3BF6",
    blue: "#4D8BFF",
    green: "#21C16B",
  },

  // Semantic Colors
  semantic: {
    success: "#21C16B",
    warning: "#FFC800",
    streak: "#FF8A00",
    error: "#FF4D4F",
    info: "#4D8BFF",
  },

  // Neutral Colors
  neutral: {
    textPrimary: "#0D132B",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    surface: "#F6F7FB",
    background: "#FFFFFF",
  },

  // Aliases for convenience
  brand: "#6C4EF5",
  white: "#FFFFFF",
  black: "#0D132B",
} as const;

export type ColorKey = keyof typeof colors;
