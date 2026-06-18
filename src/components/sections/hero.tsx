"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ArrowRight,
  ParkingCircle,
  Snowflake,
  MapPin,
} from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { HeroMedia } from "@/components/hero/hero-media";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: ParkingCircle,
    label: "Бесплатная парковка",
    detail: "для всех гостей",
  },
  {
    icon: Snowflake,
    label: "Круглый год",
    detail: "крытые корты и фитнес",
  },
  {
    icon: MapPin,
    label: "20 минут от Москвы",
    detail: "у Лосиного Острова",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-28 text-white sm:justify-center sm:pb-16 sm:pt-24 lg:pb-20"
    >
      <HeroMedia />

      {/* Дополнительное свечение за текстом для глубины */}
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-lime/10 blur-[100px]"
        aria-hidden
      />

      <div className="container-wide relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center rounded-full border border-lime/30 bg-forest-950/50 px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-lime backdrop-blur-md sm:text-xs">
              Многофункциональный спортивный комплекс
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className={cn(
              "mt-5 font-display text-[2.625rem] font-extrabold leading-[1.05] tracking-tight text-balance",
              "sm:mt-6 sm:text-6xl lg:text-7xl xl:text-[5.25rem] xl:leading-[1.02]",
              "[text-shadow:0_4px_32px_rgba(0,0,0,0.55)]"
            )}
          >
            Теннис, фитнес и отдых —{" "}
            <span className="text-lime">в одном месте</span>
          </motion.h1>

          <motion.p
            variants={item}
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-xl sm:leading-8",
              "[text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
            )}
          >
            Корты Hard и грунт, падел, тренажёрный зал и зона отдыха на
            территории более 1 га.{" "}
            <strong className="font-semibold text-white">
              Забронируйте онлайн за пару кликов
            </strong>{" "}
            — мы позаботимся об остальном.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              variant="primary"
              className="w-full shadow-glow sm:w-auto sm:min-w-[220px]"
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
              className="w-full border-white/25 bg-white/10 backdrop-blur-md hover:border-lime/40 hover:bg-white/15 sm:w-auto sm:min-w-[200px]"
            >
              <a href="#services">
                Услуги и цены
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.ul
            variants={item}
            className="-mx-1 mt-10 flex gap-3 overflow-x-auto px-1 pb-1 scrollbar-none sm:mx-0 sm:mt-12 sm:flex-wrap sm:gap-4 sm:overflow-visible sm:px-0"
          >
            {highlights.map((h) => (
              <li key={h.label} className="shrink-0 sm:shrink">
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border border-white/10 bg-forest-950/45 px-4 py-3",
                    "backdrop-blur-md transition-colors duration-300 hover:border-lime/30 hover:bg-forest-950/60"
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/15 ring-1 ring-lime/25">
                    <h.icon className="h-4 w-4 text-lime" aria-hidden />
                  </span>
                  <span className="pr-1">
                    <span className="block text-sm font-semibold leading-tight text-white">
                      {h.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/60">
                      {h.detail}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
