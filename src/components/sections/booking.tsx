"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  Clock,
  HeartHandshake,
  Loader2,
  Package,
  Phone,
  Send,
  UserRound,
  Users,
  type LucideIcon,
} from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PictureImage } from "@/components/media/picture-image";
import {
  abonementCategories,
  findAbonement,
  formatAbonementLabel,
  type AbonementItem,
} from "@/lib/abonements";
import {
  BOOKING_ABONEMENT_EVENT,
  BOOKING_SPECIALIST_EVENT,
  isAbonementBookingInUrl,
  readAbonementFromUrl,
  readSpecialistFromUrl,
} from "@/lib/booking-deeplink";
import type {
  BookingLeadPayload,
  BookingServiceType,
} from "@/lib/booking-lead";
import {
  findTeamMember,
  getCoachSpecialists,
  getMassageSpecialist,
  type TeamMember,
} from "@/lib/team";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const ANY_SPECIALIST_ID = "any";

const COMMENT_PLACEHOLDER =
  "Укажите пожелания: вид занятия (теннис, падел, йога, фитнес…), формат, удобное время, другие пожелания";

type LessonTypeId = "personal" | "group" | "massage" | "abonement";

type BookingFormValues = {
  name: string;
  phone: string;
  date: string;
  time: string;
  comment: string;
};

const lessonTypes: {
  id: LessonTypeId;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  {
    id: "personal",
    label: "Персональное занятие",
    hint: "1:1 с тренером",
    icon: UserRound,
  },
  {
    id: "group",
    label: "Групповое занятие",
    hint: "В группе",
    icon: Users,
  },
  {
    id: "massage",
    label: "Массаж",
    hint: "Спортивный / восстановительный",
    icon: HeartHandshake,
  },
  {
    id: "abonement",
    label: "Абонемент",
    hint: "Пакет занятий",
    icon: Package,
  },
];

async function submitBookingRequest(
  payload: BookingLeadPayload
): Promise<"email"> {
  const res = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    method?: "email";
    error?: string;
  };

  if (!res.ok) {
    throw new Error(
      data.error || "Не удалось отправить. Позвоните +7 (495) 114-68-01"
    );
  }

  if (data.method !== "email") {
    throw new Error("Booking API returned unknown delivery method");
  }

  return "email";
}

function validateBookingForm(
  values: BookingFormValues
): Partial<Record<keyof BookingFormValues, string>> {
  const errors: Partial<Record<keyof BookingFormValues, string>> = {};
  const name = values.name.trim();

  if (!name) {
    errors.name = "Укажите, как к вам обращаться";
  } else if (name.length < 2) {
    errors.name = "Имя слишком короткое";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Укажите номер телефона";
  } else if (phoneDigits.length < 10) {
    errors.phone = "Введите корректный номер телефона";
  }

  return errors;
}

function shortCategory(category: string): string {
  return category
    .replace(/^Тренер категории\s*/i, "")
    .replace(/^Тренер\s+/i, "")
    .trim();
}

const inputClass = cn(
  "w-full rounded-xl border border-forest-900/12 bg-white px-4 py-3.5 text-sm text-[#1F2E2A]",
  "placeholder:text-[#1F2E2A]/40",
  "transition-[border-color,background-color,box-shadow] duration-300",
  "hover:border-forest-900/20",
  "focus:border-terracotta/70 focus:bg-cream/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:shadow-[0_0_20px_-6px_rgba(206,88,56,0.35)]"
);

const inputErrorClass =
  "border-red-400/70 hover:border-red-400/80 focus:border-red-500 focus:ring-red-400/25";

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-medium text-[#1F2E2A]/75";

function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-600" role="alert">
      {message}
    </p>
  );
}

function BookingSuccess({
  serviceTitle,
  specialistLabel,
  isAbonement,
  onReset,
}: {
  serviceTitle: string;
  specialistLabel?: string;
  isAbonement?: boolean;
  onReset: () => void;
}) {
  return (
    <div
      className="mt-8 animate-fade-up rounded-2xl border border-lime/50 bg-gradient-to-br from-lime-50 via-white to-terracotta/10 p-6 ring-1 ring-lime/30 sm:p-8"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-lime text-forest-950 shadow-lime">
          <Check className="h-7 w-7" aria-hidden />
        </span>
        <div className="mt-4 sm:mt-0 sm:ml-5">
          <p className="font-display text-xl font-bold text-forest-800 sm:text-2xl">
            Заявка отправлена!
          </p>
          <p className="mt-2 text-sm leading-relaxed text-bright sm:text-base">
            Мы свяжемся с вами.
            {isAbonement ? " Оформим абонемент по телефону." : ""}
          </p>
          <p className="mt-3 text-sm text-[#1F2E2A]/60">
            {isAbonement ? "Абонемент" : "Тип"}:{" "}
            <span className="font-semibold text-terracotta-600">
              {serviceTitle}
            </span>
          </p>
          {!isAbonement && specialistLabel && (
            <p className="mt-1 text-sm text-[#1F2E2A]/60">
              Специалист:{" "}
              <span className="font-semibold text-forest-800">
                {specialistLabel}
              </span>
            </p>
          )}
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="mt-6 w-full sm:w-auto"
        onClick={onReset}
      >
        Отправить ещё одну заявку
      </Button>
    </div>
  );
}

function SpecialistChip({
  selected,
  onSelect,
  label,
  detail,
  photo,
  photoAlt,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  detail: string;
  photo?: string;
  photoAlt?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-[border-color,background-color,box-shadow] duration-300 sm:p-3.5",
        selected
          ? "border-terracotta bg-terracotta/10 shadow-[0_0_0_1px_rgba(206,88,56,0.35)]"
          : "border-forest-900/10 bg-white hover:border-terracotta/40 hover:bg-cream/60"
      )}
    >
      <span
        className={cn(
          "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2",
          selected ? "ring-terracotta/50" : "ring-forest-900/8"
        )}
      >
        {photo ? (
          <PictureImage
            src={photo}
            alt={photoAlt ?? label}
            width={44}
            height={44}
            sizes="44px"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fallback={
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  selected
                    ? "bg-terracotta text-white"
                    : "bg-terracotta/10 text-terracotta"
                )}
              >
                <UserRound className="h-5 w-5" aria-hidden />
              </span>
            }
          />
        ) : (
          <span
            className={cn(
              "flex h-full w-full items-center justify-center",
              selected
                ? "bg-terracotta text-white"
                : "bg-terracotta/10 text-terracotta"
            )}
          >
            <UserRound className="h-5 w-5" aria-hidden />
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold leading-snug text-forest-800">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-xs text-[#1F2E2A]/55">
          {detail}
        </span>
      </span>
      {selected && (
        <Check className="h-4 w-4 shrink-0 text-terracotta" aria-hidden />
      )}
    </button>
  );
}

export function Booking() {
  const formRef = useRef<HTMLFormElement>(null);
  const [lessonType, setLessonType] = useState<LessonTypeId>("personal");
  const [abonementId, setAbonementId] = useState<string | null>(null);
  const [specialistId, setSpecialistId] = useState<string>(ANY_SPECIALIST_ID);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof BookingFormValues, string>>
  >({});

  const coaches = useMemo(() => getCoachSpecialists(), []);
  const massageSpecialist = useMemo(() => getMassageSpecialist(), []);
  const isAbonement = lessonType === "abonement";
  const isMassage = lessonType === "massage";
  const showCoachPicker = lessonType === "personal" || lessonType === "group";

  const activeAbonement: AbonementItem | null = abonementId
    ? (findAbonement(abonementId) ?? null)
    : null;

  const activeSpecialist: TeamMember | null = isMassage
    ? (massageSpecialist ?? null)
    : specialistId === ANY_SPECIALIST_ID
      ? null
      : (findTeamMember(specialistId) ?? null);

  const specialistLabel = isMassage
    ? (massageSpecialist?.name ?? "Массажист")
    : specialistId === ANY_SPECIALIST_ID
      ? "Любой специалист"
      : (activeSpecialist?.name ?? "Любой специалист");

  const typeLabel =
    lessonTypes.find((t) => t.id === lessonType)?.label ?? lessonType;

  function resetFormState() {
    setSubmitted(false);
    setIsSubmitting(false);
    setFormError(null);
    setFieldErrors({});
    formRef.current?.reset();
  }

  function applySpecialistDeepLink(rawId: string | null) {
    if (!rawId) return;
    const member = findTeamMember(rawId);
    if (!member) return;

    if (member.id === "privalov") {
      setLessonType("massage");
      setAbonementId(null);
      setSpecialistId(member.id);
    } else {
      setLessonType("personal");
      setAbonementId(null);
      setSpecialistId(member.id);
    }
    setSubmitted(false);
    setFormError(null);
  }

  function applyAbonementDeepLink(rawId: string | null) {
    setLessonType("abonement");
    setAbonementId(rawId && findAbonement(rawId) ? rawId : null);
    setSpecialistId(ANY_SPECIALIST_ID);
    setSubmitted(false);
    setFormError(null);
  }

  useEffect(() => {
    applySpecialistDeepLink(readSpecialistFromUrl());
    if (isAbonementBookingInUrl()) {
      applyAbonementDeepLink(readAbonementFromUrl());
    }

    const onSpecialist = (event: Event) => {
      const detail = (event as CustomEvent<{ specialistId?: string }>).detail;
      applySpecialistDeepLink(detail?.specialistId ?? readSpecialistFromUrl());
    };
    const onAbonement = (event: Event) => {
      const detail = (event as CustomEvent<{ abonementId?: string }>).detail;
      applyAbonementDeepLink(detail?.abonementId ?? readAbonementFromUrl());
    };

    window.addEventListener(BOOKING_SPECIALIST_EVENT, onSpecialist);
    window.addEventListener(BOOKING_ABONEMENT_EVENT, onAbonement);
    return () => {
      window.removeEventListener(BOOKING_SPECIALIST_EVENT, onSpecialist);
      window.removeEventListener(BOOKING_ABONEMENT_EVENT, onAbonement);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: BookingFormValues = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      date: String(fd.get("date") ?? ""),
      time: String(fd.get("time") ?? ""),
      comment: String(fd.get("comment") ?? ""),
    };

    if (isAbonement && !activeAbonement) {
      setFormError("Выберите абонемент");
      return;
    }

    const errors = validateBookingForm(data);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError("Заполните обязательные поля, чтобы отправить заявку.");
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setIsSubmitting(true);

    try {
      const serviceType: BookingServiceType = lessonType;
      let group = typeLabel;
      let service = typeLabel;
      let selectedAbonement: string | undefined;
      let specialist = "";
      let specId = "";

      if (isAbonement && activeAbonement) {
        const label = formatAbonementLabel(activeAbonement);
        group = "Абонементы";
        service = label;
        selectedAbonement = label;
      } else if (isMassage) {
        group = "Массаж";
        service = "Массаж";
        specialist = specialistLabel;
        specId = massageSpecialist?.id ?? "privalov";
      } else {
        group =
          lessonType === "personal"
            ? "Персональные занятия"
            : "Групповые занятия";
        service = typeLabel;
        specialist = specialistLabel;
        specId =
          specialistId === ANY_SPECIALIST_ID ? ANY_SPECIALIST_ID : specialistId;
      }

      await submitBookingRequest({
        serviceType,
        group,
        service,
        specialist,
        specialistId: specId,
        selectedAbonement,
        name: data.name,
        phone: data.phone,
        date: data.date,
        time: data.time,
        comment: data.comment ?? "",
      });

      formRef.current?.reset();
      setSubmitted(true);
    } catch (err) {
      setFormError(
        err instanceof Error && err.message
          ? err.message
          : "Не удалось отправить. Позвоните +7 (495) 114-68-01"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const successTitle =
    isAbonement && activeAbonement
      ? formatAbonementLabel(activeAbonement)
      : typeLabel;

  return (
    <Section id="booking" tone="muted" className="overflow-hidden">
      <SectionHeading
        eyebrow="Запись"
        title={
          <>
            Запишитесь на{" "}
            <span className="text-terracotta-600">занятие</span>
          </>
        }
        description="Оставьте заявку на персональное или групповое занятие. Направление и детали — в комментарии. Мы перезвоним и уточним запись."
      />

      <Reveal className="section-inner mx-auto max-w-3xl">
        <div className="rounded-[1.75rem] border border-forest-900/10 bg-white p-5 shadow-soft sm:p-8">
          {/* Шаг 1 · Тип */}
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta-600">
            Шаг 1 · Тип занятия
          </p>
          <div
            className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
            role="radiogroup"
            aria-label="Тип занятия"
          >
            {lessonTypes.map((type) => {
              const Icon = type.icon;
              const selected = lessonType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    setLessonType(type.id);
                    setSubmitted(false);
                    setFormError(null);
                    if (type.id === "massage") {
                      setSpecialistId(
                        massageSpecialist?.id ?? ANY_SPECIALIST_ID
                      );
                    } else if (type.id !== "abonement") {
                      /* keep specialist if coach still valid */
                    } else {
                      setSpecialistId(ANY_SPECIALIST_ID);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300",
                    selected
                      ? "border-terracotta bg-terracotta/10"
                      : "border-forest-900/10 bg-cream/40 hover:border-terracotta/35 hover:bg-cream"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      selected
                        ? "bg-terracotta text-white"
                        : "bg-white text-terracotta"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-forest-800">
                      {type.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#1F2E2A]/55">
                      {type.hint}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Абонементы */}
          {isAbonement && (
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta-600">
                Выберите абонемент
              </p>
              <div className="mt-3 space-y-4">
                {abonementCategories.map((category) => (
                  <div key={category.id}>
                    <p className="mb-2 text-sm font-semibold text-forest-800">
                      {category.title}
                    </p>
                    <div
                      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                      role="radiogroup"
                      aria-label={category.title}
                    >
                      {category.items.map((item) => {
                        const selected = item.id === abonementId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => {
                              setAbonementId(item.id);
                              setSubmitted(false);
                            }}
                            className={cn(
                              "rounded-2xl border p-4 text-left transition-colors",
                              selected
                                ? "border-terracotta bg-terracotta/10"
                                : "border-forest-900/10 bg-cream/30 hover:border-terracotta/35"
                            )}
                          >
                            <span className="block text-sm font-bold text-forest-800">
                              {formatAbonementLabel(item)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Шаг 2 · Специалист */}
          {showCoachPicker && (
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta-600">
                Шаг 2 · Специалист
                <span className="ml-1 font-medium normal-case tracking-normal text-[#1F2E2A]/45">
                  (необязательно)
                </span>
              </p>
              <p className="mt-2 text-sm text-[#1F2E2A]/60">
                Выберите тренера или оставьте «Любой специалист». Вид занятия
                (теннис, падел, йога…) укажите в комментарии.
              </p>
              <div
                className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"
                role="radiogroup"
                aria-label="Специалист"
              >
                <SpecialistChip
                  selected={specialistId === ANY_SPECIALIST_ID}
                  onSelect={() => setSpecialistId(ANY_SPECIALIST_ID)}
                  label="Любой специалист"
                  detail="Подберём подходящего тренера"
                />
                {coaches.map((member) => (
                  <SpecialistChip
                    key={member.id}
                    selected={specialistId === member.id}
                    onSelect={() => setSpecialistId(member.id)}
                    label={member.name}
                    detail={shortCategory(member.category)}
                    photo={member.photo}
                    photoAlt={member.name}
                  />
                ))}
              </div>
            </div>
          )}

          {isMassage && massageSpecialist && (
            <div className="mt-8 rounded-2xl border border-forest-900/10 bg-cream/50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta-600">
                Специалист
              </p>
              <p className="mt-2 font-display text-lg font-bold text-forest-800">
                {massageSpecialist.name}
              </p>
              <p className="mt-0.5 text-sm text-[#1F2E2A]/60">
                {massageSpecialist.category}
              </p>
            </div>
          )}

          {/* Форма */}
          {submitted ? (
            <BookingSuccess
              serviceTitle={successTitle}
              specialistLabel={isAbonement ? undefined : specialistLabel}
              isAbonement={isAbonement}
              onReset={resetFormState}
            />
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="mt-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta-600">
                {showCoachPicker || isMassage ? "Шаг 3" : "Шаг 2"} · Контакты
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="booking-name" className={labelClass}>
                    Имя <span className="text-terracotta">*</span>
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={
                      fieldErrors.name ? "booking-name-error" : undefined
                    }
                    className={cn(
                      inputClass,
                      fieldErrors.name && inputErrorClass
                    )}
                    placeholder="Как к вам обращаться"
                  />
                  <FieldError
                    id="booking-name-error"
                    message={fieldErrors.name}
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className={labelClass}>
                    <Phone className="h-3.5 w-3.5 text-terracotta" aria-hidden />
                    Телефон <span className="text-terracotta">*</span>
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={
                      fieldErrors.phone ? "booking-phone-error" : undefined
                    }
                    className={cn(
                      inputClass,
                      fieldErrors.phone && inputErrorClass
                    )}
                    placeholder="+7 (___) ___-__-__"
                  />
                  <FieldError
                    id="booking-phone-error"
                    message={fieldErrors.phone}
                  />
                </div>
                <div>
                  <label htmlFor="booking-date" className={labelClass}>
                    <CalendarDays
                      className="h-3.5 w-3.5 text-terracotta"
                      aria-hidden
                    />
                    Предпочтительная дата
                  </label>
                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="booking-time" className={labelClass}>
                    <Clock
                      className="h-3.5 w-3.5 text-terracotta"
                      aria-hidden
                    />
                    Предпочтительное время
                  </label>
                  <input
                    id="booking-time"
                    name="time"
                    type="time"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="booking-comment" className={labelClass}>
                    Комментарий
                  </label>
                  <textarea
                    id="booking-comment"
                    name="comment"
                    rows={4}
                    className={cn(inputClass, "min-h-[7rem] resize-y")}
                    placeholder={COMMENT_PLACEHOLDER}
                  />
                </div>
              </div>

              {formError && (
                <p
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  role="alert"
                >
                  {formError}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  size="lg"
                  className="min-h-12 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Отправка…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Отправить заявку
                    </>
                  )}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-12 w-full border-forest-900/12 sm:w-auto"
                >
                  <Link href={siteConfig.schedulePagePath}>
                    Смотреть расписание
                  </Link>
                </Button>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
