import {
  Trees,
  Activity,
  Music,
  Flower2,
  Dumbbell,
  Shield,
  HeartHandshake,
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

/* ── ТЕННИС ── */
const courtSurfaces = [
  {
    label: "Крытые корты",
    surface: "Полумягкий хард",
    detail:
      "Стандартная и детская площадки на полумягком харде — стабильный отскок и комфортная игра круглый год.",
    image: media.services.rental,
  },
  {
    label: "Падел",
    surface: "Полумягкий хард",
    detail:
      "Крытый падел-корт на полумягком харде — самый динамичный ракеточный формат для игры в компании.",
    image: media.services.padel,
  },
  {
    label: "Открытые корты",
    surface: "Грунт (Tennisit)",
    detail:
      "Премиальный грунт Tennisit: мягкий отскок, бережная нагрузка на суставы и естественная игра на свежем воздухе.",
    image: media.services.groundCourt,
    imagePosition: "center 38%",
  },
  {
    label: "Настольный теннис",
    surface: "4 профессиональных стола",
    detail:
      "4 профессиональных стола, разделённых на 4 игровых сектора — играйте парами или компанией.",
    image: media.services.tableTennis,
  },
];

/* ── ФИТНЕС И ДРУГИЕ НАПРАВЛЕНИЯ ── */
const fitnessDirections: {
  icon: LucideIcon;
  title: string;
  text: string;
  image?: MediaImageSource;
  imagePosition?: string;
  imagePlaceholder?: boolean;
}[] = [
  {
    icon: Dumbbell,
    title: "Тренажёрный зал",
    text: "Силовые и кардиотренажёры, свободные веса и функциональные зоны — всё для полноценной тренировки.",
    image: media.services.gymHall,
    imagePosition: "center 45%",
  },
  {
    icon: Music,
    title: "Зал для танцев и йоги",
    text: "Просторная студия с зеркалами и профессиональным покрытием — для танцев, йоги и групповых занятий.",
    image: media.services.yogaStudio,
    imagePosition: "center 42%",
  },
  {
    icon: Shield,
    title: "Каратэ",
    text: "Дисциплина, техника и уверенность в себе — тренировки для детей и взрослых.",
    image: media.services.karate,
    imagePosition: "center 40%",
  },
  {
    icon: Flower2,
    title: "Йога",
    text: "Гибкость, дыхание и глубокое восстановление — практики в светлой студии для любого уровня.",
    image: media.services.danceStudio,
    imagePosition: "center 42%",
  },
  {
    icon: Activity,
    title: "Танцы",
    text: "Пластика, координация и драйв — групповые и индивидуальные занятия под живую энергию музыки.",
    image: media.services.ofpTraining,
    imagePosition: "center 42%",
  },
  {
    icon: HeartHandshake,
    title: "Массаж",
    text: "Лечебный, спортивный и восстановительный массаж — перезагрузка тела после нагрузок.",
    imagePlaceholder: true,
  },
];

/* ── ИНФРАСТРУКТУРА ── */
const infrastructureCards: {
  title: string;
  text: string;
  images?: MediaImageSource[];
  imagePlaceholder?: boolean;
}[] = [
  {
    title: "Комфортные раздевалки",
    text: "Отдельные раздевалки для взрослых и детей — всё необходимое после тренировки.",
    imagePlaceholder: true,
  },
  {
    title: "ВИП раздевалки",
    text: "Премиальные VIP-раздевалки со своей сауной — максимальный комфорт для гостей.",
    imagePlaceholder: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  UI-компоненты                                                             */
/* -------------------------------------------------------------------------- */

function PhotoSoonSlot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[21/9] shrink-0 overflow-hidden bg-gradient-to-br from-lime-50 via-white to-emerald-50/80 ring-1 ring-inset ring-forest-900/[0.06]",
        className
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(180,220,66,0.08)_0%,transparent_45%,rgba(206,88,56,0.06)_100%)]" />
      <span className="absolute inset-0 flex items-center justify-center text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-forest-900/35 sm:text-xs">
        Фото скоро
      </span>
    </div>
  );
}

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
            ? "bg-terracotta/20 text-terracotta-200 ring-1 ring-terracotta/40"
            : "bg-terracotta/12 text-terracotta-600 ring-1 ring-terracotta/30"
        )}
      >
        {eyebrow}
      </span>
      <h3
        className={cn(
          "heading-feature mt-4",
          isDark ? "text-white" : "text-forest-900"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 max-w-[42rem] text-pretty text-body sm:text-body-lg sm:leading-[1.7]",
          isDark ? "text-white/80" : "text-muted-foreground"
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
    <Reveal delay={index * 0.06} className="h-full">
      <div className="group card-media-dark">
        {item.label === "Настольный теннис" ? (
          <div className="relative aspect-[21/9] shrink-0 overflow-hidden">
            <img
              src={item.image?.src}
              alt={item.image?.alt || item.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105 saturate-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
          </div>
        ) : (
          <MediaImage
            media={item.image}
            ratio="photo"
            rounded={false}
            overlay
            position={item.imagePosition ?? "center"}
            className="shrink-0 rounded-none"
            imageClassName="object-cover transition-transform duration-700 ease-premium group-hover:scale-105 saturate-[1.12]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sand/80">
            {item.label}
          </p>
          <p className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">
            {item.surface}
          </p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">
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
  imagePosition,
  imagePlaceholder,
  tone,
  index,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  image?: MediaImageSource;
  imagePosition?: string;
  imagePlaceholder?: boolean;
  tone: "dark" | "light";
  index: number;
}) {
  const isDark = tone === "dark";
  return (
    <Reveal delay={index * 0.04} className="h-full">
      <div
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-premium",
          isDark ? "card-glass-dark hover:-translate-y-1" : "card-media-light"
        )}
      >
        {imagePlaceholder && <PhotoSoonSlot />}
        {image && (
          <div className="relative shrink-0 overflow-hidden">
            <MediaImage
              media={image}
              ratio="wide"
              rounded={false}
              position={imagePosition ?? "center"}
              imageClassName="transition-transform duration-700 ease-premium group-hover:scale-[1.06] saturate-[1.15]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-forest-950/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
          </div>
        )}
        <div className="flex flex-1 gap-4 p-5 sm:p-6">
          <span className={isDark ? "icon-wrap-dark" : "icon-wrap"}>
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h4
              className={cn(
                "font-display text-base font-bold tracking-tight transition-colors duration-300 sm:text-lg",
                isDark
                  ? "text-white"
                  : "text-forest-900 group-hover:text-terracotta"
              )}
            >
              {title}
            </h4>
            <p
              className={cn(
                "mt-2 text-pretty text-sm leading-relaxed",
                isDark ? "text-white/70" : "text-muted-foreground"
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

function InfrastructureImageGrid({ images }: { images: MediaImageSource[] }) {
  return (
    <div
      className={cn(
        "grid shrink-0 gap-0.5",
        images.length === 2 ? "grid-cols-2" : "grid-cols-3"
      )}
    >
      {images.map((image) => (
        <div key={image.src} className="relative overflow-hidden">
          <MediaImage
            media={image}
            ratio="photo"
            rounded={false}
            imageClassName="transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
            sizes={
              images.length === 2
                ? "(max-width: 768px) 50vw, 25vw"
                : "(max-width: 768px) 33vw, 20vw"
            }
          />
        </div>
      ))}
    </div>
  );
}

function InfrastructurePhotoCard({
  item,
  index,
}: {
  item: (typeof infrastructureCards)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05} className="h-full">
      <div className="card-media-light group flex h-full flex-col overflow-hidden p-0">
        {item.imagePlaceholder ? (
          <PhotoSoonSlot />
        ) : item.images && item.images.length > 0 ? (
          <InfrastructureImageGrid images={item.images} />
        ) : null}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h4 className="text-card-title">{item.title}</h4>
          <p className="text-card-body mt-2">{item.text}</p>
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
          eyebrow="Услуги спортивного центра"
          title={
            <>
              Теннис и фитнес —{" "}
              <span className="text-terracotta-600">всё на одной территории</span>
            </>
          }
          description={
            <>
              Корты, залы и зоны восстановления{" "}
              <span className="font-semibold text-terracotta">
                на одной территории
              </span>{" "}
              — играйте, тренируйтесь и восстанавливайтесь без лишних поездок
              по городу.
            </>
          }
        />
      </header>

      <div className="section-inner space-y-8 sm:space-y-10">
        {/* ── БЛОК 1 · ТЕННИС ── */}
        <Reveal>
          <div
            id="services-tennis"
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-800 via-forest-700 to-emerald-800/90 p-6 ring-1 ring-lime/25 sm:p-8 lg:p-10"
          >
            <div
              className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-lime/12 blur-[90px]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />

            <div className="relative space-y-10">
              <BlockHeader
                eyebrow="Направление"
                title={
                  <>
                    <Trees className="mr-2 inline-block h-8 w-8 text-terracotta-300 sm:h-9 sm:w-9" />
                    Теннис
                  </>
                }
                description="Крытые корты на полумягком харде — стандартная и детская площадки, падел, открытые корты на грунте Tennisit и настольный теннис. Всё для игры и тренировок на одной территории."
                tone="dark"
              />

              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-terracotta-300/90">
                  Корты и покрытия
                </h4>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch">
                  {courtSurfaces.map((item, i) => (
                    <SurfaceCard key={item.label} item={item} index={i} />
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

        <div className="flex items-center gap-4 py-2" aria-hidden>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest-900/15 to-transparent" />
          <span className="shrink-0 rounded-full bg-terracotta/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-terracotta-600 ring-1 ring-terracotta/25">
            и
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest-900/15 to-transparent" />
        </div>

        {/* ── БЛОК 2 · ФИТНЕС ── */}
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
                    <Dumbbell className="mr-2 inline-block h-8 w-8 text-terracotta-500 sm:h-9 sm:w-9" />
                    Залы специальной и ОФП подготовки
                  </>
                }
                description="Тренажёрный зал, зал для танцев и занятий йоги"
                tone="light"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fitnessDirections.map((item, i) => (
                  <CompactFeature
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    text={item.text}
                    image={item.image}
                    imagePosition={item.imagePosition}
                    imagePlaceholder={item.imagePlaceholder}
                    tone="light"
                    index={i}
                  />
                ))}
              </div>

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

        {/* ── ИНФРАСТРУКТУРА ── */}
        <Reveal delay={0.05}>
          <div className="pl-3 sm:pl-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="heading-subsection">
                Инфраструктура спортивного центра
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Комфортные и VIP-раздевалки для гостей на всей территории
                комплекса.
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {infrastructureCards.map((item, i) => (
                <InfrastructurePhotoCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
