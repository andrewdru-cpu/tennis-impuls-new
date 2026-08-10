"use client";

import Script from "next/script";

import { FIT1C_SALON_ID, FIT1C_SCRIPT_SRC } from "@/lib/fit1c";
import { cn } from "@/lib/utils";

type Fit1cScriptProps = {
  className?: string;
};

/** Официальный config.js Reservi / 1С:Фитнес */
export function Fit1cScript({ className }: Fit1cScriptProps) {
  return (
    <Script
      src={FIT1C_SCRIPT_SRC}
      strategy="afterInteractive"
      data-fit-salon-id={FIT1C_SALON_ID}
      className={className}
    />
  );
}

export function Fit1cCalendar({ className }: { className?: string }) {
  return (
    <>
      <div
        data-fit1c-calendar
        className={cn("min-h-[70vh] w-full md:min-h-[80vh]", className)}
      />
      <Fit1cScript />
    </>
  );
}

export function Fit1cAccountLk({ className }: { className?: string }) {
  return (
    <>
      <div
        data-get-fit-index-lk
        className={cn("min-h-[70vh] w-full flex-1", className)}
      />
      <Fit1cScript />
    </>
  );
}
