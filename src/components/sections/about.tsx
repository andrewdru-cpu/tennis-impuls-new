import {
  Trees,
  ParkingCircle,
  Building2,
  Dumbbell,
  Layers,
  Sparkles,
  Coffee,
} from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Building2,
    title: "Капитальное здание",
    text: "Крытые корты и инфраструктура в стационарном комплексе — комфорт и безопасность круглый год, в том числе для детей.",
  },
  {
    icon: Layers,
    title: "Корты всех форматов",
    text: "Крытый Hard, открытый грунт и падел на одной территории. Профессиональное покрытие и освещение для игры в любое время.",
  },
  {
    icon: Dumbbell,
    title: "Фитнес и ОФП",
    text: "Тренажёрный зал, залы групповых программ и общей физической подготовки — всё для комплексной спортивной подготовки.",
  },
  {
    icon: Sparkles,
    title: "Разнообразие услуг",
    text: "Теннис, падел, каратэ, танцы, йога и настольный теннис — выберите направление под себя и всю семью.",
  },
  {
    icon: Trees,
    title: "У Лосиного Острова",
    text: "Закрытая территория более 1 га в экологически чистом районе — спорт на свежем воздухе в 20 минутах от Москвы.",
  },
  {
    icon: ParkingCircle,
    title: "Парковка и комфорт",
    text: "Бесплатная парковка, раздевалки с душем, VIP-зона с сауной, кафе и зона отдыха между тренировками.",
  },
];

export function About() {
  return (
    <Section id="about" tone="muted">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              <MediaImage
                media={media.facilities.aerial}
                ratio="wide"
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="shadow-card"
              />
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <MediaImage
                  media={media.facilities.indoor}
                  ratio="square"
                  sizes="180px"
                />
                <MediaImage
                  media={media.facilities.hall}
                  ratio="square"
                  sizes="180px"
                />
                <MediaImage
                  media={media.facilities.outdoor}
                  ratio="square"
                  sizes="180px"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="О клубе"
              title={
                <>
                  Теннис, фитнес и отдых{" "}
                  <span className="text-lime-600">в одном месте</span>
                </>
              }
            />

            <Reveal delay={0.08}>
              <p className="text-lead text-foreground/90">
                <strong className="font-semibold text-forest-900">
                  Центр теннисных технологий «Импульс»
                </strong>{" "}
                — это не только теннисный клуб. Это современный
                многофункциональный комплекс, где на одной территории собраны
                корты, тренажёрный зал, групповые программы и зоны отдыха.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <blockquote className="mt-6 border-l-4 border-lime bg-white/70 px-5 py-4 text-[0.9375rem] italic leading-relaxed text-forest-800 sm:text-base sm:leading-7">
                «Всё необходимое для спорта, восстановления и отдыха — без
                лишних поездок по городу.»
              </blockquote>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 text-card-body sm:text-base sm:leading-7">
                Капитальные крытые корты с системой вентиляции, открытые
                грунтовые площадки, падел, фитнес-центр и дополнительные
                направления — от детских групп до индивидуальных тренировок.
                Профессиональные тренеры, продуманная инфраструктура и
                внимательный сервис для каждого гостя.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={0.1 + i * 0.05}>
                  <div
                    className={cn(
                      "flex h-full gap-4 rounded-2xl border border-forest-900/8 bg-white/60 p-4",
                      "transition-colors duration-300 hover:border-lime/40 hover:bg-white"
                    )}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest-900 text-lime">
                      <f.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-card-title text-base sm:text-[1.0625rem]">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-6">
                        {f.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-forest-900 px-5 py-4 text-white sm:px-6 sm:py-5">
                <Coffee className="h-5 w-5 shrink-0 text-lime" aria-hidden />
                <p className="text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-6">
                  <strong className="font-semibold text-lime">Клубный дом:</strong>{" "}
                  кафе, спорт-бар и зона отдыха — удобно провести время до и
                  после тренировки.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
    </Section>
  );
}
