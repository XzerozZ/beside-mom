import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary5: "#B36868",
        neutral05: "#4D4D4D",
        neutral04: "#999999",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-thai)", "system-ui", "sans-serif"],
        "noto-sans-thai": ["var(--font-noto-sans-thai)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
