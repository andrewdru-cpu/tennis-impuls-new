import {
  Target,
  Trees,
  Baby,
  Layers,
  Activity,
  Table2,
  ShowerHead,
  Crown,
  Armchair,
  ParkingCircle,
  UserRound,
  Users,
  Music,
  Flower2,
  Dumbbell,
  Shield,
  Lightbulb,
  Sun,
  ArrowUpRight,
  type LucideIcon,
} from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { Button } from "@/components/ui/button";
import { media, type MediaImageSource } from "@/lib/media";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Данные                                                                    */
/* -------------------------------------------------------------------------- */

const courtSurfaces = [
  {
    label: "Открытые и крытые корты",
    surface: "Полумягкий хард",
    detail:
      "Профессиональное покрытие на открытых и крытых площадках — комфортная игра в любую погоду",
    image: media.services.rental,
  },
  {
    label: "Грунтовые корты",
    surface: "Tennisit",
    detail:
      "Премиальное грунтовое покрытие Tennisit — мягкий отскок и естественная игра на свежем воздухе",
    image: media.facilities.outdoor,
  },
  {
    label: "Падел-корт",
    surface: "Полумягкий хард",
    detail: "Современный формат на крытом полумягком харде",
    image: media.services.padel,
  },
];

const courtTypes: {
  icon: LucideIcon;
  title: string;
  text: string;
  image?: MediaImageSource;
}[] = [
  {
    icon: Layers,
    title: "Большие корты",
    text: "Полноразмерные площадки для взрослых игроков и соревнований",
  },
  {
    icon: Baby,
    title: "Детские корты",
    text: "Адаптированные корты для юных спортсменов — безопасно и удобно",
    image: media.kids.training1,
  },
  {
    icon: Target,
    title: "Падел-корт",
    text: "Отдельные площадки с покрытием полумягкий хард",
  },
];

const gameZoneItems: {
  icon: LucideIcon;
  title: string;
  text: string;
  image?: MediaImageSource;
  highlight?: string;
}[] = [
  {
    icon: Target,
    title: "Теннисный корт",
    text: "Полумягкий хард — большие и детские корты для тренировок и игры",
    image: media.services.rental,
  },
  {
    icon: Layers,
    title: "Падел",
    text: "Современный ракеточный формат на крытом полумягком харде",
    image: media.services.padel,
  },
  {
    icon: Activity,
    title: "Зона ОФП",
    text: "Специальная физическая подготовка — отдельные залы для функциональных и спецпрограмм",
    image: media.services.ofp,
    highlight: "Тренажёрный зал и зал спецпрограмм",
  },
  {
    icon: Table2,
    title: "Настольный теннис",
    text: "4 профессиональных стола, разделённых на 4 игровых сектора — играйте парами или компанией",
    image: media.services.activities,
  },
  {
    icon: ShowerHead,
    title: "Комфортные раздевалки",
    text: "Отдельные раздевалки для взрослых и детей — всё необходимое после тренировки",
  },
  {
    icon: Crown,
    title: "VIP-раздевалки",
    text: "Премиальные VIP-раздевалки со своей сауной — максимальный комфорт для гостей",
  },
  {
    icon: Armchair,
    title: "Зона отдыха",
    text: "Уютное пространство для отдыха между тренировками и после игры",
  },
  {
    icon: ParkingCircle,
    title: "Бесплатная парковка",
    text: "Собственная парковка для всех гостей клуба на время визита",
  },
];

const fitnessTraining = [
  {
    icon: UserRound,
    title: "Индивидуальные тренировки",
    text: "Персональная программа с тренером — техника, сила, восстановление. Максимум внимания и прогресса за каждое занятие.",
    image: media.services.individual,
    featured: true,
  },
  {
    icon: Users,
    title: "Групповые тренировки",
    text: "Занятия в мини-группах — энергия команды и поддержка тренера. Подходит для любого уровня подготовки.",
    image: media.services.group,
    featured: true,
  },
];

const fitnessDirections = [
  {
    icon: Music,
    title: "Танцевальная студия",
    text: "Групповые и индивидуальные занятия — пластика, координация и драйв",
    image: media.services.activities,
  },
  {
    icon: Flower2,
    title: "Студия йоги",
    text: "Восстановление, гибкость и баланс — практики для тела и дыхания",
    image: media.gallery[3],
  },
  {
    icon: Dumbbell,
    title: "Тренажёрный зал",
    text: "Силовая и функциональная подготовка на профессиональном оборудовании",
    image: media.services.fitness,
  },
  {
    icon: Activity,
    title: "Залы ОФП",
    text: "Общая физическая подготовка — станки, зеркала, инвентарь для любого уровня",
    image: media.services.ofp,
  },
  {
    icon: Shield,
    title: "Секция каратэ",
    text: "Тренировки для детей и взрослых — дисциплина, техника и уверенность",
    image: media.services.karate,
  },
];

/* -------------------------------------------------------------------------- */
/*  UI-компоненты                                                             */
/* -------------------------------------------------------------------------- */

function BlockHeader({
  eyebrow,
  title,
  description,
  tone,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  tone: "dark" | "light";
}) {
  const isDark = tone === "dark";
  return (
    <div className="max-w-3xl">
      <span
        className={cn(
          "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]",
          isDark
            ? "bg-lime/20 text-lime ring-1 ring-lime/35"
            : "bg-lime/30 text-forest-800 ring-1 ring-lime/50"
        )}
      >
        {eyebrow}
      </span>
      <h3
        className={cn(
          "mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
          isDark ? "text-white" : "text-forest-900"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 text-base leading-relaxed sm:text-lg sm:leading-7",
          isDark ? "text-white/75" : "text-muted-foreground"
        )}
      >
        {description}
      </p>
    </div>
  );
}

function SurfaceCard({
  item,
  index,
}: {
  item: (typeof courtSurfaces)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-lime/40 hover:bg-white/10">
        <MediaImage
          media={item.image}
          ratio="photo"
          rounded={false}
          overlay
          imageClassName="group-hover:scale-105 saturate-[1.12]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-lime/80">
            {item.label}
          </p>
          <p className="mt-1 font-display text-lg font-bold text-white">
            {item.surface}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            {item.detail}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function CompactFeature({
  icon: Icon,
  title,
  text,
  image,
  highlight,
  tone,
  index,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  image?: MediaImageSource;
  highlight?: string;
  tone: "dark" | "light";
  index: number;
}) {
  const isDark = tone === "dark";
  return (
    <Reveal delay={index * 0.04}>
      <div
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow",
          isDark
            ? "border-white/10 bg-white/[0.06] hover:border-lime/35"
            : "border-forest-900/10 bg-white hover:border-lime/45"
        )}
      >
        {image && (
          <MediaImage
            media={image}
            ratio="wide"
            rounded={false}
            imageClassName="group-hover:scale-105 saturate-[1.1]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="flex flex-1 gap-3.5 p-4 sm:p-5">
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              isDark
                ? "bg-lime/20 text-lime ring-1 ring-lime/30"
                : "bg-gradient-to-br from-lime/30 to-lime/10 text-forest-900"
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h4
              className={cn(
                "font-display text-base font-semibold sm:text-lg",
                isDark ? "text-white" : "text-forest-900"
              )}
            >
              {title}
            </h4>
            {highlight && (
              <p className="mt-1 text-xs font-semibold text-lime sm:text-sm">
                {highlight}
              </p>
            )}
            <p
              className={cn(
                "mt-1.5 text-sm leading-relaxed",
                isDark ? "text-white/65" : "text-muted-foreground"
              )}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function TrainingCard({
  item,
  index,
}: {
  item: (typeof fitnessTraining)[number];
  index: number;
}) {
  const Icon = item.icon;
  return (
    <Reveal delay={index * 0.08}>
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-lime/30 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-lime/60 hover:shadow-glow">
        <MediaImage
          media={item.image}
          ratio="photo"
          rounded={false}
          overlay
          imageClassName="group-hover:scale-105 saturate-[1.12]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/25 text-forest-900 ring-1 ring-lime/40">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <h4 className="mt-4 text-card-title">{item.title}</h4>
          <p className="mt-2 flex-1 text-card-body">{item.text}</p>
          <a
            href="#booking"
            className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-forest-900 transition-colors group-hover:text-lime-600"
          >
            Записаться
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Секция                                                                    */
/* -------------------------------------------------------------------------- */

export function Services() {
  return (
    <Section id="services" className="overflow-hidden">
      <header className="max-w-3xl">
        <SectionHeading
          eyebrow="Услуги клуба"
          title={
            <>
              Теннис и фитнес —{" "}
              <span className="text-lime-600">всё на одной территории</span>
            </>
          }
          description="Два направления комплекса: профессиональные корты и игровая инфраструктура — плюс фитнес, групповые программы и восстановление."
        />
      </header>

      <div className="section-inner space-y-8 sm:space-y-10">
        {/* ── БЛОК ТЕННИС ── */}
        <Reveal>
          <div
            id="services-tennis"
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 p-6 ring-1 ring-lime/20 sm:p-8 lg:p-10"
          >
            <div
              className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-lime/15 blur-[90px]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />

            <div className="relative space-y-10">
              <BlockHeader
                eyebrow="Направление"
                title={
                  <>
                    <Trees className="mr-2 inline-block h-8 w-8 text-lime sm:h-9 sm:w-9" />
                    Теннис
                  </>
                }
                description="Открытые и крытые корты на полумягком харде, грунт Tennisit, большие и детские площадки, падел — всё для игры и тренировок на одной территории."
                tone="dark"
              />

              {/* Покрытия */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-lime/80">
                  Покрытия кортов
                </h4>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {courtSurfaces.map((item, i) => (
                    <SurfaceCard key={item.label} item={item} index={i} />
                  ))}
                </div>
              </div>

              {/* Типы кортов */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-lime/80">
                  Типы площадок
                </h4>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {courtTypes.map((item, i) => (
                    <Reveal key={item.title} delay={0.1 + i * 0.05}>
                      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] transition-colors hover:border-lime/35">
                        {item.image && (
                          <MediaImage
                            media={item.image}
                            ratio="wide"
                            rounded={false}
                            imageClassName="group-hover:scale-105 saturate-[1.1]"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        )}
                        <div className="flex flex-1 items-start gap-3 p-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/20 text-lime">
                            <item.icon className="h-5 w-5" aria-hidden />
                          </span>
                          <div>
                            <p className="font-semibold text-white">{item.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-white/60">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Игровая зона */}
              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <h4 className="font-display text-xl font-bold text-white sm:text-2xl">
                    Игровая зона
                  </h4>
                  <p className="max-w-md text-sm text-white/60">
                    Инфраструктура для игры, подготовки и комфортного отдыха на
                    территории комплекса
                  </p>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gameZoneItems.map((item, i) => (
                    <CompactFeature
                      key={item.title}
                      {...item}
                      tone="dark"
                      index={i}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-start">
                <Button asChild variant="primary" size="lg">
                  <a href="#booking">
                    Забронировать корт
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Разделитель между направлениями */}
        <div className="flex items-center gap-4 py-2" aria-hidden>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest-900/15 to-transparent" />
          <span className="shrink-0 rounded-full bg-lime/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-forest-800">
            и
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest-900/15 to-transparent" />
        </div>

        {/* ── БЛОК ФИТНЕС ── */}
        <Reveal delay={0.05}>
          <div
            id="services-fitness"
            className="relative overflow-hidden rounded-[2rem] border-2 border-lime/30 bg-gradient-to-br from-lime-50 via-white to-emerald-50/80 p-6 shadow-soft sm:p-8 lg:p-10"
          >
            <div
              className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-lime/25 blur-[80px]"
              aria-hidden
            />

            <div className="relative space-y-10">
              <BlockHeader
                eyebrow="Направление"
                title={
                  <>
                    <Dumbbell className="mr-2 inline-block h-8 w-8 text-lime-600 sm:h-9 sm:w-9" />
                    Фитнес
                  </>
                }
                description="Индивидуальные и групповые тренировки, танцы, йога, тренажёрный зал, ОФП и секция каратэ — полный спектр для здоровья и формы."
                tone="light"
              />

              {/* Индивидуальные → групповые */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-forest-700">
                  Форматы тренировок
                </h4>
                <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {fitnessTraining.map((item, i) => (
                    <TrainingCard key={item.title} item={item} index={i} />
                  ))}
                </div>
              </div>

              {/* Направления */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-forest-700">
                  Направления
                </h4>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {fitnessDirections.map((item, i) => (
                    <CompactFeature
                      key={item.title}
                      icon={item.icon}
                      title={item.title}
                      text={item.text}
                      image={item.image}
                      tone="light"
                      index={i}
                    />
                  ))}
                </div>
              </div>

              {/* Освещение */}
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-4 rounded-2xl border border-lime/40 bg-gradient-to-r from-lime/20 via-white to-lime/10 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                  <div className="flex gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime/30 text-forest-900">
                      <Sun className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-lime">
                      <Lightbulb className="h-6 w-6" aria-hidden />
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-forest-900">
                      Профессиональное освещение
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-6">
                      Естественный свет и искусственное освещение в{" "}
                      <strong className="font-semibold text-forest-900">
                        четырёх разных режимах
                      </strong>{" "}
                      — комфортные тренировки утром, днём и вечером в любое
                      время года.
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="flex justify-start">
                <Button asChild variant="dark" size="lg">
                  <a href="#booking">
                    Записаться на тренировку
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
