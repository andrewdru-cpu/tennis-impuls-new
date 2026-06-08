import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  /** Показать текстовый wordmark рядом с эмблемой (по умолчанию да) */
  showWordmark?: boolean;
}

/**
 * 👉 Логотип клуба. Варианты лежат в /public/logo:
 *    - logo-full.png — полная круглая эмблема (шапка, футер)
 *    - logo-mark.png — упрощённая марка (мяч + ракетки) для мелких мест
 *    - logo-mono.png — монохромная версия
 *    Фавиконки: src/app/icon.png и src/app/apple-icon.png
 */
export function Logo({
  className,
  variant = "dark",
  showWordmark = true,
}: LogoProps) {
  const isLight = variant === "light";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5">
        <Image
          src="/logo/logo-full.png"
          alt="Эмблема ЦТТ Импульс"
          fill
          sizes="44px"
          className="object-contain"
          priority
        />
      </span>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-lg font-extrabold tracking-tight",
              isLight ? "text-white" : "text-forest-900"
            )}
          >
            ЦТТ Импульс
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.26em]",
              isLight ? "text-lime" : "text-lime-600"
            )}
          >
            Центр теннисных технологий
          </span>
        </div>
      )}
    </div>
  );
}
