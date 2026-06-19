"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ArrowRight,
  ParkingCircle,
  MapPin,
} from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { HeroMedia } from "@/components/hero/hero-media";
import { cn } from "@/lib/utils";

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

      <div className="container-wide relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center rounded-full border border-lime/50 bg-lime/20 px-4 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-lime-100 backdrop-blur-md sm:text-xs">
              ЦТТ «Импульс» · Лосиный Остров
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className={cn(
              "mt-5 font-display text-[2.625rem] font-extrabold leading-[1.05] tracking-tight text-balance",
              "sm:mt-6 sm:text-6xl lg:text-7xl xl:text-[5.25rem] xl:leading-[1.02]",
              "[text-shadow:0_4px_32px_rgba(0,0,0,0.45)]"
            )}
          >
            Теннис, фитнес и отдых —{" "}
            <span className="bg-gradient-to-r from-lime via-lime-200 to-lime bg-clip-text text-transparent">
              в одном месте
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className={cn(
              "mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/95 sm:mt-6 sm:text-xl sm:leading-8",
              "[text-shadow:0_2px_16px_rgba(0,0,0,0.4)]"
            )}
          >
            Всё необходимое для восстановления, спорта и отдыха в зоне Лосиного
            Острова
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
              className="w-full border-white/30 bg-white/15 backdrop-blur-md hover:border-lime/50 hover:bg-white/20 sm:w-auto sm:min-w-[200px]"
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
                    "flex items-center gap-3 rounded-2xl border border-lime/25 bg-white/10 px-4 py-3",
                    "backdrop-blur-md transition-all duration-300 hover:border-lime/50 hover:bg-lime/15 hover:shadow-glow"
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/25 ring-1 ring-lime/40">
                    <h.icon className="h-4 w-4 text-lime" aria-hidden />
                  </span>
                  <span className="pr-1">
                    <span className="block text-sm font-semibold leading-tight text-white">
                      {h.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-lime-100/80">
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
