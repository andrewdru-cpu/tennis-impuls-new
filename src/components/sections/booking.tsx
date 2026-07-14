"use client";

import { useRef, useState } from "react";
import {
  Activity,
  Baby,
  CalendarDays,
  Check,
  Clock,
  Flower2,
  HeartHandshake,
  Loader2,
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

type BookingFormValues = {
  name: string;
  phone: string;
  date: string;
  time: string;
  comment: string;
};

type BookingPayload = BookingFormValues & {
  group: string;
  service: string;
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
        id: "karate",
        icon: Shield,
        title: "Каратэ",
        detail: "Для детей и взрослых",
      },
      {
        id: "dance",
        icon: Music,
        title: "Танцы",
        detail: "Групповые и индивидуальные",
      },
      {
        id: "massage",
        icon: HeartHandshake,
        title: "Массаж",
        detail: "Спортивный / восстановительный",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Отправка (заглушка — готова к замене на API)                              */
/* -------------------------------------------------------------------------- */

/**
 * 👉 INTEGRATION: замените на реальную отправку заявки.
 *    Варианты: POST на BOOKING_WEBHOOK_URL из .env, server action
 *    или CRM/YCLIENTS. Сейчас — имитация сетевого запроса.
 */
async function submitBookingRequest(payload: BookingPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (process.env.NODE_ENV === "development") {
    console.log("Заявка на запись:", payload);
  }
}

function validateBookingForm(values: BookingFormValues): Partial<
  Record<keyof BookingFormValues, string>
> {
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

  if (!values.date) {
    errors.date = "Выберите предпочтительную дату";
  }

  if (!values.time) {
    errors.time = "Выберите предпочтительное время";
  }

  return errors;
}

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

const inputErrorClass =
  "border-red-400/55 hover:border-red-400/65 focus:border-red-400/80 focus:ring-red-400/30";

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-medium text-white/70";

function FieldError({
  message,
  id,
}: {
  message?: string;
  id?: string;
}) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-300" role="alert">
      {message}
    </p>
  );
}

function BookingSuccess({
  serviceTitle,
  groupLabel,
  onReset,
}: {
  serviceTitle: string;
  groupLabel: string;
  onReset: () => void;
}) {
  return (
    <div
      className="mt-8 animate-fade-up rounded-2xl border border-lime/40 bg-gradient-to-br from-lime/20 via-emerald-900/25 to-terracotta/15 p-6 ring-1 ring-lime/25 sm:p-8"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-lime text-forest-950 shadow-lime">
          <Check className="h-7 w-7" aria-hidden />
        </span>
        <div className="mt-4 sm:mt-0 sm:ml-5">
          <p className="font-display text-xl font-bold text-white sm:text-2xl">
            Заявка отправлена!
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
            Мы свяжемся с вами в ближайшее время.
          </p>
          <p className="mt-3 text-sm text-white/60">
            Направление:{" "}
            <span className="font-semibold text-terracotta-200">
              {serviceTitle}
            </span>{" "}
            <span className="text-white/45">({groupLabel})</span>
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="mt-6 w-full border-white/25 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
        onClick={onReset}
      >
        Отправить ещё одну заявку
      </Button>
    </div>
  );
}

export function Booking() {
  const formRef = useRef<HTMLFormElement>(null);
  const [groupId, setGroupId] = useState<ServiceGroupId>("tennis");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof BookingFormValues, string>>
  >({});

  const activeGroup = serviceGroups.find((g) => g.id === groupId)!;
  const activeService =
    activeGroup.services.find((s) => s.id === serviceId) ?? null;

  function resetFormState() {
    setSubmitted(false);
    setIsSubmitting(false);
    setFormError(null);
    setFieldErrors({});
    formRef.current?.reset();
  }

  function selectGroup(id: ServiceGroupId) {
    setGroupId(id);
    setServiceId(null);
    resetFormState();
  }

  function selectService(id: string) {
    setServiceId(id);
    resetFormState();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeService) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as BookingFormValues;
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
      await submitBookingRequest({
        group: activeGroup.label,
        service: activeService.title,
        ...data,
      });
      form.reset();
      setSubmitted(true);
    } catch {
      setFormError(
        "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section
      id="booking"
      className="relative overflow-hidden bg-gradient-to-b from-forest-800 via-forest-700 to-forest-800 py-16 text-white sm:py-24 lg:py-28"
      before={
        <>
          <div className="absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
          <div
            className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-terracotta/18 blur-[120px]"
            aria-hidden
          />
          <div
            className="absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-lime/12 blur-[110px]"
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

      <Reveal delay={0.1} className="section-inner mx-auto max-w-5xl">
        <div className="card-form-dark p-6 sm:p-8 lg:p-10">
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
                    "chip-interactive flex min-h-[72px] items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-bold sm:min-h-[76px] sm:text-base",
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
                    onClick={() => selectService(service.id)}
                    className={cn(
                      "chip-interactive group flex items-center gap-3 rounded-2xl border p-4 text-left sm:p-5",
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
            <>
              {submitted ? (
                <BookingSuccess
                  serviceTitle={activeService.title}
                  groupLabel={activeGroup.label}
                  onReset={resetFormState}
                />
              ) : (
                <form
                  ref={formRef}
                  key={activeService.id}
                  onSubmit={handleSubmit}
                  noValidate
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
                        Имя <span className="text-terracotta-300">*</span>
                      </label>
                      <input
                        id="booking-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Как к вам обращаться"
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={
                          fieldErrors.name ? "booking-name-error" : undefined
                        }
                        className={cn(
                          inputClass,
                          fieldErrors.name && inputErrorClass
                        )}
                        onChange={() => {
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.name;
                              return next;
                            });
                          }
                        }}
                      />
                      <FieldError
                        message={fieldErrors.name}
                        id="booking-name-error"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className={labelClass}>
                        <Phone className="h-4 w-4 shrink-0 text-terracotta-300" />
                        Телефон <span className="text-terracotta-300">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+7 (___) ___-__-__"
                        aria-invalid={Boolean(fieldErrors.phone)}
                        aria-describedby={
                          fieldErrors.phone ? "booking-phone-error" : undefined
                        }
                        className={cn(
                          inputClass,
                          fieldErrors.phone && inputErrorClass
                        )}
                        onChange={() => {
                          if (fieldErrors.phone) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.phone;
                              return next;
                            });
                          }
                        }}
                      />
                      <FieldError
                        message={fieldErrors.phone}
                        id="booking-phone-error"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-date" className={labelClass}>
                        <CalendarDays className="h-4 w-4 shrink-0 text-terracotta-300" />
                        Предпочтительная дата{" "}
                        <span className="text-terracotta-300">*</span>
                      </label>
                      <input
                        id="booking-date"
                        name="date"
                        type="date"
                        aria-invalid={Boolean(fieldErrors.date)}
                        aria-describedby={
                          fieldErrors.date ? "booking-date-error" : undefined
                        }
                        className={cn(
                          inputClass,
                          "[color-scheme:dark]",
                          fieldErrors.date && inputErrorClass
                        )}
                        onChange={() => {
                          if (fieldErrors.date) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.date;
                              return next;
                            });
                          }
                        }}
                      />
                      <FieldError
                        message={fieldErrors.date}
                        id="booking-date-error"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-time" className={labelClass}>
                        <Clock className="h-4 w-4 shrink-0 text-terracotta-300" />
                        Предпочтительное время{" "}
                        <span className="text-terracotta-300">*</span>
                      </label>
                      <input
                        id="booking-time"
                        name="time"
                        type="time"
                        aria-invalid={Boolean(fieldErrors.time)}
                        aria-describedby={
                          fieldErrors.time ? "booking-time-error" : undefined
                        }
                        className={cn(
                          inputClass,
                          "[color-scheme:dark]",
                          fieldErrors.time && inputErrorClass
                        )}
                        onChange={() => {
                          if (fieldErrors.time) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.time;
                              return next;
                            });
                          }
                        }}
                      />
                      <FieldError
                        message={fieldErrors.time}
                        id="booking-time-error"
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

                  {formError && (
                    <p
                      className="mt-4 rounded-xl border border-red-400/35 bg-red-950/30 px-4 py-3 text-sm text-red-200"
                      role="alert"
                    >
                      {formError}
                    </p>
                  )}

                  <Button
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="h-5 w-5 animate-spin"
                          aria-hidden
                        />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Отправить заявку
                      </>
                    )}
                  </Button>

                  <p className="mt-4 text-center text-xs leading-relaxed text-white/50">
                    Нажимая кнопку, вы соглашаетесь с правилами центра
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
