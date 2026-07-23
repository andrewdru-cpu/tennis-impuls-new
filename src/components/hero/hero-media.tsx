import Image from "next/image";

import { cn } from "@/lib/utils";
import { media as siteMedia, type HeroMedia as HeroMediaType } from "@/lib/media";

/**
 * Оверлеи под new-hero.webp:
 * — левая ~58% (здание «ЦТТ Импульс» + корты) без затемнения;
 * — мягкий градиент справа только под текст (над ангаром).
 */
const OVERLAY_DESKTOP = [
  "linear-gradient(90deg, rgba(10,47,36,0.1) 0%, rgba(10,47,36,0.04) 20%, transparent 58%)",
  "linear-gradient(270deg, transparent 0%, transparent 56%, rgba(10,47,36,0.06) 66%, rgba(10,47,36,0.22) 78%, rgba(5,25,18,0.55) 90%, rgba(5,25,18,0.72) 100%)",
  "linear-gradient(180deg, rgba(10,47,36,0.16) 0%, transparent 10%, transparent 80%, rgba(5,25,18,0.22) 100%)",
  "radial-gradient(ellipse 36% 32% at 96% 82%, rgba(206,88,56,0.1) 0%, transparent 58%)",
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
          "object-cover brightness-[1.14] saturate-[1.2] contrast-[1.05]",
          /* центр кадра; чуть left — текст справа не перекрывает здание */
          "object-[46%_center] md:object-[48%_center] lg:object-center"
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

      {/* Лёгкая виньетка по краям — центр кадра (здание) остаётся ярким */}
      <div
        className="absolute inset-0 hidden bg-[radial-gradient(ellipse_100%_90%_at_34%_42%,transparent_0%,rgba(5,25,18,0.14)_100%)] md:block"
        aria-hidden
      />

      {/* Свечения — только у правого края, под текст */}
      <div
        className="absolute -right-16 top-[12%] hidden h-[380px] w-[280px] rounded-full bg-terracotta/22 blur-[110px] md:block"
        aria-hidden
      />
      <div
        className="absolute bottom-[16%] right-[2%] hidden h-[200px] w-[200px] rounded-full bg-lime/15 blur-[80px] md:block"
        aria-hidden
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-sand/20 via-lime/40 to-terracotta/30"
        aria-hidden
      />

      <div className="absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
    </div>
  );
}
