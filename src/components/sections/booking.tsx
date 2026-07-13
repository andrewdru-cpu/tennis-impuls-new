"use client";

import { useState } from "react";
import {
  Activity,
  Baby,
  CalendarDays,
  Check,
  Clock,
  Flower2,
  HeartHandshake,
  Music,
  Phone,
  Send,
  Shield,
  Sparkles,
  Table2,
  Target,
  Trees,
  UserRound,
  type LucideIcon,
} from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Данные                                                                    */
/* -------------------------------------------------------------------------- */

type ServiceGroupId = "tennis" | "other";

type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  detail: string;
};

const serviceGroups: {
  id: ServiceGroupId;
  label: string;
  icon: LucideIcon;
  services: Service[];
}[] = [
  {
    id: "tennis",
    label: "Теннисные виды спорта",
    icon: Target,
    services: [
      {
        id: "ground-court",
        icon: Trees,
        title: "Открытый грунтовый корт",
        detail: "Покрытие Tennisit",
      },
      {
        id: "indoor-court",
        icon: Target,
        title: "Крытый корт",
        detail: "Полумягкий хард",
      },
      {
        id: "kids-court",
        icon: Baby,
        title: "Детская площадка",
        detail: "Полумягкий хард",
      },
      {
        id: "padel-court",
        icon: Activity,
        title: "Падел-корт",
        detail: "Полумягкий хард",
      },
      {
        id: "table-tennis",
        icon: Table2,
        title: "Настольный теннис",
        detail: "4 профессиональных стола",
      },
    ],
  },
  {
    id: "other",
    label: "Другие направления",
    icon: Sparkles,
    services: [
      {
        id: "ofp",
        icon: Activity,
        title: "Залы ОФП и специальной подготовки",
        detail: "Сила и функциональная база",
      },
      {
        id: "yoga",
        icon: Flower2,
        title: "Йога",
        detail: "Гибкость и восстановление",
      },
      {
        id: "dance",
        icon: Music,
        title: "Танцы",
        detail: "Групповые и индивидуальные",
      },
      {
        id: "karate",
        icon: Shield,
        title: "Каратэ",
        detail: "Для детей и взрослых",
      },
      {
        id: "massage",
        icon: HeartHandshake,
        title: "Массаж",
        detail: "Спортивный / восстановительный",
      },
      {
        id: "spa",
        icon: Sparkles,
        title: "Спа-зал / восстановление",
        detail: "Перезагрузка после нагрузок",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  UI                                                                        */
/* -------------------------------------------------------------------------- */

const inputClass = cn(
  "w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3.5 text-sm text-white",
  "placeholder:text-white/40",
  "transition-[border-color,background-color,box-shadow] duration-300",
  "hover:border-white/25",
  "focus:border-terracotta/70 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-terracotta/35 focus:shadow-[0_0_20px_-6px_rgba(206,88,56,0.4)]"
);

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-medium text-white/70";

export function Booking() {
  const [groupId, setGroupId] = useState<ServiceGroupId>("tennis");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const activeGroup = serviceGroups.find((g) => g.id === groupId)!;
  const activeService =
    activeGroup.services.find((s) => s.id === serviceId) ?? null;

  function selectGroup(id: ServiceGroupId) {
    setGroupId(id);
    setServiceId(null);
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    // 👉 ПЛЕЙСХОЛДЕР: позже заменить на реальную отправку (API / CRM)
    if (process.env.NODE_ENV === "development") {
      console.log("Заявка на запись:", {
        group: activeGroup.label,
        service: activeService?.title,
        ...data,
      });
    }
    setSubmitted(true);
  }

  return (
    <Section
      id="booking"
      tone="dark"
      className="relative overflow-hidden"
      before={
        <>
          <div className="absolute inset-0 bg-grid opacity-[0.12]" aria-hidden />
          <div
            className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-terracotta/22 blur-[120px]"
            aria-hidden
          />
          <div
            className="absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-lime/14 blur-[110px]"
            aria-hidden
          />
        </>
      }
    >
      <SectionHeading
        tone="light"
        align="center"
        className="mx-auto"
        eyebrow="Запись на услуги"
        title={
          <>
            Записаться{" "}
            <span className="text-terracotta-300">на занятие</span>
          </>
        }
        description="Выберите направление и удобное время. Мы свяжемся с вами для подтверждения записи."
      />

      <Reveal delay={0.1} className="section-inner mx-auto max-w-4xl">
        <div className="card-form-dark">
          {/* ── Шаг 1 · Группа услуг ── */}
          <div className="grid grid-cols-1 gap-2 rounded-[1.25rem] bg-white/[0.06] p-2 ring-1 ring-white/10 sm:grid-cols-2">
            {serviceGroups.map((group) => {
              const GroupIcon = group.icon;
              const isActive = group.id === groupId;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => selectGroup(group.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "chip-interactive flex min-h-[64px] items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-bold sm:text-base",
                    isActive
                      ? "bg-gradient-to-r from-terracotta to-terracotta-500 text-white shadow-terracotta ring-1 ring-white/20"
                      : "text-white/75 hover:bg-terracotta/12 hover:text-white"
                  )}
                >
                  <GroupIcon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      !isActive && "text-terracotta-300"
                    )}
                    aria-hidden
                  />
                  {group.label}
                </button>
              );
            })}
          </div>

          {/* ── Шаг 2 · Услуга ── */}
          <div className="mt-7">
            <p className="mb-3 text-sm font-medium text-white/70">
              Выберите услугу
            </p>
            <div
              role="radiogroup"
              aria-label={`Услуги: ${activeGroup.label}`}
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {activeGroup.services.map((service) => {
                const ServiceIcon = service.icon;
                const isSelected = service.id === serviceId;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setServiceId(service.id);
                      setSubmitted(false);
                    }}
                    className={cn(
                      "chip-interactive group flex items-center gap-3 rounded-2xl border p-3.5 text-left sm:p-4",
                      isSelected
                        ? "border-terracotta bg-terracotta/15 shadow-[0_0_0_1px_rgba(206,88,56,0.4),0_8px_28px_-8px_rgba(206,88,56,0.45)]"
                        : "border-white/12 bg-white/5 hover:-translate-y-0.5 hover:border-terracotta/50 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_-10px_rgba(206,88,56,0.4)]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        isSelected
                          ? "bg-terracotta text-white"
                          : "bg-white/10 text-terracotta-200"
                      )}
                    >
                      <ServiceIcon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-snug text-white">
                        {service.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-white/55">
                        {service.detail}
                      </span>
                    </span>
                    {isSelected && (
                      <Check
                        className="ml-auto h-5 w-5 shrink-0 text-terracotta-200"
                        aria-hidden
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Шаг 3 · Форма ── */}
          {activeService && (
            <form
              key={activeService.id}
              onSubmit={handleSubmit}
              className="mt-8 animate-fade-up"
            >
              <div className="mb-5 rounded-2xl bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/70">
                Вы записываетесь:{" "}
                <span className="font-semibold text-terracotta-200">
                  {activeService.title}
                </span>{" "}
                <span className="text-white/45">({activeGroup.label})</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-name" className={labelClass}>
                    <UserRound className="h-4 w-4 shrink-0 text-terracotta-300" />
                    Имя
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className={labelClass}>
                    <Phone className="h-4 w-4 shrink-0 text-terracotta-300" />
                    Телефон
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+7 (___) ___-__-__"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="booking-date" className={labelClass}>
                    <CalendarDays className="h-4 w-4 shrink-0 text-terracotta-300" />
                    Предпочтительная дата
                  </label>
                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    required
                    className={cn(inputClass, "[color-scheme:dark]")}
                  />
                </div>
                <div>
                  <label htmlFor="booking-time" className={labelClass}>
                    <Clock className="h-4 w-4 shrink-0 text-terracotta-300" />
                    Предпочтительное время
                  </label>
                  <input
                    id="booking-time"
                    name="time"
                    type="time"
                    required
                    className={cn(inputClass, "[color-scheme:dark]")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="booking-comment" className={labelClass}>
                    Комментарий{" "}
                    <span className="font-normal text-white/40">
                      (опционально)
                    </span>
                  </label>
                  <textarea
                    id="booking-comment"
                    name="comment"
                    rows={3}
                    placeholder="Уровень подготовки, пожелания к тренеру, вопросы…"
                    className={cn(inputClass, "resize-none")}
                  />
                </div>
              </div>

              {submitted ? (
                <div className="mt-6 animate-fade-up rounded-2xl border border-lime/35 bg-gradient-to-r from-lime/15 via-lime/8 to-terracotta/10 px-5 py-5">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-forest-950 shadow-lime">
                      <Check className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="text-sm leading-relaxed text-white">
                      <p className="font-display text-base font-bold">
                        Заявка отправлена!
                      </p>
                      <p className="mt-1 text-white/80">
                        Мы свяжемся с вами для подтверждения записи на «
                        <span className="font-semibold text-terracotta-200">
                          {activeService.title}
                        </span>
                        ».
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Button size="lg" type="submit" className="mt-6 w-full">
                  <Send className="h-5 w-5" />
                  Отправить заявку
                </Button>
              )}

              <p className="mt-4 text-center text-xs leading-relaxed text-white/50">
                Нажимая кнопку, вы соглашаетесь с правилами центра
              </p>
            </form>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
