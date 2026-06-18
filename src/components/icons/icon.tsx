import type { LucideIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

type IconProps = {
  icon: LucideIcon;
  size?: keyof typeof sizeMap;
  className?: string;
};

/** Обёртка Lucide с едиными размерами — меньше дублирования className в JSX. */
export function Icon({ icon: Component, size = "md", className }: IconProps) {
  return (
    <Component
      className={cn(sizeMap[size], "shrink-0", className)}
      aria-hidden
    />
  );
}
