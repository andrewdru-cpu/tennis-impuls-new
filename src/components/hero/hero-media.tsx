import Image from "next/image";

import { cn } from "@/lib/utils";
import { media as siteMedia, type HeroMedia as HeroMediaType } from "@/lib/media";

/**
 * Оверлеи под new-hero.jpg:
 * — слева и в центре «окно» для здания «ЦТТ Импульс» и кортов;
 * — справа плотнее — под текстовую колонку (второстепенные постройки).
 */
const OVERLAY_DESKTOP = [
  "linear-gradient(252deg, rgba(10,47,36,0.88) 0%, rgba(10,47,36,0.72) 18%, rgba(10,47,36,0.38) 38%, rgba(10,47,36,0.1) 52%, transparent 58%)",
  "linear-gradient(78deg, transparent 0%, transparent 42%, rgba(10,47,36,0.06) 50%, rgba(10,47,36,0.22) 62%, rgba(10,47,36,0.55) 78%, rgba(5,25,18,0.82) 100%)",
  "radial-gradient(ellipse 48% 62% at 28% 50%, transparent 0%, rgba(10,47,36,0.08) 72%, rgba(10,47,36,0.2) 100%)",
  "linear-gradient(180deg, rgba(10,47,36,0.32) 0%, transparent 14%, transparent 72%, rgba(5,25,18,0.12) 90%, rgba(5,25,18,0.42) 100%)",
  "radial-gradient(ellipse 55% 75% at 92% 48%, rgba(10,47,36,0.45) 0%, transparent 62%)",
  "radial-gradient(ellipse 40% 35% at 88% 88%, rgba(206,88,56,0.16) 0%, transparent 58%)",
].join(", ");

const OVERLAY_MOBILE = [
  "linear-gradient(180deg, rgba(10,47,36,0.22) 0%, transparent 26%, transparent 46%, rgba(10,47,36,0.38) 64%, rgba(5,25,18,0.94) 100%)",
  "linear-gradient(270deg, rgba(10,47,36,0.55) 0%, rgba(10,47,36,0.2) 32%, transparent 58%)",
  "radial-gradient(ellipse 60% 50% at 45% 38%, transparent 0%, rgba(10,47,36,0.1) 68%, rgba(10,47,36,0.28) 100%)",
].join(", ");

function heroImageSrc(media: HeroMediaType): string {
  if (media.kind === "image") return media.src;
  return media.poster;
}

function heroImageAlt(media: HeroMediaType): string {
  if (media.kind === "image") return media.alt;
  return media.mobile?.alt ?? media.alt;
}

export function HeroMedia({
  media = siteMedia.hero,
  className,
}: {
  media?: HeroMediaType;
  className?: string;
}) {
  const src = heroImageSrc(media);
  const alt = heroImageAlt(media);

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden bg-forest-950", className)}>
      {/* object-cover — здание «ЦТТ Импульс» в фокусе; яркая цветокоррекция */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className={cn(
          "object-cover brightness-[1.1] saturate-[1.15] contrast-[1.08]",
          "object-[28%_50%] sm:object-[28%_50%] lg:object-[28%_50%]"
        )}
      />

      <div
        className="absolute inset-0 hidden md:block"
        style={{ background: OVERLAY_DESKTOP }}
        aria-hidden
      />

      <div
        className="absolute inset-0 md:hidden"
        style={{ background: OVERLAY_MOBILE }}
        aria-hidden
      />

      {/* Мягкая виньетка — слабее в центре-слева, где здание */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_28%_50%,transparent_0%,rgba(5,25,18,0.32)_100%)]"
        aria-hidden
      />

      {/* Свечения — справа под текст, слева не затемняем здание */}
      <div
        className="absolute -right-20 top-[14%] hidden h-[420px] w-[360px] rounded-full bg-terracotta/28 blur-[120px] md:block"
        aria-hidden
      />
      <div
        className="absolute bottom-[18%] right-[8%] hidden h-[240px] w-[240px] rounded-full bg-lime/14 blur-[90px] md:block"
        aria-hidden
      />
      <div
        className="absolute left-[4%] top-[20%] h-[200px] w-[200px] rounded-full bg-sand/10 blur-[80px] md:opacity-60"
        aria-hidden
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-sand/20 via-lime/35 to-terracotta/25"
        aria-hidden
      />

      <div className="absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
    </div>
  );
}
