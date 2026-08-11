import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  formatBookingLeadText,
  type BookingLeadPayload,
} from "@/lib/booking-lead";

export const runtime = "nodejs";

const PHONE_HINT = "+7 (495) 114-68-01";
const SEND_FAIL_MESSAGE = `Не удалось отправить. Позвоните ${PHONE_HINT}`;

function isValidPayload(body: unknown): body is BookingLeadPayload {
  if (!body || typeof body !== "object") return false;
  const p = body as Record<string, unknown>;
  return (
    (p.serviceType === "session" || p.serviceType === "abonement") &&
    typeof p.name === "string" &&
    p.name.trim().length >= 2 &&
    typeof p.phone === "string" &&
    p.phone.replace(/\D/g, "").length >= 10 &&
    typeof p.service === "string" &&
    typeof p.group === "string"
  );
}

/**
 * POST /api/booking — отправка заявки через Resend (email).
 * Требует RESEND_API_KEY. Без ключа → 503.
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
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: SEND_FAIL_MESSAGE },
      { status: 503 }
    );
  }

  const from =
    process.env.BOOKING_FROM_EMAIL?.trim() || "onboarding@resend.dev";
  const to = process.env.BOOKING_TO_EMAIL?.trim() || "info@tennis-impuls.ru";
  const text = formatBookingLeadText(payload);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: "Заявка с сайта ЦТТ Импульс",
      text,
    });

    if (error) {
      console.error("Resend emails.send error:", error);
      return NextResponse.json(
        { error: SEND_FAIL_MESSAGE },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, method: "email" as const });
  } catch (err) {
    console.error("Resend request error:", err);
    return NextResponse.json({ error: SEND_FAIL_MESSAGE }, { status: 502 });
  }
}
