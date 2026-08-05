import {
  MapPin,
  Layers,
  Dumbbell,
  ParkingCircle,
  Lightbulb,
  Wind,
} from "@/lib/icons";

import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

const highlights = [
  {
    icon: Layers,
    title: "Корты всех форматов",
    text: "Крытый Hard, открытый грунт и падел — всё на одной закрытой территории.",
  },
  {
    icon: Dumbbell,
    title: "Фитнес и восстановление",
    text: "Тренажёрный зал, залы ОФП, танцев и йоги — всё для тренировок и восстановления.",
  },
  {
    icon: Lightbulb,
    title: "Четырёхзонное освещение кортов",
    text: "Профессиональный свет в четырёх режимах — комфортная игра утром, днём и вечером.",
  },
  {
    icon: Wind,
    title: "Система кондиционирования",
    text: "Стабильный микроклимат круглый год — прохладно летом и комфортно зимой.",
  },
];

const locationBadges = [
  { icon: MapPin, label: "В 3 минутах от Москвы" },
  { icon: ParkingCircle, label: "Бесплатная парковка" },
];

export function ClubIntro() {
  return (
    <Section
      id="about"
      className="overflow-x-clip bg-gradient-to-b from-lime-50 via-cream to-white"
    >
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <Reveal>
          <span className="eyebrow rounded-full bg-red-ctt/10 px-4 py-1.5 text-ctt-red ring-1 ring-red-ctt/30 shadow-[0_2px_14px_-4px_rgba(230,57,70,0.35)]">
            ЦТТ «Импульс»
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-full font-display text-display-lg font-bold text-pretty text-forest-800 [overflow-wrap:anywhere]">
            Современный комплекс для{" "}
            <span className="text-gradient-purple-lime box-decoration-clone pb-0.5">
              спорта, восстановления и отдыха
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-body-prose mt-5 max-w-full text-pretty [overflow-wrap:anywhere] sm:text-body-lg sm:leading-[1.75]">
            <strong className="text-ctt-red font-semibold">
              Центр теннисных технологий «Импульс»
            </strong>
            {" — "}
            многофункциональный спортивный комплекс на&nbsp;территории более
            1&nbsp;га у&nbsp;Лосиного Острова. Корты, тренажёрный зал и залы
            ОФП — всё в&nbsp;одном месте, без лишних поездок по&nbsp;городу.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {locationBadges.map((badge) => (
              <li
                key={badge.label}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-sand/40 bg-white px-3 py-2 text-sm font-semibold text-[#1F2E2A] shadow-soft sm:px-4"
              >
                <badge.icon className="h-4 w-4 shrink-0 text-terracotta" />
                <span className="min-w-0 text-pretty [overflow-wrap:anywhere]">
                  {badge.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid-cards mt-8">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={0.12 + i * 0.05} className="min-w-0 h-full">
              <div className="card-feature group h-full min-w-0">
                <span className="icon-wrap shrink-0">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-card-title text-pretty">{item.title}</h3>
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
