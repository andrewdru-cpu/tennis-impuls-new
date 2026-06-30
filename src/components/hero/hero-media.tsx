import Image from "next/image";

import { cn } from "@/lib/utils";
import { media as siteMedia, type HeroMedia as HeroMediaType } from "@/lib/media";

/** Многослойный оверлей: глубина, контраст, тёплые акценты слева */
const HERO_OVERLAY = [
  "linear-gradient(105deg, rgba(10,47,36,0.92) 0%, rgba(10,47,36,0.74) 28%, rgba(10,47,36,0.38) 58%, rgba(10,47,36,0.12) 100%)",
  "linear-gradient(180deg, rgba(10,47,36,0.6) 0%, transparent 28%, transparent 52%, rgba(5,25,18,0.9) 100%)",
  "radial-gradient(ellipse 90% 70% at 15% 50%, rgba(206,88,56,0.26) 0%, transparent 55%)",
  "radial-gradient(ellipse 55% 45% at 88% 18%, rgba(212,165,116,0.18) 0%, transparent 50%)",
  "radial-gradient(ellipse 50% 40% at 70% 75%, rgba(180,220,66,0.14) 0%, transparent 50%)",
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
    <div className={cn("absolute inset-0 -z-10 overflow-hidden bg-forest-950", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-[1.06] brightness-[0.94] saturate-[1.22] contrast-[1.06]"
      />

      <div
        className="absolute inset-0"
        style={{ background: HERO_OVERLAY }}
        aria-hidden
      />

      {/* Виньетка по краям */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,25,18,0.45)_100%)]"
        aria-hidden
      />

      {/* Световые акценты палитры */}
      <div
        className="absolute -left-24 top-[18%] h-[520px] w-[520px] rounded-full bg-terracotta/35 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-16 top-[8%] h-[440px] w-[440px] rounded-full bg-sand/28 blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute bottom-[20%] left-[40%] h-[320px] w-[320px] rounded-full bg-lime/20 blur-[90px]"
        aria-hidden
      />

      {/* Нижний fade + тонкая линия акцента */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-terracotta/15 via-lime/35 to-sand/25"
        aria-hidden
      />

      {/* Лёгкая сетка для премиальной текстуры */}
      <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
    </div>
  );
}
