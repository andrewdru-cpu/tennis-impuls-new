import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Phone } from "@/lib/icons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Онлайн-расписание",
  description:
    "Актуальное расписание занятий ЦТТ «Импульс». Запись через форму на сайте или по телефону.",
};

function BackToSiteLink({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border font-bold transition-[background-color,border-color,color,transform] duration-300",
        compact
          ? "border-forest-900/12 bg-white/80 px-4 py-2.5 text-sm text-forest-800 hover:border-terracotta/40 hover:bg-terracotta/5 hover:text-terracotta-600"
          : "border-forest-900/12 bg-white px-5 py-3 text-[0.9375rem] text-forest-800 shadow-sm hover:border-terracotta/40 hover:bg-terracotta/5 hover:text-terracotta-600",
        className
      )}
    >
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
      {compact ? "На главную" : "← Вернуться на сайт"}
    </Link>
  );
}

export default function SchedulePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-gradient-to-b from-cream via-lime-50/40 to-cream pt-[calc(5rem+env(safe-area-inset-top,0px))]">
        <Section
          tone="light"
          className="!bg-transparent pb-8 pt-6 sm:pb-10 sm:pt-8"
          before={
            <>
              <div
                className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-terracotta/12 blur-[100px]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-lime/20 blur-[90px]"
                aria-hidden
              />
            </>
          }
        >
          {/* Кнопка назад — сразу под навбаром */}
          <div className="mb-6 sm:mb-8">
            <BackToSiteLink />
          </div>

          <Badge variant="terracotta">Расписание</Badge>

          <h1 className="heading-section mt-4">
            Онлайн-
            <span className="text-terracotta-600">расписание</span>
          </h1>

          <p className="mt-4 max-w-[min(42rem,100%)] text-pretty text-body text-bright sm:text-body-lg sm:leading-[1.7]">
            Актуальное расписание занятий ЦТТ «Импульс». Для записи используйте
            форму на сайте или телефон{" "}
            <a
              href={siteConfig.phoneHref}
              className="font-semibold text-terracotta-600 underline-offset-2 hover:underline"
            >
              {siteConfig.phone}
            </a>
            .
          </p>

          <p className="mt-3 max-w-[min(42rem,100%)] text-pretty text-sm leading-relaxed text-[#1F2E2A]/65 sm:text-[0.9375rem]">
            Расписание открыто внутри сайта ЦТТ Импульс. Запись — через кнопку
            «Записаться» или по телефону.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
              <Link href="/#booking">
                <CalendarDays className="h-4 w-4" />
                Записаться
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-11 w-full border-forest-900/12 bg-white/90 sm:w-auto"
            >
              <a href={siteConfig.phoneHref}>
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
            </Button>
            <BackToSiteLink compact className="w-full sm:w-auto" />
          </div>
        </Section>

        <Section tone="muted" className="pb-14 pt-0 sm:pb-20">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#1F2E2A]/60">
              Расписание занятий
            </p>
            <BackToSiteLink compact />
          </div>

          {/*
            Полная очистка шапки/подвала Битрикса внутри iframe возможна только
            на стороне schedule.tennis-impuls.ru (Help-Pro / Битрикс) —
            нужен отдельный «голый» URL расписания без меню старого сайта.
            Здесь: sandbox без allow-top-navigation, чтобы ссылки старого сайта
            не уводили всю вкладку tennis-impuls.ru на bitrix-главную.
          */}
          <div className="overflow-hidden rounded-2xl border border-forest-900/[0.07] bg-white shadow-card ring-1 ring-forest-900/8 sm:rounded-3xl">
            <iframe
              src={siteConfig.scheduleEmbedUrl}
              title="Расписание ЦТТ Импульс"
              className="block w-full min-h-[70vh] border-0 bg-white md:min-h-[85vh]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>

          <div className="mt-5 flex flex-col items-center gap-3 text-center sm:mt-6">
            <p className="text-sm text-[#1F2E2A]/55">
              Не открывается расписание?{" "}
              <a
                href={siteConfig.scheduleEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-terracotta-600 underline-offset-2 hover:underline"
              >
                Открыть в новой вкладке
              </a>
            </p>
            <BackToSiteLink compact />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
