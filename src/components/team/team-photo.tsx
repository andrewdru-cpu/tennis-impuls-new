"use client";

import Image from "next/image";
import { UserRound } from "@/lib/icons";
import { cn } from "@/lib/utils";

type TeamPhotoProps = {
  photo?: string;
  alt: string;
  ratio?: "portrait" | "video";
  className?: string;
  imageClassName?: string;
  /** Приоритет загрузки для первых карточек above the fold */
  priority?: boolean;
  sizes?: string;
};

const ratioClass = {
  portrait: "aspect-[3/4]",
  video: "aspect-video",
} as const;

const defaultSizes = {
  portrait: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  video: "(max-width: 768px) 100vw, 672px",
} as const;

/** Оптимизированный рендер фото тренера из /public/images/team/ */
export function TeamPhoto({
  photo,
  alt,
  ratio = "portrait",
  className,
  imageClassName,
  priority = false,
  sizes,
}: TeamPhotoProps) {
  if (!photo) {
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
      <Image
        src={photo}
        alt={alt}
        fill
        sizes={sizes ?? defaultSizes[ratio]}
        priority={priority}
        className={cn(
          "object-cover object-[center_15%]",
          imageClassName
        )}
      />
    </div>
  );
}
