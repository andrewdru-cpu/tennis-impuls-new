/** Общий тип заявки формы #booking (клиент ↔ API). */
export type BookingLeadPayload = {
  serviceType: "session" | "abonement";
  group: string;
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

export function formatBookingLeadText(payload: BookingLeadPayload): string {
  const lines = [
    "Новая заявка с сайта tennis-impuls.ru",
    "",
    `Тип: ${payload.serviceType === "abonement" ? "Абонемент" : "Запись"}`,
    `Группа: ${payload.group}`,
    `Услуга: ${payload.service}`,
  ];

  if (payload.selectedAbonement) {
    lines.push(`Абонемент: ${payload.selectedAbonement}`);
  }
  if (payload.specialist) {
    lines.push(`Специалист: ${payload.specialist}`);
  }
  lines.push(`Имя: ${payload.name}`, `Телефон: ${payload.phone}`);
  if (payload.date) lines.push(`Дата: ${payload.date}`);
  if (payload.time) lines.push(`Время: ${payload.time}`);
  if (payload.comment?.trim()) {
    lines.push(`Комментарий: ${payload.comment.trim()}`);
  }

  return lines.join("\n");
}

export function buildBookingMailtoHref(payload: BookingLeadPayload): string {
  const subject =
    payload.serviceType === "abonement"
      ? `Заявка на абонемент — ${payload.service}`
      : `Заявка на запись — ${payload.service}`;
  const body = formatBookingLeadText(payload);
  return `mailto:info@tennis-impuls.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
