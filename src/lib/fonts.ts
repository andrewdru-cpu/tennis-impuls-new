import { Inter, Onest } from "next/font/google";

/**
 * Основной текст — Inter (variable, latin + cyrillic).
 * Variable-файл уже содержит 400–700 без отдельных static weight.
 * preload: true — единственный critical font для LCP/FOIT.
 */
export const fontSans = Inter({
  subsets: ["cyrillic", "latin"],
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

/**
 * Заголовки — Onest: только реально используемые 600/700.
 * preload: false — не конкурирует с Inter; display:swap → нет FOIT.
 */
export const fontDisplay = Onest({
  subsets: ["cyrillic", "latin"],
  variable: "--font-display",
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
  fallback: ["var(--font-sans)", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/** CSS-классы для <html>: CSS-переменные обоих шрифтов */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable}`;
