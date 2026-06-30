import { Inter, Onest } from "next/font/google";

/**
 * Основной текст — Inter (variable, latin + cyrillic).
 * Заголовки — Onest (latin + cyrillic): выразительная геометрия с поддержкой русского.
 */
export const fontSans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: [
    "system-ui",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

/** Акцидентный шрифт для заголовков. preload: false — не конкурирует с Inter за LCP. */
export const fontDisplay = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
  fallback: ["var(--font-sans)", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/** CSS-классы для <html>: CSS-переменные обоих шрифтов */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable}`;
