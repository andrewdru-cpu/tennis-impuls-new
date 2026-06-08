import Image from "next/image";

import { cn } from "@/lib/utils";
import type { MediaImageSource } from "@/lib/media";

type AspectRatio =
  | "square"
  | "video" // 16/9
  | "portrait" // 3/4
  | "photo" // 4/3
  | "wide" // 21/9
  | "auto";

const aspectMap: Record<AspectRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  photo: "aspect-[4/3]",
  wide: "aspect-[21/9]",
  auto: "",
};

export interface MediaImageProps {
  /** Источник из конфига media.ts ИЛИ передай src/alt напрямую */
  media?: MediaImageSource;
  src?: string;
  alt?: string;
  /**
   * Пропорция контейнера. Реальные фото любых размеров впишутся за счёт
   * object-fit. По умолчанию 4/3 ("photo").
   */
  ratio?: AspectRatio;
  /** Как вписывать изображение: cover (по умолчанию) обрежет, contain — впишет целиком */
  fit?: "cover" | "contain";
  /** Точка фокуса при обрезке (object-position) */
  position?: string;
  className?: string;
  imageClassName?: string;
  /** Скругление углов */
  rounded?: boolean;
  /** Затемняющий оверлей сверху (для текста на фото) */
  overlay?: boolean | string;
  /** Грузить с приоритетом (для изображений на первом экране) */
  priority?: boolean;
  /** sizes для адаптивной загрузки (next/image) */
  sizes?: string;
}

/**
 * Универсальный компонент изображения.
 *
 * 👉 Реальное фото меняется ТОЛЬКО через media.ts или через проп `src`.
 *    Здесь же ничего править не нужно — компонент сам подстроится под
 *    любые пропорции исходника благодаря `ratio` + `fit`.
 */
export function MediaImage({
  media,
  src,
  alt,
  ratio = "photo",
  fit = "cover",
  position = "center",
  className,
  imageClassName,
  rounded = true,
  overlay = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
}: MediaImageProps) {
  const finalSrc = media?.src ?? src;
  const finalAlt = media?.alt ?? alt ?? "";

  if (!finalSrc) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-forest-100",
        aspectMap[ratio],
        rounded && "rounded-3xl",
        className
      )}
    >
      <Image
        src={finalSrc}
        alt={finalAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "h-full w-full transition-transform duration-700",
          fit === "cover" ? "object-cover" : "object-contain",
          imageClassName
        )}
        style={{ objectPosition: position }}
      />
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              typeof overlay === "string"
                ? overlay
                : "linear-gradient(to top, rgba(8,35,26,0.65) 0%, rgba(8,35,26,0.05) 55%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
}
