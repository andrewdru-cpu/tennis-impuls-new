import type { Metadata } from "next";
import Link from "next/link";

import { Fit1cCalendar } from "@/components/fit1c/fit1c-widgets";
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
    "Актуальное расписание занятий ЦТТ «Импульс» из 1С:Фитнес. Запись через форму на сайте или по телефону.",
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
      {compact ? "На главную" : "← На главную"}
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
          <div className="mb-6 sm:mb-8">
            <BackToSiteLink />
          </div>

          <Badge variant="terracotta">Расписание</Badge>

          <h1 className="heading-section mt-4">
            Онлайн-
            <span className="text-terracotta-600">расписание</span>
          </h1>

          <p className="mt-4 max-w-[min(42rem,100%)] text-pretty text-body text-bright sm:text-body-lg sm:leading-[1.7]">
            Расписание загружается из системы 1С:Фитнес клуба. Запись — через
            форму на сайте или по телефону{" "}
            <a
              href={siteConfig.phoneHref}
              className="font-semibold text-terracotta-600 underline-offset-2 hover:underline"
            >
              {siteConfig.phone}
            </a>
            .
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
              Расписание занятий (1С)
            </p>
            <BackToSiteLink compact />
          </div>

          <div className="overflow-hidden rounded-2xl border border-forest-900/[0.07] bg-white p-2 shadow-card ring-1 ring-forest-900/8 sm:rounded-3xl sm:p-4">
            <Fit1cCalendar />
          </div>

          <div className="mt-5 flex flex-col items-center gap-3 text-center sm:mt-6">
            <BackToSiteLink compact />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
