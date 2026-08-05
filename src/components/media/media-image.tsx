"use client";

import { cn } from "@/lib/utils";
import { PictureImage } from "@/components/media/picture-image";
import type { MediaImageSource } from "@/lib/media";

type AspectRatio =
  | "square"
  | "video"
  | "portrait"
  | "photo"
  | "wide"
  | "auto";

const aspectMap: Record<AspectRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  photo: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  auto: "",
};

export interface MediaImageProps {
  media?: MediaImageSource;
  src?: string;
  alt?: string;
  ratio?: AspectRatio;
  fit?: "cover" | "contain";
  position?: string;
  className?: string;
  imageClassName?: string;
  rounded?: boolean;
  overlay?: boolean | string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Прямой /images/... без /_next/image optimizer (корп. прокси → 400).
 * PictureImage: webp → jpg → нейтральный фон, размер карточки сохраняется.
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
}: MediaImageProps) {
  const initialSrc = media?.src ?? src ?? "";
  const finalAlt = media?.alt ?? alt ?? "";

  if (!initialSrc) {
    return null;
  }

  const imageClass = cn(
    "absolute inset-0 h-full w-full",
    fit === "cover" ? "object-cover" : "object-contain",
    imageClassName
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-forest-100",
        aspectMap[ratio],
        rounded && "rounded-3xl",
        className
      )}
    >
      <PictureImage
        src={initialSrc}
        alt={finalAlt}
        width={1200}
        height={900}
        eager={priority}
        className={imageClass}
        style={{ objectPosition: position }}
        fallback={
          <div
            className="absolute inset-0 bg-gradient-to-br from-forest-100 via-cream to-lime-50/80"
            aria-hidden
          />
        }
      />
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              typeof overlay === "string"
                ? overlay
                : "linear-gradient(to top, rgba(10,47,36,0.68) 0%, rgba(10,47,36,0.06) 55%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
}
