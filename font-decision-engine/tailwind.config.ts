import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#1a1612",
          gold: "#b08d57",
          red: "#8e2e2c",
          paper: "#fdfbf7",
          beige: "#e8dfd0",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        serif: ["Pretendard", "Georgia", "serif"],
        mono: ["Pretendard", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "soft": "0 2px 8px -2px rgba(0, 0, 0, 0.05)",
        "card": "0 4px 16px -4px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
