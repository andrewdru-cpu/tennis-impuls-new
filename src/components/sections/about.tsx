import {
  Trees,
  ParkingCircle,
  Lightbulb,
  Wind,
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
    icon: Lightbulb,
    title: "Четырёхуровневое освещение",
    text: "Профессиональный свет на кортах — комфортная игра в любое время суток.",
  },
  {
    icon: Wind,
    title: "Система кондиционирования",
    text: "Стабильный микроклимат круглый год — прохладно летом и комфортно зимой.",
  },
  {
    icon: Layers,
    title: "Корты всех форматов",
    text: "Крытый Hard, открытый грунт и падел на одной территории с профессиональным покрытием.",
  },
  {
    icon: Dumbbell,
    title: "Фитнес и ОФП",
    text: "Тренажёрный зал, залы групповых программ и общей физической подготовки.",
  },
  {
    icon: Sparkles,
    title: "Разнообразие услуг",
    text: "Теннис, падел, каратэ, танцы, йога и настольный теннис — для всей семьи.",
  },
  {
    icon: Trees,
    title: "У Лосиного Острова",
    text: "Закрытая территория более 1 га — в 3 минутах от Москвы и МКАД.",
  },
  {
    icon: ParkingCircle,
    title: "Парковка и комфорт",
    text: "Бесплатная парковка, раздевалки с душем, VIP-зона с сауной и зона отдыха.",
  },
];

export function About() {
  return (
    <Section id="about" tone="muted">
      <div className="mx-auto max-w-4xl">
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
          <p className="text-pretty text-base leading-7 text-foreground/90 sm:text-lg sm:leading-8">
            <strong className="font-semibold text-forest-900">
              Центр теннисных технологий «Импульс»
            </strong>
            {" — "}
            современный многофункциональный комплекс, где на&nbsp;одной
            территории собраны корты, тренажёрный зал, групповые программы
            и&nbsp;зоны отдыха.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <blockquote className="mt-6 border-l-4 border-lime bg-white/70 px-5 py-4 text-[0.9375rem] italic leading-relaxed text-forest-800 sm:text-base sm:leading-7">
            «Всё необходимое для спорта, восстановления и отдыха — без лишних
            поездок по&nbsp;городу.»
          </blockquote>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
            Крытые корты с&nbsp;четырёхуровневым освещением и&nbsp;системой
            кондиционирования, открытые грунтовые площадки, падел, фитнес-центр
            и&nbsp;дополнительные направления — от&nbsp;детских групп
            до&nbsp;индивидуальных тренировок. Профессиональные тренеры,
            продуманная инфраструктура и&nbsp;внимательный сервис для каждого
            гостя.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-8">
          <div className="overflow-hidden rounded-3xl shadow-card">
            <MediaImage
              media={media.facilities.aerial}
              ratio="wide"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <MediaImage
              media={media.facilities.indoor}
              ratio="square"
              sizes="160px"
            />
            <MediaImage
              media={media.facilities.hall}
              ratio="square"
              sizes="160px"
            />
            <MediaImage
              media={media.facilities.outdoor}
              ratio="square"
              sizes="160px"
            />
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={0.1 + i * 0.04}>
              <div className="card-feature group">
                <span className="icon-wrap-solid">
                  <f.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-card-title">{f.title}</h3>
                  <p className="text-card-body mt-2">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-forest-900 to-forest-800 px-5 py-4 text-white shadow-elevated sm:px-6 sm:py-5">
            <Coffee className="h-5 w-5 shrink-0 text-sand" aria-hidden />
            <p className="text-pretty text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-6">
              <strong className="font-semibold text-sand">Клубный дом:</strong>{" "}
              зона отдыха и&nbsp;спорт-бар — удобно провести время до
              и&nbsp;после тренировки.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
