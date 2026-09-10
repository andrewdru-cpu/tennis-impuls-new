import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  YANDEX_METRIKA_HEAD_SCRIPT,
  YandexMetrikaNoscript,
} from "@/components/analytics/yandex-metrika";
import { CRITICAL_CSS } from "@/lib/critical-css";
import { fontSans, fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — теннис, падел и фитнес в Мытищах`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "теннис",
    "теннисный клуб",
    "Мытищи",
    "Лосиный Остров",
    "бронирование корта",
    "детская школа по теннису",
    "ЦТТ Импульс",
  ],
  openGraph: {
    title: `${siteConfig.name} — теннис, падел и фитнес в Мытищах`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2F24",
};

/**
 * globals.css — всегда через import (SSR <link rel="stylesheet"> в document).
 * CRITICAL_CSS — inline fallback, если chunk /_next/static/css/* не загрузился.
 * CSP не используем (не блокируем style-src).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={fontVariables}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- официальный сниппет Метрики должен быть в View Source */}
        <script
          id="yandex-metrika-46954113"
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: YANDEX_METRIKA_HEAD_SCRIPT }}
        />
        <YandexMetrikaNoscript />
      </head>
      <body
        className={`${fontSans.className} antialiased`}
        style={{
          backgroundColor: "#F8F5F0",
          color: "#1F2E2A",
          margin: 0,
        }}
      >
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }}
        />
        {children}
      </body>
    </html>
  );
}
