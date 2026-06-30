"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ArrowRight,
  ParkingCircle,
  MapPin,
  ChevronDown,
} from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { HeroMedia } from "@/components/hero/hero-media";
import { cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer, transitionMenu } from "@/lib/motion";

const highlights = [
  {
    icon: MapPin,
    label: "В 3 минутах от Москвы",
    detail: "зона Лосиного Острова",
  },
  {
    icon: ParkingCircle,
    label: "Бесплатная парковка",
    detail: "для всех гостей",
  },
];

const container = staggerContainer;
const item = fadeUpItem;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-[max(3rem,env(safe-area-inset-bottom,0px))] pt-[calc(5rem+env(safe-area-inset-top,0px))] text-white sm:justify-center sm:pb-20 sm:pt-24 lg:pb-24"
    >
      <HeroMedia />

      <div className="container-wide relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-[44rem]"
        >
          {/* Eyebrow */}
          <motion.div variants={item}>
            <span
              className={cn(
                "inline-flex items-center gap-2.5 rounded-full px-4 py-2 sm:px-5 sm:py-2.5",
                "border border-terracotta/25 bg-white/[0.1] backdrop-blur-xl",
                "shadow-[0_8px_32px_-8px_rgba(206,88,56,0.35)]",
                "text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-sand-100 sm:text-xs"
              )}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta shadow-[0_0_14px_rgba(206,88,56,0.95)]"
                aria-hidden
              />
              ЦТТ «Импульс»
              <span className="text-white/30" aria-hidden>
                ·
              </span>
              Лосиный Остров
            </span>
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            variants={item}
            className={cn(
              "heading-display mt-6 sm:mt-7",
              "[text-shadow:0_2px_40px_rgba(0,0,0,0.5)]"
            )}
          >
            <span className="block text-white">Теннис, фитнес</span>
            <span className="mt-1 block sm:mt-2">
              <span className="text-white/95">и отдых — </span>
              <span className="bg-gradient-to-r from-lime-300 via-sand-200 to-terracotta bg-clip-text text-transparent">
                в одном месте
              </span>
            </span>
          </motion.h1>

          {/* Девиз */}
          <motion.p
            variants={item}
            className={cn(
              "text-lead-light mt-6 sm:mt-7",
              "[text-shadow:0_2px_20px_rgba(0,0,0,0.35)]"
            )}
          >
            Всё необходимое для{" "}
            <span className="font-semibold text-white">восстановления, спорта и отдыха</span>{" "}
            — в экологически чистой зоне у Лосиного Острова, без лишних поездок по
            городу.
          </motion.p>

          {/* Акцентная линия */}
          <motion.div
            variants={item}
            className="mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-terracotta via-lime/80 to-sand/60 sm:mt-8 sm:w-24"
            aria-hidden
          />

          {/* CTA */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              variant="primary"
              className={cn(
                "h-[3.25rem] w-full px-8 text-base font-bold sm:w-auto sm:min-w-[240px]",
                "shadow-terracotta ring-1 ring-white/20",
                "hover:ring-sand/40"
              )}
            >
              <a href="#booking">
                <CalendarCheck className="h-5 w-5" />
                Забронировать корт
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="glass"
              className={cn(
                "h-[3.25rem] w-full px-8 text-base font-semibold sm:w-auto sm:min-w-[210px]",
                "border border-white/25 bg-white/10 backdrop-blur-xl",
                "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)]",
                "hover:border-sand/50 hover:bg-white/18 hover:shadow-glow"
              )}
            >
              <a href="#services">
                Услуги и цены
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          {/* Бейджи локации */}
          <motion.ul
            variants={item}
            className="-mx-1 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 scrollbar-none sm:mx-0 sm:mt-14 sm:flex-wrap sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {highlights.map((h) => (
              <li key={h.label} className="w-[min(100%,18rem)] shrink-0 snap-start sm:w-auto sm:shrink">
                <div
                  className={cn(
                    "interactive-lift group relative flex items-center gap-3.5 overflow-hidden rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4",
                    "border border-white/15 bg-white/[0.07] backdrop-blur-xl",
                    "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)]",
                    "hover:border-lime/30 hover:bg-white/14 hover:shadow-glow-warm"
                  )}
                >
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-terracotta via-lime/70 to-sand/50 opacity-90"
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "interactive-scale relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                      "bg-gradient-to-br from-terracotta/40 via-sand/25 to-lime/20",
                      "ring-1 ring-lime/25"
                    )}
                  >
                    <h.icon className="h-[1.125rem] w-[1.125rem] text-lime-100" aria-hidden />
                  </span>
                  <span className="relative pr-1">
                    <span className="block text-sm font-bold leading-tight tracking-tight text-white sm:text-[0.9375rem]">
                      {h.label}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-sand-200/75">
                      {h.detail}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about-preview"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, ...transitionMenu }}
        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/45 transition-colors duration-500 ease-premium hover:text-sand sm:bottom-6 sm:gap-1.5 sm:text-white/50"
        aria-label="Прокрутить вниз"
      >
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] sm:inline">
          Узнать больше
        </span>
        <ChevronDown className="h-5 w-5 animate-float-y" />
      </motion.a>
    </section>
  );
}
