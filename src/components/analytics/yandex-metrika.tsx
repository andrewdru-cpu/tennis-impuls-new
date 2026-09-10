import {
  YANDEX_METRIKA_ADS_ID,
  YANDEX_METRIKA_ID,
} from "@/lib/yandex-metrika";

/**
 * Официальный loader + ym(46954113) первым (для Директа / View Source),
 * затем 111489660. Без next/script — сырой <script> в <head> layout.
 */
export const YANDEX_METRIKA_HEAD_SCRIPT = `(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');
    ym(${YANDEX_METRIKA_ADS_ID}, 'init', {webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
    ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, accurateTrackBounce:true, trackLinks:true});`;

export function YandexMetrikaNoscript() {
  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ADS_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}
