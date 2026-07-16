import { cn } from "@/lib/utils";
import type { MediaVideoSource } from "@/lib/media";

export interface MediaVideoProps {
  /** Источник из конфига media.ts ИЛИ передай sources/poster напрямую */
  media?: MediaVideoSource;
  sources?: { src: string; type: string }[];
  poster?: string;
  className?: string;
  videoClassName?: string;
  fit?: "cover" | "contain";
  /** Фоновое видео: автозапуск, без звука, в цикле (по умолчанию true) */
  background?: boolean;
  rounded?: boolean;
  overlay?: boolean | string;
}

/**
 * Универсальный компонент видео.
 *
 * 👉 Промо-ролик: /videos/impuls-promo.mp4 (см. media.promo в media.ts).
 *    Постер — статичный кадр из /public/images/...
 */
export function MediaVideo({
  media,
  sources,
  poster,
  className,
  videoClassName,
  fit = "cover",
  background = true,
  rounded = false,
  overlay = false,
}: MediaVideoProps) {
  const finalSources = media?.sources ?? sources ?? [];
  const finalPoster = media?.poster ?? poster;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-forest-950",
        rounded && "rounded-3xl",
        className
      )}
    >
      <video
        className={cn(
          "h-full w-full",
          fit === "cover" ? "object-cover" : "object-contain",
          videoClassName
        )}
        poster={finalPoster}
        autoPlay={background}
        muted={background}
        loop={background}
        playsInline
        controls={!background}
        preload="metadata"
      >
        {finalSources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              typeof overlay === "string"
                ? overlay
                : "linear-gradient(to top, rgba(10,47,36,0.72) 0%, rgba(10,47,36,0.18) 50%, rgba(10,47,36,0.48) 100%)",
          }}
        />
      )}
    </div>
  );
}
