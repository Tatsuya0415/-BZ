import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7f6",
          100: "#d9ebe8",
          200: "#b3d7d1",
          300: "#83bcb2",
          400: "#559d92",
          500: "#3c8177",
          600: "#2f6961",
          700: "#28544e",
          800: "#234441",
          900: "#1f3937",
        },
      },
    },
  },
  plugins: [],
};

export default config;
