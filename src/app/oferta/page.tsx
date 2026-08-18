import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "@/lib/icons";
import { cn } from "@/lib/utils";

const OFERTA_PDF_PATH = "/docs/oferta.pdf";

export const metadata: Metadata = {
  title: "Публичная оферта — ЦТТ Импульс",
  description:
    "Публичная оферта на оказание спортивных и сопутствующих услуг ООО «Импульс», г. Мытищи. Дата: 11.08.2026.",
};

export default function OfertaPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-gradient-to-b from-cream via-lime-50/40 to-cream pt-[calc(5rem+env(safe-area-inset-top,0px))]">
        <Section
          tone="light"
          className="!bg-transparent pb-16 pt-6 sm:pb-24 sm:pt-8"
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
            <Link
              href="/"
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border font-bold",
                "border-forest-900/12 bg-white px-5 py-3 text-[0.9375rem] text-forest-800 shadow-sm",
                "transition-[background-color,border-color,color] duration-300",
                "hover:border-terracotta/40 hover:bg-terracotta/5 hover:text-terracotta-600"
              )}
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              ← На главную
            </Link>
          </div>

          <Badge variant="terracotta">Документы</Badge>

          <h1 className="heading-section mt-4">
            Публичная{" "}
            <span className="text-terracotta-600">оферта</span>
          </h1>

          <p className="mt-4 max-w-[min(42rem,100%)] text-pretty text-body text-bright sm:text-body-lg sm:leading-[1.7]">
            Публичная оферта на оказание спортивных и сопутствующих услуг ООО
            «Импульс», г. Мытищи. Дата документа: 11.08.2026.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
              <a
                href={OFERTA_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
                Скачать PDF
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-11 w-full border-forest-900/12 bg-white/90 sm:w-auto"
            >
              <Link href="/">На главную</Link>
            </Button>
          </div>

          <div className="mt-10 hidden overflow-hidden rounded-2xl border border-forest-900/[0.07] bg-white shadow-card ring-1 ring-forest-900/8 md:block sm:rounded-3xl">
            <iframe
              src={`${OFERTA_PDF_PATH}#view=FitH`}
              title="Публичная оферта ЦТТ Импульс"
              className="block h-[min(80vh,56rem)] w-full border-0 bg-white"
            />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
