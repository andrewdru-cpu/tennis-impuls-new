import Image from "next/image";

import { cn } from "@/lib/utils";
import { media as siteMedia, type HeroMedia as HeroMediaType } from "@/lib/media";

/** Лёгкий градиент — фото остаётся ярким и «живым», текст читается слева */
const HERO_OVERLAY =
  "linear-gradient(105deg, rgba(8,35,26,0.88) 0%, rgba(8,35,26,0.62) 34%, rgba(8,35,26,0.28) 62%, rgba(15,61,46,0.22) 100%), linear-gradient(180deg, rgba(8,35,26,0.5) 0%, transparent 32%, transparent 55%, rgba(8,35,26,0.82) 100%)";

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
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-[1.02] brightness-[1.06] saturate-[1.18] contrast-[1.04]"
      />

      <div
        className="absolute inset-0"
        style={{ background: HERO_OVERLAY }}
        aria-hidden
      />

      {/* Лаймовое свечение для более сочного, современного вида */}
      <div
        className="absolute -right-20 top-1/4 h-[480px] w-[480px] rounded-full bg-lime/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-lime/10 to-transparent"
        aria-hidden
      />
    </div>
  );
}
