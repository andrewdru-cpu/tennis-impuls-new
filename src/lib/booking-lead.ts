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
