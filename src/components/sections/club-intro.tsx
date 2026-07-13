import {
  Lightbulb,
  Wind,
  MapPin,
  Layers,
  Dumbbell,
  ParkingCircle,
} from "@/lib/icons";

import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

const highlights = [
  {
    icon: Lightbulb,
    title: "Четырёхуровневое освещение",
    text: "Профессиональный свет на кортах — комфортная игра утром, днём и вечером.",
    accent: "from-lime/30 to-lime/5",
  },
  {
    icon: Wind,
    title: "Система кондиционирования",
    text: "Стабильный микроклимат круглый год — прохладно летом и комфортно зимой.",
    accent: "from-emerald-400/25 to-emerald-50",
  },
  {
    icon: Layers,
    title: "Корты всех форматов",
    text: "Крытый Hard, открытый грунт и падел — всё на одной закрытой территории.",
    accent: "from-lime/25 to-white",
  },
  {
    icon: Dumbbell,
    title: "Фитнес и восстановление",
    text: "Тренажёрный зал, ОФП, раздевалки с душем и зоны отдыха между тренировками.",
    accent: "from-forest-200/40 to-white",
  },
];

const locationBadges = [
  { icon: MapPin, label: "В 3 минутах от Москвы" },
  { icon: ParkingCircle, label: "Бесплатная парковка" },
];

export function ClubIntro() {
  return (
    <Section
      id="about-preview"
      className="overflow-hidden bg-gradient-to-b from-lime-50 via-lime-50/60 to-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/60 to-transparent" />

      <div className="mx-auto max-w-4xl">
        <Reveal>
          <span className="eyebrow rounded-full bg-terracotta/12 px-4 py-1.5 text-terracotta-600 ring-1 ring-terracotta/30 shadow-[0_2px_14px_-4px_rgba(206,88,56,0.4)]">
            ЦТТ «Импульс»
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="heading-section mt-4">
            Современный комплекс для спорта,{" "}
            <span className="text-terracotta-600">восстановления и отдыха</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-body-prose mt-5 sm:text-body-lg sm:leading-[1.75]">
            <strong className="font-semibold text-forest-900">
              Центр теннисных технологий «Импульс»
            </strong>
            {" — "}
            многофункциональный спортивный комплекс на&nbsp;территории более
            1&nbsp;га у&nbsp;Лосиного Острова. Корты, тренажёрный зал, групповые
            программы и&nbsp;зоны отдыха — всё в&nbsp;одном месте, без лишних
            поездок по&nbsp;городу.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {locationBadges.map((badge) => (
              <li
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full border border-sand/40 bg-white px-4 py-2 text-sm font-semibold text-forest-800 shadow-soft"
              >
                <badge.icon className="h-4 w-4 shrink-0 text-terracotta" />
                {badge.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={0.12 + i * 0.05}>
              <div className="card-feature group">
                <span className="icon-wrap">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-card-title">{item.title}</h3>
                  <p className="text-card-body mt-2">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
