import { NextResponse } from "next/server";

import {
  buildBookingMailtoHref,
  formatBookingLeadText,
  type BookingLeadPayload,
} from "@/lib/booking-lead";

export const runtime = "nodejs";

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
 * POST /api/booking
 * — если TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID → сообщение в Telegram;
 * — иначе → клиенту отдаём mailto: на info@tennis-impuls.ru.
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

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (token && chatId) {
    const text = formatBookingLeadText(payload);
    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            disable_web_page_preview: true,
          }),
        }
      );

      if (!tgRes.ok) {
        const errText = await tgRes.text().catch(() => "");
        console.error("Telegram sendMessage failed:", tgRes.status, errText);
        return NextResponse.json(
          { error: "Telegram delivery failed" },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, method: "telegram" as const });
    } catch (err) {
      console.error("Telegram request error:", err);
      return NextResponse.json(
        { error: "Telegram delivery failed" },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    method: "mailto" as const,
    href: buildBookingMailtoHref(payload),
  });
}
