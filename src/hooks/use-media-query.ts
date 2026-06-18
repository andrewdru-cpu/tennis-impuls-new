"use client";

import { useEffect, useState } from "react";

/**
 * Подписка на CSS media query. До гидратации возвращает `null` —
 * удобно для mobile-first (не грузить видео до проверки viewport).
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
