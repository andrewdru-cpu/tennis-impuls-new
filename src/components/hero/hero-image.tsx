"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Оптимизированный слой поверх CSS-background.
 * При ошибке загрузки прячет себя — остаётся forest + CSS url / solid.
 */
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      quality={85}
      sizes="100vw"
      onError={() => setFailed(true)}
      className={cn(
        "z-0 object-cover brightness-[1.14] saturate-[1.2] contrast-[1.05]",
        "object-[46%_center] md:object-[48%_center] lg:object-center"
      )}
    />
  );
}
