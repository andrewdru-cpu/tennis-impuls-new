import { Trees, ParkingCircle, Layers, Coffee } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { media } from "@/lib/media";

const features = [
  {
    icon: Trees,
    title: "У Лосиного Острова",
    text: "Спорт и природа национального парка — 20 минут от Москвы.",
  },
  {
    icon: Layers,
    title: "Крытые и грунтовые корты",
    text: "Крытый hard круглый год и открытый грунт в сезон.",
  },
  {
    icon: ParkingCircle,
    title: "Бесплатная парковка",
    text: "Собственная парковка для всех гостей и клиентов клуба.",
  },
  {
    icon: Coffee,
    title: "Клубный дом и кафе",
    text: "Раздевалки, душ и зона отдыха после игры.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-secondary py-24 lg:py-32">
      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              {/* Establishing — весь комплекс у леса */}
              <MediaImage
                media={media.facilities.aerial}
                ratio="wide"
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="shadow-card"
              />
              {/* Мини-галерея: крытые корты · манеж · грунт */}
              <div className="grid grid-cols-3 gap-4">
                <MediaImage media={media.facilities.indoor} ratio="square" sizes="180px" />
                <MediaImage media={media.facilities.hall} ratio="square" sizes="180px" />
                <MediaImage media={media.facilities.outdoor} ratio="square" sizes="180px" />
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="О клубе"
              title="Весь теннис — на одной территории"
              description="Крытые корты, открытый грунт, манеж, фитнес-зал и клубный дом в окружении леса."
            />

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.07}>
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest-900 text-lime">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-forest-900">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {f.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
