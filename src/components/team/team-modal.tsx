"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { UserRound, X } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { openBookingWithSpecialist } from "@/lib/booking-deeplink";
import type { TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

type TeamModalProps = {
  member: TeamMember | null;
  onClose: () => void;
};

export function TeamModal({ member, onClose }: TeamModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!member) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-5 lg:p-8"
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
              "relative z-10 flex w-full max-w-4xl flex-col overflow-hidden",
              "max-h-[94svh] rounded-t-[1.75rem] bg-white shadow-elevated",
              "border border-forest-900/8 sm:max-h-[90vh] sm:rounded-[1.75rem]",
              "lg:grid lg:max-h-[min(860px,88vh)] lg:grid-cols-[minmax(300px,0.92fr)_1.08fr]"
            )}
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Фото — полное, по центру; на desktop слева */}
            <div
              className={cn(
                "relative shrink-0 overflow-hidden",
                "aspect-[4/3] bg-gradient-to-br from-forest-100 via-cream to-lime-50/60",
                "rounded-t-[1.75rem] sm:rounded-t-[1.75rem]",
                "lg:aspect-auto lg:h-full lg:min-h-[420px] lg:rounded-none lg:rounded-l-[1.75rem]"
              )}
            >
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <UserRound
                    className="h-16 w-16 text-forest-900/20"
                    aria-hidden
                  />
                </div>
              )}

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest-950/25 to-transparent lg:hidden"
                aria-hidden
              />

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className={cn(
                  "absolute right-3 top-3 flex h-11 min-h-11 w-11 items-center justify-center rounded-full",
                  "bg-white/92 text-forest-800 shadow-soft ring-1 ring-forest-900/10 backdrop-blur-md",
                  "transition-[background-color,transform] duration-300 hover:bg-white hover:scale-105",
                  "lg:right-4 lg:top-4"
                )}
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Текст — снизу на mobile, справа на desktop */}
            <div
              className={cn(
                "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain",
                "px-5 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-6",
                "sm:px-8 sm:pb-8 sm:pt-8",
                "lg:px-9 lg:py-9"
              )}
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">
                {member.category}
              </p>
              <h3
                id="team-modal-title"
                className="mt-2.5 font-display text-[1.625rem] font-bold leading-tight text-forest-800 sm:text-3xl"
              >
                {member.name}
              </h3>

              <div className="mt-5 space-y-4 sm:mt-6">
                {member.bio.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-pretty text-[0.9375rem] leading-[1.7] text-[#1F2E2A]/78 sm:text-base sm:leading-[1.75]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:pt-10">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    openBookingWithSpecialist(member.id);
                    onClose();
                  }}
                >
                  Записаться к специалисту
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={onClose}
                >
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
