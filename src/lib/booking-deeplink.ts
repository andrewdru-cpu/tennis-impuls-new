/**
 * Deep-link: запись к конкретному специалисту из модалки команды.
 * URL: /?specialist=<id>#booking
 */
export const BOOKING_SPECIALIST_EVENT = "impuls:booking-specialist";
export const BOOKING_SPECIALIST_PARAM = "specialist";

export function readSpecialistFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(
    BOOKING_SPECIALIST_PARAM
  );
}

export function openBookingWithSpecialist(specialistId: string) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set(BOOKING_SPECIALIST_PARAM, specialistId);
  url.hash = "booking";
  window.history.pushState({}, "", url.toString());
  window.dispatchEvent(
    new CustomEvent(BOOKING_SPECIALIST_EVENT, {
      detail: { specialistId },
    })
  );
  document.getElementById("booking")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
