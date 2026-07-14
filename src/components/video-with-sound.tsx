"use client";

import { useCallback, useRef, useState } from "react";
import { Volume2, VolumeX } from "@/lib/icons";

import { cn } from "@/lib/utils";

export interface VideoWithSoundProps {
  /** Путь к видео от /public, например /videos/impuls-promo.mp4 */
  src: string;
  /** Постер до загрузки видео */
  poster?: string;
  className?: string;
  videoClassName?: string;
  /** Текст кнопки при выключенном звуке */
  unmuteLabel?: string;
  /** Текст кнопки при включённом звуке */
  muteLabel?: string;
  loop?: boolean;
}

export function VideoWithSound({
  src,
  poster,
  className,
  videoClassName,
  unmuteLabel = "Включить звук",
  muteLabel = "Выключить звук",
  loop = true,
}: VideoWithSoundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted) {
      void video.play().catch(() => {
        video.muted = true;
        setMuted(true);
      });
    }
  }, []);

  return (
    <div className={cn("group relative overflow-hidden bg-forest-950", className)}>
      <video
        ref={videoRef}
        className={cn(
          "h-full w-full object-cover",
          videoClassName
        )}
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        loop={loop}
        preload="metadata"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/35 via-transparent to-forest-950/10"
        aria-hidden
      />

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? unmuteLabel : muteLabel}
        className={cn(
          "absolute bottom-4 right-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full",
          "border border-white/25 bg-forest-950/55 px-4 py-2.5 text-sm font-semibold text-white",
          "shadow-[0_8px_28px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md",
          "transition-[transform,background-color,border-color,box-shadow] duration-400 ease-premium",
          "hover:border-lime/40 hover:bg-forest-950/75 hover:shadow-glow",
          "active:scale-[0.98] sm:bottom-5 sm:right-5"
        )}
      >
        {muted ? (
          <VolumeX className="h-4 w-4 shrink-0 text-lime" aria-hidden />
        ) : (
          <Volume2 className="h-4 w-4 shrink-0 text-lime" aria-hidden />
        )}
        <span className="hidden sm:inline">{muted ? unmuteLabel : muteLabel}</span>
      </button>
    </div>
  );
}
