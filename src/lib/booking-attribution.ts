/** Клиентский сбор UTM / ClientID Метрики для заявки. Не импортировать на сервере. */

export const BOOKING_UTM_STORAGE_KEY = "impuls:utm";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type BookingUtmKey = (typeof UTM_KEYS)[number];

export type BookingAttribution = Record<BookingUtmKey, string> & {
  ym_cid: string;
  pageUrl: string;
};

function emptyUtm(): Record<BookingUtmKey, string> {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  };
}

function readStoredUtm(): Record<BookingUtmKey, string> {
  const base = emptyUtm();
  try {
    const raw = sessionStorage.getItem(BOOKING_UTM_STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<Record<BookingUtmKey, unknown>>;
    for (const key of UTM_KEYS) {
      const value = parsed[key];
      if (typeof value === "string" && value.trim()) {
        base[key] = value.trim();
      }
    }
  } catch {
    /* ignore broken storage */
  }
  return base;
}

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const encoded = name.replace(/([.$?*|{}()[\]/+^])/g, "\\$1");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${encoded}=([^;]*)`)
  );
  if (!match?.[1]) return "";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

/** Сохранить UTM из текущего URL, чтобы они жили после перехода без query. */
export function persistUtmFromLocation(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const next = readStoredUtm();
  let changed = false;
  for (const key of UTM_KEYS) {
    const fromUrl = params.get(key)?.trim() ?? "";
    if (fromUrl) {
      next[key] = fromUrl;
      changed = true;
    }
  }
  if (!changed) return;
  try {
    sessionStorage.setItem(BOOKING_UTM_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode */
  }
}

export function collectBookingAttribution(): BookingAttribution {
  persistUtmFromLocation();
  const stored = readStoredUtm();
  const params =
    typeof window === "undefined"
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);

  const utm = emptyUtm();
  for (const key of UTM_KEYS) {
    utm[key] = params.get(key)?.trim() || stored[key] || "";
  }

  return {
    ...utm,
    ym_cid: readCookie("_ym_uid"),
    pageUrl: typeof window === "undefined" ? "" : window.location.href,
  };
}
