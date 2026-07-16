import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { VideoWithSound } from "@/components/video-with-sound";
import { media } from "@/lib/media";

export function PromoVideo() {
  const promo = media.promo;

  return (
    <Section id="promo-video" tone="light" className="overflow-hidden">
      <header className="max-w-3xl">
        <SectionHeading
          eyebrow="Видео"
          title={
            <>
              <span className="text-ctt-red">ЦТТ «Импульс»</span>
              {" — "}
              <span className="text-gradient-purple-lime">спорт и атмосфера</span>
            </>
          }
          description="Посмотрите, как выглядит наш комплекс: корты, залы и инфраструктура для тренировок и отдыха."
        />
      </header>

      <Reveal delay={0.08} className="section-inner">
        <div className="relative mx-auto max-w-5xl">
          <div
            className="pointer-events-none absolute -left-8 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full bg-lime/25 blur-[80px] lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-6 -top-6 hidden h-40 w-40 rounded-full bg-terracotta/12 blur-[70px] sm:block"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-forest-900/10 bg-white p-2 shadow-card ring-1 ring-lime/25 sm:rounded-[2rem] sm:p-3 lg:p-4">
            <VideoWithSound
              src={promo.src}
              poster={promo.poster}
              autoPlay
              loop
              className="aspect-video rounded-[1.25rem] sm:rounded-[1.5rem]"
            >
              <p
                className="pointer-events-none absolute left-4 top-4 z-[5] sm:left-5 sm:top-5 lg:left-6 lg:top-6"
                aria-hidden
              >
                <span
                  className="text-ctt-red font-display text-lg font-extrabold tracking-[0.04em] sm:text-xl lg:text-2xl"
                  style={{
                    textShadow:
                      "0 1px 2px rgba(255,255,255,0.95), 0 2px 12px rgba(255,255,255,0.55), 0 0 24px rgba(255,255,255,0.35)",
                  }}
                >
                  ЦТТ ИМПУЛЬС
                </span>
              </p>
            </VideoWithSound>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
