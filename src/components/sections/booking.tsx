"use client";

import { useState } from "react";
import { CalendarCheck, Clock, MapPin, Check } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const courtTypes = ["Крытый Hard", "Открытый грунт", "Падел"];
const times = ["07:00", "09:00", "11:00", "14:00", "17:00", "19:00", "21:00"];

const perks = [
  "Собственная бесплатная парковка для клиентов",
  "Крытые и открытые грунтовые корты",
  "Раздевалки, душ и кафе на территории",
  "Ракетки и инвентарь — в аренду (оплачивается отдельно)",
];

export function Booking() {
  const [court, setCourt] = useState(courtTypes[0]);
  const [time, setTime] = useState(times[3]);

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-forest-950 py-24 text-white lg:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.12]" aria-hidden />
      <div
        className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-lime/20 blur-[120px]"
        aria-hidden
      />

      <div className="container-wide relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Бронирование онлайн"
              title="Забронируйте корт за 30 секунд"
              description="Выберите покрытие и время — остальное мы возьмём на себя."
            />

            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/85">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-forest-900">
                    <Check className="h-4 w-4" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/*
            👉 ПЛЕЙСХОЛДЕР ФОРМЫ: визуальный прототип онлайн-бронирования.
               Позже подключить к реальной системе бронирования / CRM / API.
          */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8">
            <div className="space-y-6">
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
                  <MapPin className="h-4 w-4 text-lime" />
                  Тип корта
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {courtTypes.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCourt(c)}
                      className={cn(
                        "rounded-xl border px-3 py-3 text-xs font-semibold transition-all sm:text-sm",
                        court === c
                          ? "border-lime bg-lime text-forest-900"
                          : "border-white/15 bg-white/5 text-white/80 hover:border-white/40"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
                  <Clock className="h-4 w-4 text-lime" />
                  Время
                </label>
                <div className="flex flex-wrap gap-2">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={cn(
                        "rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                        time === t
                          ? "border-lime bg-lime text-forest-900"
                          : "border-white/15 bg-white/5 text-white/80 hover:border-white/40"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 text-sm text-white/70">
                Вы выбрали:{" "}
                <span className="font-semibold text-white">{court}</span> в{" "}
                <span className="font-semibold text-white">{time}</span>
              </div>

              <Button size="lg" className="w-full">
                <CalendarCheck className="h-5 w-5" />
                Забронировать корт
              </Button>
              <p className="text-center text-xs text-white/50">
                Нажимая кнопку, вы соглашаетесь с правилами клуба
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
