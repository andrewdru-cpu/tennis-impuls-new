"use client";

import { useEffect, useRef } from "react";
import { X } from "@/lib/icons";
import { AnimatePresence, motion } from "framer-motion";

import { MediaImage } from "@/components/media/media-image";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/lib/news";
import { cn } from "@/lib/utils";

type NewsModalProps = {
  article: NewsArticle | null;
  onClose: () => void;
};

export function NewsModal({ article, onClose }: NewsModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [article, onClose]);

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm"
            aria-label="Закрыть новость"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            className={cn(
              "relative z-10 flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden",
              "rounded-t-3xl border border-white/10 bg-white shadow-card sm:rounded-3xl"
            )}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shrink-0">
              <MediaImage
                media={article.image}
                ratio="video"
                rounded={false}
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-11 min-h-11 w-11 items-center justify-center rounded-full bg-forest-900/80 text-white backdrop-blur-sm transition-colors hover:bg-forest-900"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
              <time
                dateTime={article.dateISO}
                className="text-xs font-semibold uppercase tracking-wider text-lime-600"
              >
                {article.date}
              </time>
              <h3
                id="news-modal-title"
                className="mt-3 font-display text-2xl font-bold leading-tight text-forest-800 sm:text-3xl"
              >
                {article.title}
              </h3>
              <div className="mt-5 space-y-4">
                {article.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base sm:leading-7"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#booking" onClick={onClose}>
                    Записаться на занятие
                  </a>
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={onClose}>
                  Закрыть
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
