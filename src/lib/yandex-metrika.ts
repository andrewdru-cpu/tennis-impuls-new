export const YANDEX_METRIKA_ID = 111489660;

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
