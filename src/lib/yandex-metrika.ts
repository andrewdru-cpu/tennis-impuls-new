/** Основной счётчик сайта */
export const YANDEX_METRIKA_ID = 111489660;
/** Второй счётчик (реклама / исторические отчёты Яндекса) */
export const YANDEX_METRIKA_ADS_ID = 46954113;

declare global {
  interface Window {
    ym?: (
      id: number,
      method: string,
      ...args: unknown[]
    ) => void;
  }
}

export {};
