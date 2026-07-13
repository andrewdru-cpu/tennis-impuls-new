import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  /** Показать текстовый wordmark рядом с эмблемой (по умолчанию true) */
  showWordmark?: boolean;
  /** Компактный вид для узкой шапки на мобильных */
  compact?: boolean;
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
  compact = false,
}: LogoProps) {
  const isLight = variant === "light";
  return (
    <div className={cn("flex min-w-0 items-center gap-2 sm:gap-2.5", className)}>
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5 sm:h-11 sm:w-11">
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
        <div className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              "truncate font-display text-base font-extrabold tracking-tight sm:text-lg",
              isLight ? "text-terracotta-300" : "text-terracotta-500"
            )}
          >
            ЦТТ Импульс
          </span>
          <span
            className={cn(
              "truncate text-[10px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.26em]",
              compact && "hidden min-[400px]:block",
              isLight ? "text-white/70" : "text-forest-700"
            )}
          >
            Центр теннисных технологий
          </span>
        </div>
      )}
    </div>
  );
}
