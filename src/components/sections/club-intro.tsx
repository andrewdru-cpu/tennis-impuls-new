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
import { MediaImage } from "@/components/media/media-image";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

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
      className="overflow-hidden bg-gradient-to-b from-lime-50/80 via-white to-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/60 to-transparent" />

      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-lime/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-forest-800 ring-1 ring-lime/40">
              ЦТТ «Импульс»
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-forest-900 text-balance sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]">
              Современный комплекс для спорта,{" "}
              <span className="text-lime-600">восстановления и отдыха</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lead text-foreground/90">
              <strong className="font-semibold text-forest-900">
                Центр теннисных технологий «Импульс»
              </strong>{" "}
              — многофункциональный спортивный комплекс на территории более 1 га
              у Лосиного Острова. Корты, тренажёрный зал, групповые программы и
              зоны отдыха — всё в одном месте, без лишних поездок по городу.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {locationBadges.map((badge) => (
                <li
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-lime/35 bg-white/90 px-4 py-2 text-sm font-semibold text-forest-800 shadow-soft"
                >
                  <badge.icon className="h-4 w-4 shrink-0 text-lime-600" />
                  {badge.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={0.12 + i * 0.05}>
                <div
                  className={cn(
                    "group flex h-full gap-3.5 rounded-2xl border border-forest-900/8 bg-white p-4 shadow-soft",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:border-lime/45 hover:shadow-glow"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-forest-900",
                      item.accent
                    )}
                  >
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-card-title text-base sm:text-[1.0625rem]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.08} className="relative">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-lime/30 blur-3xl" aria-hidden />
          <MediaImage
            media={media.facilities.aerial}
            ratio="wide"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="shadow-card ring-1 ring-lime/20"
            imageClassName="saturate-[1.12]"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            <MediaImage
              media={media.facilities.indoor}
              ratio="square"
              sizes="160px"
              imageClassName="saturate-[1.1]"
            />
            <MediaImage
              media={media.facilities.outdoor}
              ratio="square"
              sizes="160px"
              imageClassName="saturate-[1.1]"
            />
            <MediaImage
              media={media.facilities.hall}
              ratio="square"
              sizes="160px"
              imageClassName="saturate-[1.1]"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
