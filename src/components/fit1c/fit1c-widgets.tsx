"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import { FIT1C_SALON_ID, FIT1C_SCRIPT_SRC } from "@/lib/fit1c";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type WidgetKind = "calendar" | "account";

type WidgetStatus = "loading" | "ready" | "failed";

/** Сколько ждём отрисовку виджета после загрузки страницы, прежде чем показать подсказку. */
const WIDGET_RENDER_TIMEOUT_MS = 15_000;

const WIDGET_UNAVAILABLE_TITLE: Record<WidgetKind, string> = {
  calendar: "Расписание временно недоступно",
  account: "Личный кабинет временно недоступен",
};

function WidgetUnavailable({
  kind,
  reason = "Сервис 1С:Фитнес не ответил.",
}: {
  kind: WidgetKind;
  reason?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-xl px-4 py-10 text-center sm:py-14"
    >
      <p className="font-display text-lg font-bold text-forest-800 sm:text-xl">
        {WIDGET_UNAVAILABLE_TITLE[kind]}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[#1F2E2A]/70 sm:text-base">
        {reason} Позвоните нам{" "}
        <a
          href={siteConfig.phoneHref}
          className="font-semibold text-terracotta-600 underline-offset-2 hover:underline"
        >
          {siteConfig.phone}
        </a>{" "}
        или{" "}
        <Link
          href="/#booking"
          className="font-semibold text-terracotta-600 underline-offset-2 hover:underline"
        >
          оставьте заявку на сайте
        </Link>{" "}
        — мы запишем вас вручную.
      </p>
    </div>
  );
}

/**
 * Официальный config.js Reservi / 1С:Фитнес + контейнер виджета.
 * Если скрипт не загрузился (reservi.ru недоступен, блокировка сети) или
 * ничего не отрисовал за WIDGET_RENDER_TIMEOUT_MS — показываем текст с телефоном,
 * а не пустой белый блок. Контейнер остаётся в DOM: виджет может дорисоваться позже.
 */
function Fit1cWidget({
  kind,
  className,
}: {
  kind: WidgetKind;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<WidgetStatus>("loading");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const hasContent = () => el.childElementCount > 0 || !el.isConnected;
    if (hasContent()) {
      setStatus("ready");
      return;
    }

    const observer = new MutationObserver(() => {
      if (hasContent()) {
        setStatus("ready");
        observer.disconnect();
      }
    });
    observer.observe(el, { childList: true });

    const timer = window.setTimeout(() => {
      if (!hasContent()) {
        setStatus((prev) => (prev === "ready" ? prev : "failed"));
      }
    }, WIDGET_RENDER_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const containerProps =
    kind === "calendar"
      ? { "data-fit1c-calendar": "" }
      : { "data-get-fit-index-lk": "" };

  return (
    <>
      <div
        ref={containerRef}
        {...containerProps}
        className={cn(
          "w-full",
          status === "failed"
            ? "min-h-0"
            : kind === "calendar"
              ? "min-h-[70vh] md:min-h-[80vh]"
              : "min-h-[70vh] flex-1",
          className
        )}
      />
      {status === "failed" && <WidgetUnavailable kind={kind} />}
      <noscript>
        <WidgetUnavailable
          kind={kind}
          reason="Для онлайн-виджета нужен включённый JavaScript."
        />
      </noscript>
      <Script
        src={FIT1C_SCRIPT_SRC}
        strategy="afterInteractive"
        data-fit-salon-id={FIT1C_SALON_ID}
        onError={() => setStatus("failed")}
      />
    </>
  );
}

export function Fit1cCalendar({ className }: { className?: string }) {
  return <Fit1cWidget kind="calendar" className={className} />;
}

export function Fit1cAccountLk({ className }: { className?: string }) {
  return <Fit1cWidget kind="account" className={className} />;
}
