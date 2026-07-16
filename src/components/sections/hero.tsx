"use client";

import { motion } from "framer-motion";
import { CalendarCheck, ArrowRight, ChevronDown } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { HeroMedia } from "@/components/hero/hero-media";
import { cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer, transitionMenu } from "@/lib/motion";

const container = staggerContainer;
const item = fadeUpItem;

export function Hero() {
  return (
    <section
      id="hero"
      className={cn(
        "relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white",
        "justify-start pb-[max(2.75rem,env(safe-area-inset-bottom,0px))] pt-[calc(5rem+env(safe-area-inset-top,0px))]",
        "md:justify-start md:pb-20 md:pt-[calc(5.25rem+env(safe-area-inset-top,0px))]"
      )}
    >
      <HeroMedia />

      <div
        className={cn(
          "relative z-10 flex w-full flex-1 flex-col",
          "px-[max(1.25rem,env(safe-area-inset-left,0px))]",
          "pr-[max(1rem,env(safe-area-inset-right,0px))]",
          "md:justify-start md:pl-[max(1.25rem,env(safe-area-inset-left,0px))]",
          "md:pr-[max(0.75rem,env(safe-area-inset-right,0px))]",
          "lg:pr-[max(1.5rem,env(safe-area-inset-right,0px))]",
          "xl:pr-[max(2.5rem,env(safe-area-inset-right,0px))]"
        )}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className={cn(
            "relative isolate ml-auto flex w-full flex-col items-end text-right",
            /* ~38–42% ширины — фото занимает ~58–62% слева без текста */
            "max-w-[min(100%,22rem)] sm:max-w-[23rem]",
            "md:mt-6 md:max-w-[min(38vw,24rem)] lg:mt-8 lg:max-w-[25rem]",
            "px-4 py-6 sm:px-5 sm:py-6 lg:px-6 lg:py-7"
          )}
        >
          {/* Подложка только под колонку текста — над ангаром справа */}
          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-2xl",
              "bg-[#0A2F24]/44 backdrop-blur-sm md:bg-[#0A2F24]/40",
              "[mask-image:linear-gradient(to_left,#000_82%,transparent_100%)]",
              "md:[mask-image:linear-gradient(to_left,#000_88%,transparent_100%)]"
            )}
            aria-hidden
          />
          <motion.div variants={item}>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2",
                "border border-red-ctt/40 bg-white/[0.12] backdrop-blur-xl",
                "shadow-[0_8px_32px_-8px_rgba(226,54,54,0.45)]",
                "text-[0.625rem] font-bold uppercase tracking-[0.2em] sm:text-[0.6875rem]"
              )}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-ctt shadow-[0_0_14px_rgba(226,54,54,0.95)]"
                aria-hidden
              />
              <span className="text-ctt-red">ЦТТ «Импульс»</span>
              <span className="text-white/30" aria-hidden>
                ·
              </span>
              <span className="text-sand-100">Лосиный Остров</span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className={cn(
              "mt-5 font-display font-extrabold leading-[1.08] tracking-[-0.02em] text-balance",
              "text-[1.875rem] sm:text-[2.5rem] lg:text-[3.125rem]",
              "[text-shadow:0_2px_40px_rgba(0,0,0,0.55)]"
            )}
          >
            <span className="block whitespace-nowrap text-white">
              Теннис, фитнес
            </span>
            <span className="mt-0.5 block">
              <span className="text-white">и отдых — в </span>
              <span className="text-ctt-red">одном месте</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className={cn(
              "mt-4 text-[0.9375rem] font-medium leading-relaxed text-white/95 sm:mt-5 sm:text-base",
              "[text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_2px_24px_rgba(0,0,0,0.5)]"
            )}
          >
            <span className="block">
              Всё для спорта, восстановления и&nbsp;отдыха —
            </span>
            <span className="block">
              в&nbsp;экологически чистой зоне у&nbsp;Лосиного&nbsp;Острова.
            </span>
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 h-0.5 w-12 self-end rounded-full bg-gradient-to-l from-terracotta via-lime to-sand/70 sm:mt-6 sm:w-16"
            aria-hidden
          />

          <motion.ul
            variants={item}
            className={cn(
              "mt-5 flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-[0.8125rem] font-semibold tracking-tight text-sand-100/85 sm:mt-6 sm:text-sm",
              "[text-shadow:0_1px_16px_rgba(0,0,0,0.4)]"
            )}
          >
            <li className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_rgba(180,220,66,0.9)]"
                aria-hidden
              />
              В 3 минутах от Москвы
            </li>
            <li className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-terracotta shadow-[0_0_10px_rgba(206,88,56,0.9)]"
                aria-hidden
              />
              Бесплатная парковка
            </li>
          </motion.ul>

          <motion.div
            variants={item}
            className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:gap-3.5"
          >
            <Button
              asChild
              size="lg"
              variant="primary"
              className={cn(
                "h-12 w-full px-6 text-[0.9375rem] font-bold text-white sm:w-auto sm:min-w-[210px]",
                // Твёрдая терракотовая заливка, без blur и прозрачности — максимально чёткая
                "bg-none bg-terracotta backdrop-blur-none",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_32px_-6px_rgba(206,88,56,0.65),0_3px_12px_-2px_rgba(0,0,0,0.3)]",
                "hover:bg-terracotta-500 hover:scale-[1.03]",
                "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_40px_-6px_rgba(206,88,56,0.75),0_4px_16px_-2px_rgba(0,0,0,0.35)]"
              )}
            >
              <a href="#booking">
                <CalendarCheck className="h-[1.125rem] w-[1.125rem]" />
                Забронировать корт
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="glass"
              className={cn(
                "h-12 w-full px-6 text-[0.9375rem] font-bold text-white sm:w-auto sm:min-w-[185px]",
                // Минимальный blur и плотный фон — текст остаётся чётким
                "border-2 border-white/40 bg-forest-950/45 backdrop-blur-sm",
                "shadow-[0_8px_28px_-8px_rgba(0,0,0,0.5)]",
                "hover:border-sand/70 hover:bg-forest-950/60 hover:shadow-glow"
              )}
            >
              <a href="#services">
                Услуги и цены
                <ArrowRight className="h-[1.125rem] w-[1.125rem]" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about-preview"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, ...transitionMenu }}
        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/50 transition-colors duration-500 ease-premium hover:text-sand sm:bottom-6 md:flex"
        aria-label="Прокрутить вниз"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Узнать больше
        </span>
        <ChevronDown className="h-5 w-5 animate-float-y" />
      </motion.a>
    </section>
  );
}
