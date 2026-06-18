"use client";

import { useState } from "react";
import { ArrowUpRight, UserRound } from "@/lib/icons";
import { AnimatePresence, motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  coaches,
  filterCoaches,
  teamFilters,
  type Coach,
  type TeamFilter,
} from "@/lib/team";
import { cn } from "@/lib/utils";

function CoachCard({ coach, index }: { coach: Coach; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <Card
        className={cn(
          "group flex h-full flex-col overflow-hidden border-forest-900/10 shadow-card",
          "transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 hover:shadow-soft"
        )}
      >
        <div className="relative overflow-hidden">
          {coach.image && !coach.placeholder ? (
            <MediaImage
              media={coach.image}
              ratio="portrait"
              rounded={false}
              position="top"
              imageClassName="group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-forest-700">
              <div className="absolute inset-0 bg-grid opacity-15" aria-hidden />
              <div
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-lime/25 blur-2xl"
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-lime backdrop-blur-sm">
                  <UserRound className="h-8 w-8" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  Скоро на сайте
                </span>
              </div>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-lime/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-forest-900 sm:text-xs">
            {coach.badge}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-card-title">{coach.name}</h3>
          <p className="mt-1 text-sm font-medium text-forest-700">{coach.role}</p>
          <p className="mt-3 flex-1 text-card-body sm:text-base sm:leading-7">
            {coach.description}
          </p>
          <a
            href="#booking"
            className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-forest-900 transition-colors group-hover:text-lime-600"
          >
            Записаться
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </Card>
    </Reveal>
  );
}

export function Team() {
  const [filter, setFilter] = useState<TeamFilter>("all");
  const visible = filterCoaches(filter);

  return (
    <Section id="team">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Наша команда"
            title="Тренеры, которые приводят к результату"
            description="Реальные специалисты клуба — теннис, фитнес, каратэ и восстановление. Подберём тренера под вашу цель и уровень."
          />
          <Reveal delay={0.1}>
            <Button asChild variant="outline" className="shrink-0">
              <a href="#booking">
                Записаться к тренеру
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-8 sm:mt-10">
          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none"
            role="tablist"
            aria-label="Фильтр тренеров"
          >
            {teamFilters.map((item) => {
              const count =
                item.id === "all"
                  ? coaches.length
                  : coaches.filter((c) =>
                      c.categories.includes(item.id as Exclude<TeamFilter, "all">)
                    ).length;
              const active = filter === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                    "min-h-[44px] active:scale-[0.98]",
                    active
                      ? "border-forest-900 bg-forest-900 text-white shadow-soft"
                      : "border-forest-900/15 bg-white text-forest-800 hover:border-forest-900/30 hover:bg-forest-900/5"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "ml-1.5 tabular-nums",
                      active ? "text-lime" : "text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          layout
          className="section-inner grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((coach, i) => (
              <motion.div
                key={coach.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <CoachCard coach={coach} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            В этой категории пока нет тренеров.
          </p>
        )}
    </Section>
  );
}
