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
          <Badge variant={isLight ? "glass" : "terracotta"}>{eyebrow}</Badge>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "heading-section mt-4",
            isLight && "heading-section-light"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 max-w-[42rem] text-pretty text-body sm:text-body-lg sm:leading-[1.7]",
              isLight ? "text-white/88" : "text-bright"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
