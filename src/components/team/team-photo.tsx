"use client";

import { useState } from "react";
import { UserRound } from "@/lib/icons";
import { isWebp, jpegSibling } from "@/lib/image-fallback";
import { cn } from "@/lib/utils";

type TeamPhotoProps = {
  photo?: string;
  alt: string;
  ratio?: "portrait" | "video" | "photo" | "wide";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const ratioClass = {
  portrait: "aspect-[3/4]",
  video: "aspect-video",
  photo: "aspect-[4/3]",
  wide: "aspect-[16/10]",
} as const;

/**
 * Прямой /images/team/... без optimizer.
 * WebP + JPEG через <picture>; onError — только после реальной ошибки JPEG.
 */
export function TeamPhoto({
  photo,
  alt,
  ratio = "portrait",
  className,
  imageClassName,
  priority = false,
}: TeamPhotoProps) {
  const [failed, setFailed] = useState(false);
  const jpg = photo ? jpegSibling(photo) : undefined;
  const imgSrc = jpg ?? photo;

  if (!photo || !imgSrc || failed) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-forest-100 via-lime-50/80 to-sand/20",
          ratioClass[ratio],
          className
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <UserRound className="h-12 w-12 text-forest-900/20" aria-hidden />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-forest-100",
        ratioClass[ratio],
        className
      )}
    >
      <picture>
        {isWebp(photo) && jpg ? (
          <source type="image/webp" srcSet={photo} />
        ) : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={alt}
          width={600}
          height={800}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center",
            imageClassName
          )}
          onError={() => setFailed(true)}
        />
      </picture>
    </div>
  );
}
