import type { Metadata, Viewport } from "next";
import "./globals.css";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
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
    "детская школа по теннису",
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
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2F24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={fontVariables}>
      <body className={`${fontSans.className} antialiased`}>
        <style
          dangerouslySetInnerHTML={{
            __html: `#hero{background-color:#0A2F24;color:#fff}#hero [data-hero-content],#hero [data-hero-content] *{opacity:1!important;visibility:visible!important}#hero h1,#hero p,#hero a{color:#fff}`,
          }}
        />
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
