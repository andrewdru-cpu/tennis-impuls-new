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
          lime: "#B4DC42",
          terracotta: "#CE5838",
          sand: "#D4A574",
          cream: "#F8F5F0",
          ink: "#1F2E2A",
          DEFAULT: "#0A2F24",
        },
        forest: {
          50: "#eef5f2",
          100: "#d8ebe3",
          200: "#b3d7c7",
          300: "#85bba5",
          400: "#559a7f",
          500: "#357a61",
          600: "#25614d",
          700: "#1c4d3c",
          800: "#123d2f",
          900: "#0A2F24",
          950: "#051912",
        },
        lime: {
          DEFAULT: "#B4DC42",
          50: "#f7fbe9",
          100: "#edf6cf",
          200: "#dceca0",
          300: "#C8E868",
          400: "#B4DC42",
          500: "#9BC832",
          600: "#7aab24",
          700: "#5c831c",
          800: "#496619",
          900: "#3d5518",
        },
        terracotta: {
          DEFAULT: "#CE5838",
          50: "#fdf1ec",
          100: "#f8ddd3",
          200: "#f0b5a0",
          300: "#E07858",
          400: "#CE5838",
          500: "#C05432",
          600: "#B04E2E",
          700: "#934028",
          800: "#783524",
          900: "#622d20",
        },
        sand: {
          DEFAULT: "#D4A574",
          50: "#faf5ee",
          100: "#f3e8d8",
          200: "#e8d4b8",
          300: "#D4A574",
          400: "#c49258",
          500: "#b07d42",
          600: "#946735",
          700: "#78522c",
          800: "#624427",
          900: "#523923",
        },
        cream: {
          DEFAULT: "#F8F5F0",
          50: "#FDFCFA",
          100: "#F8F5F0",
          200: "#F0EBE3",
        },
        ink: "#1F2E2A",
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
      boxShadow: {
        soft:
          "0 2px 8px -2px rgba(10, 47, 36, 0.06), 0 12px 32px -8px rgba(10, 47, 36, 0.1)",
        glow:
          "0 0 0 1px rgba(206, 88, 56, 0.28), 0 8px 32px -4px rgba(206, 88, 56, 0.38), 0 20px 52px -12px rgba(10, 47, 36, 0.14)",
        "glow-lime":
          "0 0 0 1px rgba(180, 220, 66, 0.3), 0 8px 28px -4px rgba(180, 220, 66, 0.28), 0 16px 40px -10px rgba(10, 47, 36, 0.1)",
        "glow-warm":
          "0 0 0 1px rgba(206, 88, 56, 0.22), 0 8px 32px -6px rgba(206, 88, 56, 0.3), 0 12px 40px -8px rgba(180, 220, 66, 0.18)",
        card:
          "0 1px 3px rgba(10, 47, 36, 0.04), 0 16px 48px -12px rgba(10, 47, 36, 0.14)",
        elevated:
          "0 4px 12px rgba(10, 47, 36, 0.06), 0 24px 64px -16px rgba(10, 47, 36, 0.2)",
        terracotta:
          "0 8px 28px -4px rgba(206, 88, 56, 0.48), 0 2px 12px -2px rgba(206, 88, 56, 0.25)",
        lime: "0 8px 24px -4px rgba(180, 220, 66, 0.4), 0 2px 10px -2px rgba(180, 220, 66, 0.2)",
        inner: "inset 0 1px 2px rgba(10, 47, 36, 0.06)",
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
