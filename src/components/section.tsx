import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** Фоновые декорации вне container-wide (сетка, блюры) */
  before?: React.ReactNode;
  /** light = белый, muted = secondary, dark = forest-950 */
  tone?: "light" | "muted" | "dark";
};

export function Section({
  id,
  children,
  className,
  innerClassName,
  before,
  tone = "light",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section relative",
        tone === "light" && "bg-white",
        tone === "muted" && "bg-secondary",
        tone === "dark" && "bg-forest-950 text-white",
        className
      )}
    >
      {before}
      <div className={cn("container-wide relative", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
