import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Онлайн-расписание",
  description:
    "Актуальное расписание занятий ЦТТ «Импульс». Запись через форму на сайте или по телефону.",
};

export default function SchedulePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-cream pt-[calc(5rem+env(safe-area-inset-top,0px))]">
        <Section
          tone="light"
          className="pb-10 pt-8 sm:pb-12 sm:pt-10"
          before={
            <div
              className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-terracotta/10 blur-[90px]"
              aria-hidden
            />
          }
        >
          <SectionHeading
            eyebrow="Расписание"
            title={
              <>
                Онлайн-
                <span className="text-terracotta-600">расписание</span>
              </>
            }
            description={
              <>
                Актуальное расписание занятий ЦТТ «Импульс». Для записи
                используйте{" "}
                <Link
                  href="/#booking"
                  className="font-semibold text-terracotta-600 underline-offset-2 hover:underline"
                >
                  форму на сайте
                </Link>{" "}
                или телефон{" "}
                <a
                  href={siteConfig.phoneHref}
                  className="font-semibold text-terracotta-600 underline-offset-2 hover:underline"
                >
                  {siteConfig.phone}
                </a>
                .
              </>
            }
          />

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Button asChild size="lg">
              <Link href="/#booking">Записаться</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            </Button>
          </div>
        </Section>

        <Section tone="muted" className="pb-12 pt-0 sm:pb-16">
          <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-forest-900/10 sm:rounded-3xl">
            <iframe
              src={siteConfig.scheduleEmbedUrl}
              title="Расписание ЦТТ Импульс"
              className="block w-full min-h-[70vh] border-0 md:min-h-[85vh]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-center text-sm text-[#1F2E2A]/55">
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
        </Section>
      </main>
      <Footer />
    </>
  );
}
