"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Clock,
  MapPin,
  ParkingCircle,
  Building2,
  ShowerHead,
  Crown,
  Coffee,
  Package,
  HeartHandshake,
  type LucideIcon,
} from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const courtTypes = ["Крытый Hard", "Открытый грунт", "Падел"];
const times = ["07:00", "09:00", "11:00", "14:00", "17:00", "19:00", "21:00"];

type Benefit = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const benefits: Benefit[] = [
  {
    icon: ParkingCircle,
    title: "Собственная бесплатная парковка",
    text: "Места для гостей клуба на всё время визита",
  },
  {
    icon: Building2,
    title: "Здание капитального строения",
    text: "Современный комплекс, комфортный круглый год",
  },
  {
    icon: ShowerHead,
    title: "Комфортные раздевалки с душевыми",
    text: "Просторные комнаты со всем необходимым",
  },
  {
    icon: Crown,
    title: "VIP-раздевалки с сауной",
    text: "Премиальный комфорт для особых гостей",
  },
  {
    icon: Coffee,
    title: "Кафе и зона отдыха",
    text: "Уютное место между тренировками",
  },
  {
    icon: Package,
    title: "Инвентарь в аренду",
    text: "Ракетки и оборудование на ресепшене",
  },
  {
    icon: HeartHandshake,
    title: "Персональный подход",
    text: "Команда всегда на связи и готова помочь",
  },
];

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const Icon = benefit.icon;

  return (
    <Reveal delay={index * 0.05} as="li" className={cn(index === benefits.length - 1 && "sm:col-span-2")}>
      <div
        className={cn(
          "group flex h-full gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4",
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-lime/35 hover:bg-white/[0.1] hover:shadow-[0_12px_40px_-16px_rgba(184,224,62,0.35)]",
          "sm:gap-3.5 sm:p-5"
        )}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-lime",
            "transition-colors duration-300 group-hover:bg-lime group-hover:text-forest-900",
            "sm:h-11 sm:w-11"
          )}
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-snug text-white sm:text-[0.9375rem]">
            {benefit.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-white/60 sm:text-sm sm:leading-6">
            {benefit.text}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function Booking() {
  const [court, setCourt] = useState(courtTypes[0]);
  const [time, setTime] = useState(times[3]);

  return (
    <Section
      id="booking"
      tone="dark"
      className="relative overflow-hidden"
      before={
        <>
          <div className="absolute inset-0 bg-grid opacity-[0.12]" aria-hidden />
          <div
            className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-lime/20 blur-[120px]"
            aria-hidden
          />
        </>
      }
    >
        <SectionHeading
          tone="light"
          eyebrow="Бронирование онлайн"
          title={
            <>
              Выберите услугу,{" "}
              <span className="text-lime">остальное мы возьмём на себя</span>
            </>
          }
          description="Корты, тренировки и дополнительные услуги — бронируйте онлайн за пару кликов."
        />

        <div className="section-inner grid items-start gap-10 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_440px]">
          <div>
            <Reveal delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime/80">
                Преимущества комплекса
              </p>
            </Reveal>

            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {benefits.map((benefit, i) => (
                <BenefitCard key={benefit.title} benefit={benefit} index={i} />
              ))}
            </ul>
          </div>

          {/*
            👉 ПЛЕЙСХОЛДЕР ФОРМЫ: визуальный прототип онлайн-бронирования.
               Позже подключить к реальной системе бронирования / CRM / API.
          */}
          <Reveal delay={0.15} className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-7 lg:p-8">
              <div className="space-y-6">
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
                    <MapPin className="h-4 w-4 shrink-0 text-lime" />
                    Тип корта
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {courtTypes.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCourt(c)}
                        className={cn(
                          "min-h-[44px] rounded-xl border px-3 py-3 text-xs font-semibold transition-all duration-200 sm:text-sm",
                          "active:scale-[0.98]",
                          court === c
                            ? "border-lime bg-lime text-forest-900 shadow-[0_0_0_1px_rgba(184,224,62,0.4)]"
                            : "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
                    <Clock className="h-4 w-4 shrink-0 text-lime" />
                    Время
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={cn(
                          "min-h-[44px] rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-4",
                          "active:scale-[0.98]",
                          time === t
                            ? "border-lime bg-lime text-forest-900 shadow-[0_0_0_1px_rgba(184,224,62,0.4)]"
                            : "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-white/70">
                  Вы выбрали:{" "}
                  <span className="font-semibold text-white">{court}</span> в{" "}
                  <span className="font-semibold text-white">{time}</span>
                </div>

                <Button size="lg" className="w-full">
                  <CalendarCheck className="h-5 w-5" />
                  Забронировать корт
                </Button>
                <p className="text-center text-xs leading-relaxed text-white/50">
                  Нажимая кнопку, вы соглашаетесь с правилами клуба
                </p>
              </div>
            </div>
          </Reveal>
        </div>
    </Section>
  );
}
