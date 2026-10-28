import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  formatBookingLeadText,
  toFit1cLead,
  type BookingLeadPayload,
} from "@/lib/booking-lead";

export const runtime = "nodejs";

const PHONE_HINT = "+7 (495) 114-68-01";
const SEND_FAIL_MESSAGE = `Не удалось отправить. Позвоните ${PHONE_HINT}`;

/** Лимиты длины полей: защита письма / webhook от мусорных мегабайтных строк. */
const MAX_LEN = {
  name: 120,
  phone: 32,
  short: 200,
  comment: 2000,
  url: 2048,
} as const;

function isShortString(value: unknown, max: number): value is string {
  return typeof value === "string" && value.length <= max;
}

function isOptionalString(value: unknown, max: number): boolean {
  return value === undefined || value === null || isShortString(value, max);
}

function isValidPayload(body: unknown): body is BookingLeadPayload {
  if (!body || typeof body !== "object") return false;
  const p = body as Record<string, unknown>;
  const types = new Set(["personal", "group", "abonement", "massage"]);
  return (
    typeof p.serviceType === "string" &&
    types.has(p.serviceType) &&
    isShortString(p.name, MAX_LEN.name) &&
    p.name.trim().length >= 2 &&
    isShortString(p.phone, MAX_LEN.phone) &&
    p.phone.replace(/\D/g, "").length >= 10 &&
    isShortString(p.service, MAX_LEN.short) &&
    isShortString(p.group, MAX_LEN.short) &&
    isOptionalString(p.specialist, MAX_LEN.short) &&
    isOptionalString(p.specialistId, MAX_LEN.short) &&
    isOptionalString(p.selectedAbonement, MAX_LEN.short) &&
    isOptionalString(p.date, MAX_LEN.short) &&
    isOptionalString(p.time, MAX_LEN.short) &&
    isOptionalString(p.comment, MAX_LEN.comment) &&
    isOptionalString(p.email, MAX_LEN.short) &&
    isOptionalString(p.pageUrl, MAX_LEN.url) &&
    isOptionalString(p.utm_source, MAX_LEN.short) &&
    isOptionalString(p.utm_medium, MAX_LEN.short) &&
    isOptionalString(p.utm_campaign, MAX_LEN.short) &&
    isOptionalString(p.utm_term, MAX_LEN.short) &&
    isOptionalString(p.utm_content, MAX_LEN.short) &&
    isOptionalString(p.ym_cid, MAX_LEN.short) &&
    p.consent === true
  );
}

function failResponse(status: number, err?: unknown) {
  const body: { error: string; debug?: string } = {
    error: SEND_FAIL_MESSAGE,
  };
  if (process.env.NODE_ENV !== "production" && err != null) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" &&
            err !== null &&
            "message" in err &&
            typeof (err as { message: unknown }).message === "string"
          ? (err as { message: string }).message
          : String(err);
    body.debug = message;
  }
  return NextResponse.json(body, { status });
}

function webhookHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return "(invalid-url)";
  }
}

async function postFit1cLead(
  webhookUrl: string,
  payload: BookingLeadPayload
): Promise<{ ok: boolean; emailNote: string }> {
  const host = webhookHost(webhookUrl);
  try {
    const lead = toFit1cLead(payload);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    const bodySnippet = (await response.text()).slice(0, 300);
    console.error("[booking] webhook", {
      host,
      status: response.status,
      statusText: response.statusText,
      body: bodySnippet,
    });
    if (!response.ok) {
      const statusLine = `${response.status} ${response.statusText}`.trim();
      return {
        ok: false,
        emailNote: `1С webhook: ошибка HTTP ${statusLine}`,
      };
    }
    return { ok: true, emailNote: "" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[booking] 1c webhook error", { host, message });
    return { ok: false, emailNote: "1С webhook: ошибка сети/таймаут" };
  }
}

/**
 * POST /api/booking — заявка: Resend (обязательный канал) + webhook 1С (best-effort).
 * Требует RESEND_API_KEY. Без ключа → 503. URL webhook клиенту не отдаём.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.BOOKING_FROM_EMAIL?.trim() || "onboarding@resend.dev";
  const to = process.env.BOOKING_TO_EMAIL?.trim() || "info@tennis-impuls.ru";
  const webhookUrl = process.env.FIT1C_LEAD_WEBHOOK_URL?.trim();

  console.error("[booking]", {
    hasKey: Boolean(apiKey),
    hasWebhook: Boolean(webhookUrl),
    hasCustomFrom: Boolean(process.env.BOOKING_FROM_EMAIL?.trim()),
    hasCustomTo: Boolean(process.env.BOOKING_TO_EMAIL?.trim()),
  });

  if (!apiKey) {
    console.error("[booking] RESEND_API_KEY is not set");
    return failResponse(503, new Error("RESEND_API_KEY is not set"));
  }

  let webhookNote = "";
  if (!webhookUrl) {
    console.error("[booking] webhook skipped: env empty");
    webhookNote = "1С webhook: не настроен (нет env)";
  } else {
    const result = await postFit1cLead(webhookUrl, payload);
    webhookNote = result.emailNote;
  }

  const text = [formatBookingLeadText(payload), webhookNote]
    .filter((line) => line.trim())
    .join("\n\n");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: "Заявка с сайта ЦТТ Импульс",
      text,
    });

    if (error) {
      console.error("[booking] resend error", error);
      return failResponse(502, error);
    }

    console.error("[booking] sent", { id: data?.id ?? null });
    return NextResponse.json({ ok: true, method: "email" as const });
  } catch (err) {
    console.error("[booking] resend error", err);
    return failResponse(502, err);
  }
}
