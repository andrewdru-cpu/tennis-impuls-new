"use client";

import { motion } from "framer-motion";
import { CalendarCheck, ArrowRight, ParkingCircle, Snowflake, Trees } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroMedia } from "@/components/hero/hero-media";

const highlights = [
  { icon: ParkingCircle, label: "Бесплатная парковка" },
  { icon: Snowflake, label: "Крытые корты круглый год" },
  { icon: Trees, label: "20 минут от Москвы" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 text-white"
    >
      {/* Фон Hero (видео комплекса — управляется в media.ts) */}
      <HeroMedia />

      <div className="container-wide">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1
            variants={item}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-8xl"
          >
            Теннис. Комфорт.{" "}
            <span className="text-lime">Результат.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            Премиальный теннисный центр у Лосиного Острова. Корты мирового
            уровня и профессиональные тренеры.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" variant="primary">
              <a href="#booking">
                <CalendarCheck className="h-5 w-5" />
                Забронировать корт
              </a>
            </Button>
            <Button asChild size="lg" variant="glass">
              <a href="#services">
                Услуги и цены
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-12 flex flex-wrap gap-x-7 gap-y-3"
          >
            {highlights.map((h) => (
              <li
                key={h.label}
                className="flex items-center gap-2.5 text-sm font-medium text-white/90"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime/15 ring-1 ring-lime/30">
                  <h.icon className="h-4 w-4 text-lime" />
                </span>
                {h.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
