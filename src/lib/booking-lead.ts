/** Общий тип заявки формы #booking (клиент ↔ API). */
export type BookingServiceType =
  | "personal"
  | "group"
  | "abonement"
  | "massage";

export type BookingLeadPayload = {
  serviceType: BookingServiceType;
  /** Человекочитаемый тип / группа */
  group: string;
  /** Краткое название услуги */
  service: string;
  specialist: string;
  specialistId: string;
  selectedAbonement?: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  comment: string;
  email?: string;
  pageUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ym_cid?: string;
};

/** Контракт webhook 1С:Фитнес (cloud.1c.fitness lead). */
export type Fit1cLeadPayload = {
  name: string;
  last_name: string;
  phone: string;
  email: string;
  comment: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  ym_cid: string;
};

const TYPE_LABELS: Record<BookingServiceType, string> = {
  personal: "Персональное занятие",
  group: "Групповое занятие",
  abonement: "Абонемент",
  massage: "Массаж",
};

export function formatBookingLeadText(payload: BookingLeadPayload): string {
  const lines = [
    "Новая заявка с сайта tennis-impuls.ru",
    "",
    `Тип: ${TYPE_LABELS[payload.serviceType] ?? payload.serviceType}`,
    `Группа: ${payload.group}`,
    `Услуга: ${payload.service}`,
  ];

  if (payload.selectedAbonement) {
    lines.push(`Абонемент: ${payload.selectedAbonement}`);
  }
  if (payload.specialist) {
    lines.push(`Специалист: ${payload.specialist}`);
  }
  if (payload.specialistId) {
    lines.push(`ID специалиста: ${payload.specialistId}`);
  }
  lines.push(`Имя: ${payload.name}`, `Телефон: ${payload.phone}`);
  if (payload.date) lines.push(`Дата: ${payload.date}`);
  if (payload.time) lines.push(`Время: ${payload.time}`);
  if (payload.comment?.trim()) {
    lines.push(`Комментарий: ${payload.comment.trim()}`);
  }

  return lines.join("\n");
}

function asTrimmed(value: string | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

/** 8XXXXXXXXXX → 7XXXXXXXXXX; только цифры. */
export function normalizeLeadPhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }
  return digits;
}

/** Первое слово — имя, остальное — фамилия (если есть). */
export function splitLeadName(fullName: string): {
  name: string;
  last_name: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { name: "", last_name: "" };
  if (parts.length === 1) return { name: parts[0], last_name: "" };
  return { name: parts[0], last_name: parts.slice(1).join(" ") };
}

export function toFit1cLead(payload: BookingLeadPayload): Fit1cLeadPayload {
  const { name, last_name } = splitLeadName(payload.name);
  const commentLines = [formatBookingLeadText(payload)];
  const pageUrl = asTrimmed(payload.pageUrl);
  if (pageUrl) {
    commentLines.push("", `URL: ${pageUrl}`);
  }
  const comment = commentLines.join("\n").trim() || "Заявка с сайта tennis-impuls.ru";

  return {
    name,
    last_name,
    phone: normalizeLeadPhone(payload.phone),
    email: asTrimmed(payload.email),
    comment,
    utm_source: asTrimmed(payload.utm_source),
    utm_medium: asTrimmed(payload.utm_medium),
    utm_campaign: asTrimmed(payload.utm_campaign),
    utm_term: asTrimmed(payload.utm_term),
    utm_content: asTrimmed(payload.utm_content),
    ym_cid: asTrimmed(payload.ym_cid),
  };
}
