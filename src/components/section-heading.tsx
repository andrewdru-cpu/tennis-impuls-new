import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Badge variant={isLight ? "glass" : "lime"}>{eyebrow}</Badge>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]",
            isLight ? "text-white" : "text-forest-900"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg sm:leading-7",
              isLight ? "text-white/75" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
