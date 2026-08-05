import { cn } from "@/lib/utils";
import { media as siteMedia, type HeroMedia as HeroMediaType } from "@/lib/media";
import { HeroImage } from "@/components/hero/hero-image";

const OVERLAY_DESKTOP = [
  "linear-gradient(90deg, rgba(10,47,36,0.1) 0%, rgba(10,47,36,0.04) 20%, transparent 58%)",
  "linear-gradient(270deg, transparent 0%, transparent 56%, rgba(10,47,36,0.06) 66%, rgba(10,47,36,0.22) 78%, rgba(5,25,18,0.55) 90%, rgba(5,25,18,0.72) 100%)",
  "linear-gradient(180deg, rgba(10,47,36,0.16) 0%, transparent 10%, transparent 80%, rgba(5,25,18,0.22) 100%)",
  "radial-gradient(ellipse 36% 32% at 96% 82%, rgba(206,88,56,0.1) 0%, transparent 58%)",
].join(", ");

const OVERLAY_MOBILE = [
  "linear-gradient(180deg, rgba(10,47,36,0.22) 0%, transparent 26%, transparent 46%, rgba(10,47,36,0.38) 64%, rgba(5,25,18,0.94) 100%)",
  "linear-gradient(270deg, rgba(10,47,36,0.55) 0%, rgba(10,47,36,0.2) 32%, transparent 58%)",
  "radial-gradient(ellipse 60% 50% at 45% 38%, transparent 0%, rgba(10,47,36,0.1) 68%, rgba(10,47,36,0.28) 100%)",
].join(", ");

function heroImageSrc(media: HeroMediaType): string {
  if (media.kind === "image") return media.src;
  return media.poster;
}

function heroImageAlt(media: HeroMediaType): string {
  if (media.kind === "image") return media.alt;
  return media.mobile?.alt ?? media.alt;
}

/** Фон: solid #0A2F24 всегда. Картинка сверху; ошибка Image не влияет на текст. */
export function HeroMedia({
  media = siteMedia.hero,
  className,
}: {
  media?: HeroMediaType;
  className?: string;
}) {
  const src = heroImageSrc(media);
  const alt = heroImageAlt(media);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      style={{ backgroundColor: "#0A2F24" }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#0A2F24",
          backgroundImage: `url("${src}")`,
          backgroundSize: "cover",
          backgroundPosition: "46% center",
        }}
      />

      <HeroImage src={src} alt={alt} />

      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{ background: OVERLAY_DESKTOP }}
      />
      <div
        className="absolute inset-0 z-[1] md:hidden"
        style={{ background: OVERLAY_MOBILE }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-36"
        style={{
          background:
            "linear-gradient(to top, #0A2F24, rgba(10,47,36,0.6), transparent)",
        }}
      />
    </div>
  );
}
