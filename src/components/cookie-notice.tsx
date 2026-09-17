"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const COOKIE_NOTICE_STORAGE_KEY = "impuls:cookie-ok";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(COOKIE_NOTICE_STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(COOKIE_NOTICE_STORAGE_KEY, "1");
    } catch {
      /* private mode / quota */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookie"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40",
        "px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-0"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-5xl rounded-2xl border border-forest-900/12",
          "bg-cream/95 text-forest-800 shadow-[0_12px_40px_-12px_rgba(10,47,36,0.28)]",
          "backdrop-blur-md ring-1 ring-forest-900/5",
          "px-4 py-3.5 sm:px-5 sm:py-4"
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <p className="min-w-0 text-pretty text-sm leading-relaxed text-forest-800 sm:text-[0.9375rem]">
            Мы используем файлы cookie и Яндекс.Метрику, чтобы сайт работал
            стабильнее и мы понимали, как им пользуются. Продолжая пользоваться
            сайтом, вы соглашаетесь с этим.
          </p>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="primary"
              size="default"
              onClick={accept}
              className="w-full motion-reduce:transition-none sm:w-auto"
            >
              Понятно
            </Button>
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-semibold text-terracotta-600 underline-offset-4 hover:underline"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/oferta"
              className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-semibold text-terracotta-600 underline-offset-4 hover:underline"
            >
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
