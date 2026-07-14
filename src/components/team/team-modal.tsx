"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@/lib/icons";

import { TeamPhoto } from "@/components/team/team-photo";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

type TeamModalProps = {
  member: TeamMember | null;
  onClose: () => void;
};

export function TeamModal({ member, onClose }: TeamModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!member) return;

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
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm"
            aria-label="Закрыть"
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
              <TeamPhoto
                photo={member.photo}
                alt={member.name}
                ratio="video"
                imageClassName="object-[center_15%]"
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
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">
                {member.category}
              </p>
              <h3
                id="team-modal-title"
                className="mt-3 font-display text-2xl font-bold leading-tight text-forest-900 sm:text-3xl"
              >
                {member.name}
              </h3>
              <div className="mt-5 space-y-4">
                {member.bio.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base sm:leading-7"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#booking" onClick={onClose}>
                    Записаться к специалисту
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
