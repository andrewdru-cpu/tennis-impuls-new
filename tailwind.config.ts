import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Brand palette
        brand: {
          green: "#0F3D2E",
          lime: "#B8E03E",
          ink: "#111827",
          DEFAULT: "#0F3D2E",
        },
        forest: {
          50: "#eef6f1",
          100: "#d6ebe0",
          200: "#aed7c1",
          300: "#7fbd9d",
          400: "#4f9c76",
          500: "#2f7d59",
          600: "#1f6044",
          700: "#184d37",
          800: "#123b2b",
          900: "#0F3D2E",
          950: "#08231a",
        },
        lime: {
          DEFAULT: "#B8E03E",
          50: "#f7fce8",
          100: "#edf8cb",
          200: "#dcf29d",
          300: "#c8e96a",
          400: "#B8E03E",
          500: "#9bc524",
          600: "#779c18",
          700: "#5a7717",
          800: "#485e18",
          900: "#3d5019",
        },
        ink: "#111827",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(15, 61, 46, 0.25)",
        glow: "0 0 0 1px rgba(184, 224, 62, 0.4), 0 16px 50px -12px rgba(184, 224, 62, 0.45)",
        card: "0 24px 60px -24px rgba(8, 35, 26, 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 28s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
