"use client";

import Script from "next/script";

import { YANDEX_METRIKA_ID } from "@/lib/yandex-metrika";

/**
 * Яндекс.Метрика — один Script + noscript-пиксель, без дублей.
 */
export function YandexMetrika() {
  const id = YANDEX_METRIKA_ID;

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src={`https://mc.yandex.ru/metrika/tag.js?id=${id}`}
        onLoad={() => {
          window.ym?.(id, "init", {
            ssr: true,
            webvisor: true,
            clickmap: true,
            accurateTrackBounce: true,
            trackLinks: true,
          });
        }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
