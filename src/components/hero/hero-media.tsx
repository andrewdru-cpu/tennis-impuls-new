"use client";

import Image from "next/image";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { media as siteMedia, type HeroMedia as HeroMediaType } from "@/lib/media";

/**
 * Полноэкранный фон Hero.
 * Десктоп (≥768px): видео с poster.
 * Мобильные (<768px): только статичное изображение — видео не загружается.
 */

const HERO_OVERLAY =
  "linear-gradient(105deg, rgba(8,35,26,0.94) 0%, rgba(8,35,26,0.82) 32%, rgba(8,35,26,0.52) 58%, rgba(8,35,26,0.38) 100%), linear-gradient(180deg, rgba(8,35,26,0.55) 0%, rgba(8,35,26,0.12) 28%, rgba(8,35,26,0.08) 50%, rgba(8,35,26,0.88) 100%), radial-gradient(ellipse 80% 60% at 20% 50%, rgba(8,35,26,0.5) 0%, transparent 70%)";

const DESKTOP_QUERY = "(min-width: 768px)";

function HeroImage({
  src,
  alt,
  fallback,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  fallback?: string;
  priority?: boolean;
  className?: string;
}) {
  if (fallback) {
    return (
      <picture className={cn("absolute inset-0", className)}>
        <source srcSet={src} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallback}
          alt={alt}
          className="h-full w-full object-cover object-center"
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="100vw"
      className={cn("object-cover object-center", className)}
    />
  );
}

function HeroVideo({
  sources,
  poster,
  className,
}: {
  sources: { src: string; type: string }[];
  poster: string;
  className?: string;
}) {
  return (
    <video
      className={cn("h-full w-full object-cover object-center", className)}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}

function HeroOverlays() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: HERO_OVERLAY }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-grid opacity-[0.12]" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(8,35,26,0.45) 100%)",
        }}
        aria-hidden
      />
    </>
  );
}

export function HeroMedia({
  media = siteMedia.hero,
  className,
}: {
  media?: HeroMediaType;
  className?: string;
}) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  const showVideo = isDesktop === true && media.kind === "video";
  const showMobileImage =
    isDesktop !== true &&
    (media.kind === "image" ||
      (media.kind === "video" && media.mobile !== undefined));
  const showDesktopImage = isDesktop === true && media.kind === "image";

  const mobileSrc =
    media.kind === "video" ? media.mobile.src : media.src;
  const mobileAlt =
    media.kind === "video" ? media.mobile.alt : media.alt;
  const mobileFallback =
    media.kind === "video" ? media.mobileFallback : undefined;

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {/* Мобильный / SSR: только изображение */}
      {showMobileImage && (
        <div className="absolute inset-0">
          <HeroImage
            src={mobileSrc}
            alt={mobileAlt}
            fallback={mobileFallback}
            priority
          />
        </div>
      )}

      {showVideo && (
        <div className="absolute inset-0">
          <HeroVideo sources={media.sources} poster={media.poster} />
        </div>
      )}

      {/* Десктоп: статичный режим */}
      {showDesktopImage && (
        <HeroImage src={media.src} alt={media.alt} priority />
      )}

      <HeroOverlays />
    </div>
  );
}

export { HeroImage, HeroVideo };
