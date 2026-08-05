"use client";

import { useState } from "react";
import { UserRound } from "@/lib/icons";
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

/** Прямой /images/team/... без optimizer; onError — нейтральный фон. */
export function TeamPhoto({
  photo,
  alt,
  ratio = "portrait",
  className,
  imageClassName,
  priority = false,
}: TeamPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
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
    </div>
  );
}
