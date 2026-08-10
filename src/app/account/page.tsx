import type { Metadata } from "next";
import Link from "next/link";

import { Fit1cAccountLk } from "@/components/fit1c/fit1c-widgets";
import { Logo } from "@/components/logo";
import { ArrowLeft } from "@/lib/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Личный кабинет",
  description:
    "Личный кабинет клиента ЦТТ «Импульс»: занятия, абонементы и бронирования.",
  robots: { index: false, follow: false },
};

/**
 * Отдельная страница ЛК 1С:Фитнес — только минимальная шапка + виджет.
 * Не встраивать на главную.
 */
export default function AccountPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-white/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
        <div className="container-wide flex h-14 items-center justify-between gap-3 sm:h-16">
          <Link
            href="/"
            className="min-w-0 shrink"
            aria-label={siteConfig.name}
          >
            <Logo variant="dark" compact />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-forest-900/12 bg-white px-3.5 py-2 text-sm font-bold text-forest-800 transition-colors hover:border-terracotta/40 hover:bg-terracotta/5 hover:text-terracotta-600"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            ← На сайт
          </Link>
        </div>
      </header>

      <main className="container-wide flex flex-1 flex-col py-4 sm:py-6">
        <h1 className="sr-only">Личный кабинет</h1>
        <div className="flex-1 overflow-hidden rounded-2xl border border-forest-900/[0.07] bg-white p-2 shadow-card ring-1 ring-forest-900/8 sm:rounded-3xl sm:p-4">
          <Fit1cAccountLk />
        </div>
      </main>
    </div>
  );
}
