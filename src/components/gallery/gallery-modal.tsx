"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "@/lib/icons";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import type { GalleryItem } from "@/lib/gallery";
import { cn } from "@/lib/utils";

type GalleryModalProps = {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
};

export function GalleryModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: GalleryModalProps) {
  useEffect(() => {
    if (!item) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
        >
          <button
            type="button"
            className="absolute inset-0 bg-forest-950/85 backdrop-blur-md"
            aria-label="Закрыть галерею"
            onClick={onClose}
          />

          {hasPrev && onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-lime hover:text-forest-900 sm:left-4"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {hasNext && onNext && (
            <button
              type="button"
              onClick={onNext}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-lime hover:text-forest-900 sm:right-4"
              aria-label="Следующее фото"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          <motion.figure
            className={cn(
              "relative z-10 flex max-h-[90svh] w-full max-w-4xl flex-col overflow-hidden",
              "rounded-3xl border border-white/10 bg-forest-950 shadow-card"
            )}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full bg-forest-900 sm:aspect-video">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <div>
                <p className="font-display text-base font-semibold text-white sm:text-lg">
                  {item.caption}
                </p>
                <p className="mt-0.5 text-sm text-white/60">{item.alt}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-lime hover:text-forest-900"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
