/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // ── Brand Colors ──────────────────────────────────────
      colors: {
        // Primary
        "lingua-purple": "#6C4EF5",
        "lingua-deep-purple": "#5B3BF6",
        "lingua-blue": "#4D8BFF",
        "lingua-green": "#21C16B",
        "lingua-orange": "#FF6B35",

        // Semantic
        success: "#21C16B",
        warning: "#FFC800",
        streak: "#FF8A00",
        error: "#FF4D4F",
        info: "#4D8BFF",

        // Neutral
        "text-primary": "#0D132B",
        "text-secondary": "#6B7280",
        border: "#E5E7EB",
        surface: "#F6F7FB",
        background: "#FFFFFF",

        // Tint backgrounds (for badges, chips, highlights)
        "purple-tint": "#EDE9FE",
        "green-tint": "#D1FAE5",
        "yellow-tint": "#FFFBEB",
        "orange-tint": "#FFF3E0",
        "red-tint": "#FFE4E4",
        "blue-tint": "#EFF6FF",
      },

      // ── Typography ────────────────────────────────────────
      fontFamily: {
        sans: ["Poppins_400Regular", "sans-serif"],
        poppins: ["Poppins_400Regular", "sans-serif"],
        "poppins-medium": ["Poppins_500Medium", "sans-serif"],
        "poppins-semibold": ["Poppins_600SemiBold", "sans-serif"],
        "poppins-bold": ["Poppins_700Bold", "sans-serif"],
      },

      fontSize: {
        h1: ["32px", { lineHeight: "38px", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "31px", fontWeight: "600" }],
        h3: ["20px", { lineHeight: "26px", fontWeight: "600" }],
        h4: ["16px", { lineHeight: "22px", fontWeight: "500" }],
        "body-lg": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "21px", fontWeight: "400" }],
        caption: ["11px", { lineHeight: "15px", fontWeight: "400" }],
      },

      // ── Border Radius ─────────────────────────────────────
      borderRadius: {
        none: "0px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
        full: "9999px",
      },

      // ── Spacing ───────────────────────────────────────────
      spacing: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
      },
    },
  },
  plugins: [],
};
