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
        brand: {
          green: "#0A2F24",
          lime: "#C4F04A",
          terracotta: "#E05A38",
          sand: "#E0B07E",
          cream: "#FBF8F3",
          ink: "#243833",
          purple: "#7C3AED",
          red: "#E23636",
          DEFAULT: "#0A2F24",
        },
        /* Насыщенный фиолетовый — акцент палитры */
        purple: {
          DEFAULT: "#7C3AED",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        /* Яркий салатовый акцент */
        "lime-accent": {
          DEFAULT: "#C4F04A",
          50: "#f8ffe6",
          100: "#efffbf",
          200: "#e0ff8a",
          300: "#D4F85C",
          400: "#C4F04A",
          500: "#A8D92E",
          600: "#8BB820",
          700: "#6A8F18",
          800: "#547016",
          900: "#465D16",
        },
        /* Красный для названия «ЦТТ Импульс» */
  "red-ctt": {
          DEFAULT: "#E63946",
          50: "#fef2f3",
          100: "#fde2e4",
          200: "#fbc6cb",
          300: "#f79aa2",
          400: "#EF5C6A",
          500: "#E63946",
          600: "#C92A38",
          700: "#A8222E",
          800: "#8B1E28",
          900: "#711C24",
        },
        forest: {
          50: "#f0f7f4",
          100: "#dceee6",
          200: "#bbe0cd",
          300: "#8fc9ad",
          400: "#5eaa87",
          500: "#3d8a6a",
          600: "#2d6f55",
          700: "#245846",
          800: "#1a4436",
          900: "#12352a",
          950: "#071f18",
        },
        lime: {
          DEFAULT: "#C4F04A",
          50: "#f8ffe6",
          100: "#efffbf",
          200: "#e0ff8a",
          300: "#D4F85C",
          400: "#C4F04A",
          500: "#A8D92E",
          600: "#8BB820",
          700: "#6A8F18",
          800: "#547016",
          900: "#465D16",
        },
        terracotta: {
          DEFAULT: "#E05A38",
          50: "#fff1ec",
          100: "#ffe0d5",
          200: "#ffc2ac",
          300: "#F08A68",
          400: "#E05A38",
          500: "#D04E2E",
          600: "#B84428",
          700: "#973822",
          800: "#7A3020",
          900: "#642A1E",
        },
        sand: {
          DEFAULT: "#E0B07E",
          50: "#fbf6ef",
          100: "#f5ead9",
          200: "#ecd6b8",
          300: "#E0B07E",
          400: "#d19a5c",
          500: "#bc8343",
          600: "#9e6b34",
          700: "#80552c",
          800: "#684628",
          900: "#563b23",
        },
        cream: {
          DEFAULT: "#FBF8F3",
          50: "#FFFEFC",
          100: "#FBF8F3",
          200: "#F3EEE6",
        },
        ink: "#243833",
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
        sans: [
          "var(--font-sans)",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "system-ui",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 7.5vw, 5.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em" },
        ],
        "display-lg": [
          "clamp(1.875rem, 4.2vw, 2.625rem)",
          { lineHeight: "1.1", letterSpacing: "-0.028em" },
        ],
        "display-md": [
          "clamp(1.375rem, 2.8vw, 1.75rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "clamp(1.0625rem, 2vw, 1.25rem)",
          { lineHeight: "1.3", letterSpacing: "-0.015em" },
        ],
        body: ["1.0625rem", { lineHeight: "1.65", letterSpacing: "-0.008em" }],
        "body-lg": [
          "1.1875rem",
          { lineHeight: "1.7", letterSpacing: "-0.01em" },
        ],
        caption: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      backgroundImage: {
        "gradient-purple-lime":
          "linear-gradient(105deg, #6D28D9 0%, #8B5CF6 32%, #A3E635 78%, #B8F04A 100%)",
        "gradient-purple-lime-soft":
          "linear-gradient(135deg, rgba(109, 40, 217, 0.08) 0%, rgba(163, 230, 53, 0.12) 100%)",
      },
      boxShadow: {
        soft:
          "0 2px 8px -2px rgba(18, 53, 42, 0.06), 0 12px 32px -8px rgba(18, 53, 42, 0.1)",
        glow:
          "0 0 0 1px rgba(224, 90, 56, 0.3), 0 8px 32px -4px rgba(224, 90, 56, 0.4), 0 20px 52px -12px rgba(124, 58, 237, 0.12)",
        "glow-lime":
          "0 0 0 1px rgba(196, 240, 74, 0.35), 0 8px 28px -4px rgba(196, 240, 74, 0.32), 0 16px 40px -10px rgba(18, 53, 42, 0.1)",
        "glow-warm":
          "0 0 0 1px rgba(224, 90, 56, 0.3), 0 10px 36px -6px rgba(224, 90, 56, 0.4), 0 14px 44px -8px rgba(196, 240, 74, 0.22)",
        "glow-purple":
          "0 0 0 1px rgba(124, 58, 237, 0.28), 0 10px 36px -6px rgba(124, 58, 237, 0.35), 0 14px 44px -8px rgba(196, 240, 74, 0.18)",
        card:
          "0 1px 3px rgba(18, 53, 42, 0.05), 0 18px 52px -12px rgba(18, 53, 42, 0.14)",
        elevated:
          "0 4px 12px rgba(18, 53, 42, 0.06), 0 24px 64px -16px rgba(18, 53, 42, 0.18)",
        terracotta:
          "0 8px 28px -4px rgba(224, 90, 56, 0.5), 0 2px 12px -2px rgba(224, 90, 56, 0.28)",
        lime: "0 8px 24px -4px rgba(196, 240, 74, 0.45), 0 2px 10px -2px rgba(196, 240, 74, 0.25)",
        inner: "inset 0 1px 2px rgba(18, 53, 42, 0.06)",
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
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(5px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 28s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float-y": "float-y 2.8s cubic-bezier(0.45, 0, 0.55, 1) infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-smooth": "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      transitionDuration: {
        400: "400ms",
        650: "650ms",
        750: "750ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
