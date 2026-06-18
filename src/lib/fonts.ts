import { Inter, Sora } from "next/font/google";

/**
 * Основной текст — Inter (variable, latin + cyrillic).
 * Заголовки — Sora (latin only; кириллица уходит в Inter через font-display fallback в Tailwind).
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
export const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "optional",
  preload: false,
  adjustFontFallback: true,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/** CSS-классы для <html>: CSS-переменные обоих шрифтов */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable}`;
