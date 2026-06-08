import Image from "next/image";

import { cn } from "@/lib/utils";
import { media as siteMedia, type HeroMedia as HeroMediaType } from "@/lib/media";

/**
 * Полноэкранный фон Hero. Заполняет родителя (родитель должен быть relative).
 * Переключение фото/видео управляется полем `kind` в media.ts → media.hero.
 *
 * 👉 Никакой вёрстки менять не нужно: задаёшь медиа в media.ts, остальное
 *    подхватится автоматически.
 */

const HERO_OVERLAY =
  "linear-gradient(90deg, rgba(8,35,26,0.88) 0%, rgba(8,35,26,0.55) 45%, rgba(8,35,26,0.25) 100%), linear-gradient(180deg, rgba(8,35,26,0.25) 0%, rgba(8,35,26,0) 30%, rgba(8,35,26,0.7) 100%)";

function HeroImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
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

export function HeroMedia({
  media = siteMedia.hero,
  className,
}: {
  media?: HeroMediaType;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {media.kind === "video" ? (
        <HeroVideo sources={media.sources} poster={media.poster} />
      ) : (
        <HeroImage src={media.src} alt={media.alt} />
      )}
      {/* Затемняющий градиент для читаемости текста поверх медиа */}
      <div
        className="absolute inset-0"
        style={{ background: HERO_OVERLAY }}
        aria-hidden
      />
      {/* Лёгкая сетка для премиального ощущения глубины */}
      <div className="absolute inset-0 bg-grid opacity-[0.15]" aria-hidden />
    </div>
  );
}

export { HeroImage, HeroVideo };
