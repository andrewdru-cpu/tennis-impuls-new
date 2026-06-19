"use client";

import { useState } from "react";
import { CalendarCheck, Clock, MapPin } from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const courtTypes = ["Крытый Hard", "Открытый грунт", "Падел"];
const times = ["07:00", "09:00", "11:00", "14:00", "17:00", "19:00", "21:00"];

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
        align="center"
        className="mx-auto"
        eyebrow="Бронирование онлайн"
        title={
          <>
            Выберите услугу,{" "}
            <span className="text-lime">остальное мы возьмём на себя</span>
          </>
        }
        description="Корты, тренировки и дополнительные услуги — бронируйте онлайн за пару кликов."
      />

      {/*
        👉 ПЛЕЙСХОЛДЕР ФОРМЫ: визуальный прототип онлайн-бронирования.
           Позже подключить к реальной системе бронирования / CRM / API.
      */}
      <Reveal delay={0.1} className="section-inner mx-auto max-w-lg">
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
    </Section>
  );
}
