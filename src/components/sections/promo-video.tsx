import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { VideoWithSound } from "@/components/video-with-sound";

const PROMO_VIDEO = {
  src: "/videos/impuls-promo.mp4",
  poster: "/images/videos/impuls-promo-poster.jpg",
} as const;

export function PromoVideo() {
  return (
    <Section id="promo-video" tone="light" className="overflow-hidden">
      <header className="max-w-3xl">
        <SectionHeading
          eyebrow="Видео"
          title={
            <>
              ЦТТ «Импульс» —{" "}
              <span className="text-terracotta-600">спорт и атмосфера</span>
            </>
          }
          description="Посмотрите, как выглядит наш комплекс: корты, залы и инфраструктура для тренировок и отдыха."
        />
      </header>

      <Reveal delay={0.08} className="section-inner">
        <div className="relative mx-auto max-w-5xl">
          <div
            className="pointer-events-none absolute -left-8 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full bg-lime/20 blur-[80px] lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-6 -top-6 hidden h-40 w-40 rounded-full bg-terracotta/15 blur-[70px] sm:block"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-forest-900/10 bg-white p-2 shadow-card ring-1 ring-lime/20 sm:rounded-[2rem] sm:p-3 lg:p-4">
            <VideoWithSound
              src={PROMO_VIDEO.src}
              poster={PROMO_VIDEO.poster}
              className="aspect-video rounded-[1.25rem] sm:rounded-[1.5rem]"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
