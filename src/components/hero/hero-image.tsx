"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Hero-фото без /_next/image optimizer — прямой /images/... путь.
 * onError: слой скрывается, остаётся CSS-background / solid #0A2F24.
 */
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={1920}
      height={1096}
      fetchPriority="high"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        "absolute inset-0 z-0 h-full w-full object-cover",
        "brightness-[1.14] saturate-[1.2] contrast-[1.05]",
        "object-[46%_center] md:object-[48%_center] lg:object-center"
      )}
    />
  );
}
