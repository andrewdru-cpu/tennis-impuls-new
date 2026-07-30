/**
 * Deep-link для формы записи.
 * Специалист: /?specialist=<id>#booking
 * Абонемент:  /?type=abonement&abonement=<id>#booking
 */
export const BOOKING_SPECIALIST_EVENT = "impuls:booking-specialist";
export const BOOKING_SPECIALIST_PARAM = "specialist";

export const BOOKING_ABONEMENT_EVENT = "impuls:booking-abonement";
export const BOOKING_TYPE_PARAM = "type";
export const BOOKING_ABONEMENT_PARAM = "abonement";
export const BOOKING_TYPE_ABONEMENT = "abonement";

export function readSpecialistFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(
    BOOKING_SPECIALIST_PARAM
  );
}

export function readAbonementFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  if (params.get(BOOKING_TYPE_PARAM) !== BOOKING_TYPE_ABONEMENT) return null;
  return params.get(BOOKING_ABONEMENT_PARAM);
}

export function isAbonementBookingInUrl(): boolean {
  if (typeof window === "undefined") return false;
  return (
    new URLSearchParams(window.location.search).get(BOOKING_TYPE_PARAM) ===
    BOOKING_TYPE_ABONEMENT
  );
}

export function openBookingWithSpecialist(specialistId: string) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.delete(BOOKING_TYPE_PARAM);
  url.searchParams.delete(BOOKING_ABONEMENT_PARAM);
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

export function openBookingWithAbonement(abonementId: string) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.delete(BOOKING_SPECIALIST_PARAM);
  url.searchParams.set(BOOKING_TYPE_PARAM, BOOKING_TYPE_ABONEMENT);
  url.searchParams.set(BOOKING_ABONEMENT_PARAM, abonementId);
  url.hash = "booking";
  window.history.pushState({}, "", url.toString());
  window.dispatchEvent(
    new CustomEvent(BOOKING_ABONEMENT_EVENT, {
      detail: { abonementId },
    })
  );
  document.getElementById("booking")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/** Href для серверных ссылок (карточки цен) */
export function bookingAbonementHref(abonementId: string): string {
  return `/?${BOOKING_TYPE_PARAM}=${BOOKING_TYPE_ABONEMENT}&${BOOKING_ABONEMENT_PARAM}=${encodeURIComponent(abonementId)}#booking`;
}
