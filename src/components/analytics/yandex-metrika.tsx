"use client";

import Script from "next/script";

import {
  YANDEX_METRIKA_ADS_ID,
  YANDEX_METRIKA_ID,
} from "@/lib/yandex-metrika";

/**
 * Яндекс.Метрика — один tag.js, два ym init, два noscript-пикселя.
 * Счётчики: 111489660 (основной) и 46954113 (реклама / legacy).
 */
export function YandexMetrika() {
  const primaryId = YANDEX_METRIKA_ID;
  const adsId = YANDEX_METRIKA_ADS_ID;

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src={`https://mc.yandex.ru/metrika/tag.js?id=${primaryId}`}
        onLoad={() => {
          window.ym?.(primaryId, "init", {
            ssr: true,
            webvisor: true,
            clickmap: true,
            accurateTrackBounce: true,
            trackLinks: true,
          });
          window.ym?.(adsId, "init", {
            webvisor: true,
            clickmap: true,
            referrer: document.referrer,
            url: location.href,
            accurateTrackBounce: true,
            trackLinks: true,
          });
        }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${primaryId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${adsId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
