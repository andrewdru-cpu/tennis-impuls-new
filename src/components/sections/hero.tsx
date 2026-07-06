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
        "justify-end pb-[max(2.75rem,env(safe-area-inset-bottom,0px))] pt-[calc(5rem+env(safe-area-inset-top,0px))]",
        "md:justify-center md:pb-20 md:pt-24 lg:pb-24"
      )}
    >
      <HeroMedia />

      {/* Стеклянная панель справа — под текст, не заходит на здание */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[min(50%,40rem)] bg-gradient-to-l from-forest-950/22 via-forest-950/10 to-transparent md:block lg:w-[min(46%,38rem)]"
        aria-hidden
      />

      <div className="container-wide relative z-10 flex md:justify-end">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className={cn(
            "flex w-full max-w-[30rem] flex-col items-start text-left",
            "md:max-w-[min(38vw,29rem)] lg:max-w-[29rem]"
          )}
        >
          <motion.div variants={item}>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2",
                "border border-terracotta/30 bg-white/[0.11] backdrop-blur-xl",
                "shadow-[0_8px_32px_-8px_rgba(206,88,56,0.4)]",
                "text-[0.625rem] font-bold uppercase tracking-[0.2em] text-sand-100 sm:text-[0.6875rem]"
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

          <motion.h1
            variants={item}
            className={cn(
              "mt-5 font-display font-extrabold leading-[1.08] tracking-[-0.02em] text-balance",
              "text-[1.75rem] sm:text-[2.125rem] lg:text-[2.5rem]",
              "[text-shadow:0_2px_40px_rgba(0,0,0,0.55)]"
            )}
          >
            <span className="block text-white">Теннис, фитнес</span>
            <span className="mt-0.5 block">
              <span className="text-white/95">и отдых — </span>
              <span className="bg-gradient-to-r from-lime-300 via-sand-200 to-terracotta bg-clip-text text-transparent">
                в одном месте
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className={cn(
              "mt-4 max-w-[26rem] text-pretty text-[0.9375rem] font-medium leading-relaxed text-sand-100/90 sm:mt-5 sm:text-base",
              "[text-shadow:0_2px_20px_rgba(0,0,0,0.45)]"
            )}
          >
            Всё необходимое для восстановления, спорта и отдыха — в экологически
            чистой зоне у&nbsp;Лосиного&nbsp;Острова.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 h-0.5 w-12 rounded-full bg-gradient-to-r from-terracotta via-lime/85 to-sand/65 sm:mt-6 sm:w-16"
            aria-hidden
          />

          <motion.ul
            variants={item}
            className={cn(
              "mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem] font-semibold tracking-tight text-sand-100/85 sm:mt-6 sm:text-sm",
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
            className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center sm:gap-3.5"
          >
            <Button
              asChild
              size="lg"
              variant="primary"
              className={cn(
                "h-12 w-full px-6 text-[0.9375rem] font-bold sm:w-auto sm:min-w-[210px]",
                "shadow-terracotta ring-1 ring-white/20",
                "hover:ring-sand/40"
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
                "h-12 w-full px-6 text-[0.9375rem] font-semibold sm:w-auto sm:min-w-[185px]",
                "border border-white/25 bg-white/10 backdrop-blur-xl",
                "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)]",
                "hover:border-sand/50 hover:bg-white/18 hover:shadow-glow"
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
