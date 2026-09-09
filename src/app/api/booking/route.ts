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

function isValidPayload(body: unknown): body is BookingLeadPayload {
  if (!body || typeof body !== "object") return false;
  const p = body as Record<string, unknown>;
  const types = new Set(["personal", "group", "abonement", "massage"]);
  return (
    typeof p.serviceType === "string" &&
    types.has(p.serviceType) &&
    typeof p.name === "string" &&
    p.name.trim().length >= 2 &&
    typeof p.phone === "string" &&
    p.phone.replace(/\D/g, "").length >= 10 &&
    typeof p.service === "string" &&
    typeof p.group === "string"
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
    from: process.env.BOOKING_FROM_EMAIL,
    to: process.env.BOOKING_TO_EMAIL,
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
