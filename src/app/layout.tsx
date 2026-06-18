import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSans, fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — теннисный клуб в Мытищах`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "теннис",
    "теннисный клуб",
    "Мытищи",
    "Лосиный Остров",
    "бронирование корта",
    "теннисная академия",
    "ЦТТ Импульс",
  ],
  openGraph: {
    title: `${siteConfig.name} — теннисный клуб в Мытищах`,
    description: siteConfig.description,
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F3D2E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={fontVariables}>
      <body className={`${fontSans.className} antialiased`}>{children}</body>
    </html>
  );
}
