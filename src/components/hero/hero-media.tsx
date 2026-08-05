import { cn } from "@/lib/utils";
import { media as siteMedia, type HeroMedia as HeroMediaType } from "@/lib/media";
import { HeroImage } from "@/components/hero/hero-image";

/**
 * Оверлеи под new-hero.webp:
 * — левая ~58% без затемнения;
 * — мягкий градиент справа под текст.
 */
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

/** Фон Hero: #0A2F24 всегда; CSS url без JS; next/image — усиление. */
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
      className={cn("absolute inset-0 z-0 overflow-hidden bg-[#0A2F24]", className)}
      style={{ backgroundColor: "#0A2F24" }}
    >
      {/* Работает без JS / если Image заблокирован */}
      <div
        className="absolute inset-0 bg-cover bg-[position:46%_center] md:bg-[position:48%_center] lg:bg-center"
        style={{
          backgroundColor: "#0A2F24",
          backgroundImage: `url("${src}")`,
        }}
        aria-hidden
      />

      <HeroImage src={src} alt={alt} />

      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{ background: OVERLAY_DESKTOP }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] md:hidden"
        style={{ background: OVERLAY_MOBILE }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] hidden bg-[radial-gradient(ellipse_100%_90%_at_34%_42%,transparent_0%,rgba(5,25,18,0.14)_100%)] md:block"
        aria-hidden
      />
      <div
        className="absolute -right-16 top-[12%] z-[1] hidden h-[380px] w-[280px] rounded-full bg-terracotta/22 blur-[110px] md:block"
        aria-hidden
      />
      <div
        className="absolute bottom-[16%] right-[2%] z-[1] hidden h-[200px] w-[200px] rounded-full bg-lime/15 blur-[80px] md:block"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-36 bg-gradient-to-t from-[#0A2F24] via-[#0A2F24]/60 to-transparent"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-px bg-gradient-to-r from-sand/20 via-lime/40 to-terracotta/30"
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] bg-grid opacity-[0.04]" aria-hidden />
    </div>
  );
}
