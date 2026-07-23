import {
  Trees,
  Activity,
  Music,
  Flower2,
  Dumbbell,
  Shield,
  ArrowUpRight,
  Users,
  ShoppingBag,
  type LucideIcon,
} from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { MassageBlock } from "@/components/services/massage-block";
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
  portraitCrop?: boolean;
}[] = [
  {
    icon: Dumbbell,
    title: "Тренажёрный зал",
    text: "Силовые и кардиотренажёры, свободные веса и функциональные зоны — всё для полноценной тренировки.",
    image: media.services.gymHall,
    imagePosition: "center 45%",
  },
  {
    icon: Activity,
    title: "Зал специальной подготовки",
    text: "Функциональный зал для ОФП и специальной подготовки — сила, выносливость и работа над формой.",
    imagePlaceholder: true,
  },
  {
    icon: Users,
    title: "Групповые программы",
    text: "Занятия в группе под руководством тренера — энергия команды, поддержка и стабильный прогресс.",
    image: media.services.groupPrograms,
    imagePosition: "center",
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
    image: media.services.yoga,
    imagePosition: "center",
  },
  {
    icon: Music,
    title: "Танцы",
    text: "Пластика, координация и драйв — групповые и индивидуальные занятия под живую энергию музыки.",
    imagePlaceholder: true,
  },
];

/* ── ИНФРАСТРУКТУРА ── */
const lockerCards: {
  title: string;
  text: string;
  image: MediaImageSource;
}[] = [
  {
    title: "Мужская раздевалка",
    text: "Удобные шкафчики, душевые и всё необходимое после тренировки — комфорт без очередей.",
    image: media.services.lockerMen,
  },
  {
    title: "Женская раздевалка",
    text: "Отдельная зона с шкафчиками и душевыми — чисто, спокойно и удобно после занятий.",
    image: media.services.lockerWomen,
  },
];

const vipLockers = {
  title: "VIP-раздевалки с сауной",
  text: "Премиальные VIP-раздевалки со своей сауной — максимальный комфорт после тренировок.",
  images: [media.services.vipLocker1, media.services.vipSauna1] as MediaImageSource[],
};

const sportsShop = {
  title: "Спортивный магазин",
  text: "На территории ЦТТ «Импульс» работает спортивный магазин. Здесь можно купить и взять в аренду инвентарь для всех направлений центра: большого тенниса, падела, настольного тенниса, фитнеса, йоги, танцев и других тренировок.",
  image: media.services.sportShop,
};

/* -------------------------------------------------------------------------- */
/*  UI-компоненты                                                             */
/* -------------------------------------------------------------------------- */

function PhotoSoonSlot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[21/9] w-full shrink-0 overflow-hidden bg-gradient-to-br from-lime-50 via-white to-emerald-50/80 ring-1 ring-inset ring-forest-900/[0.06]",
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
  titleClassName,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  tone: "dark" | "light";
  titleClassName?: string;
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
          titleClassName
            ? titleClassName
            : isDark
              ? "text-white drop-shadow-sm"
              : "text-forest-800"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 max-w-[42rem] text-pretty text-body sm:text-body-lg sm:leading-[1.7]",
          isDark ? "text-white/85" : "text-bright"
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
          <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
  portraitCrop,
  tone,
  index,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  image?: MediaImageSource;
  imagePosition?: string;
  imagePlaceholder?: boolean;
  portraitCrop?: boolean;
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
          <div className="relative w-full shrink-0 overflow-hidden">
            <MediaImage
              media={image}
              ratio="wide"
              fit="cover"
              rounded={false}
              position={
                imagePosition ?? (portraitCrop ? "center 18%" : "center")
              }
              imageClassName={cn(
                "object-cover transition-transform duration-700 ease-premium",
                portraitCrop
                  ? "object-[center_18%] group-hover:scale-[1.03] saturate-[1.05]"
                  : "group-hover:scale-[1.06] saturate-[1.15]"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-forest-950/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
          </div>
        )}
        <div className="flex min-h-0 flex-1 gap-4 p-5 sm:p-6">
          <span className={isDark ? "icon-wrap-dark" : "icon-wrap"}>
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h4
              className={cn(
                "font-display text-base font-bold tracking-tight transition-colors duration-300 sm:text-lg",
                isDark
                  ? "text-white"
                  : "text-forest-800 group-hover:text-terracotta"
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

function VipPhotoGrid({ images }: { images: MediaImageSource[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 sm:gap-2.5 sm:p-3 lg:gap-3 lg:p-3.5">
      {images.map((image) => (
        <div
          key={image.src}
          className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-[#C45C5C]/10 sm:rounded-2xl"
        >
          <MediaImage
            media={image}
            ratio="auto"
            fit="cover"
            position="center"
            rounded={false}
            className="absolute inset-0 h-full w-full !rounded-none"
            imageClassName="object-cover object-center transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 28vw"
          />
        </div>
      ))}
    </div>
  );
}

function LockerCard({
  item,
  index,
}: {
  item: (typeof lockerCards)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05} className="h-full">
      <article className="card-infra group">
        <MediaImage
          media={item.image}
          ratio="photo"
          fit="cover"
          position="center"
          rounded={false}
          imageClassName="object-cover object-center transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h4 className="font-display text-lg font-semibold tracking-tight text-forest-800 sm:text-xl">
            {item.title}
          </h4>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-[#1F2E2A]/62 sm:text-[0.9375rem] sm:leading-[1.65]">
            {item.text}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

function VipLockersCard() {
  return (
    <Reveal delay={0.1}>
      <article className="card-infra group">
        <div className="flex flex-col px-5 pb-3 pt-5 sm:px-6 sm:pb-4 sm:pt-6">
          <div className="mb-2.5">
            <span className="inline-flex items-center rounded-full bg-[#C45C5C]/10 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-[#C45C5C] ring-1 ring-[#C45C5C]/20">
              Premium
            </span>
          </div>
          <h4 className="font-display text-display-sm font-semibold text-gradient-deep-salmon">
            {vipLockers.title}
          </h4>
          <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-[#1F2E2A]/62 sm:text-[0.9375rem] sm:leading-[1.65]">
            {vipLockers.text}
          </p>
        </div>
        <VipPhotoGrid images={vipLockers.images} />
      </article>
    </Reveal>
  );
}

function SportsShopBlock() {
  return (
    <Reveal delay={0.14}>
      <article className="card-infra group overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex flex-col justify-center px-5 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="icon-wrap">
                <ShoppingBag className="h-5 w-5" aria-hidden />
              </span>
              <h4 className="font-display text-display-sm font-semibold text-forest-800">
                {sportsShop.title}
              </h4>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-[#1F2E2A]/62 sm:text-[0.9375rem] sm:leading-[1.7]">
              {sportsShop.text}
            </p>
          </div>
          <div className="relative aspect-[16/10] min-h-[200px] overflow-hidden lg:aspect-auto lg:min-h-full">
            <MediaImage
              media={sportsShop.image}
              ratio="auto"
              fit="cover"
              position="center"
              rounded={false}
              className="absolute inset-0 h-full w-full !rounded-none"
              imageClassName="object-cover object-center transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </article>
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
              <span className="text-gradient-purple-lime">Теннис и фитнес</span>
              <span className="text-terracotta-600">
                {" "}
                — всё на одной территории
              </span>
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
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-800 via-forest-700 to-emerald-900/90 p-6 ring-1 ring-lime/30 sm:p-8 lg:p-10"
          >
            <div
              className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-lime/18 blur-[90px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-terracotta/15 blur-[80px]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />

            <div className="relative space-y-10">
              <BlockHeader
                eyebrow="Направление"
                title={
                  <>
                    <Trees className="mr-2 inline-block h-8 w-8 text-lime sm:h-9 sm:w-9" />
                    <span className="text-white">Теннис</span>
                  </>
                }
                description="Крытые корты на полумягком харде — стандартная и детская площадки, падел, открытые корты на грунте Tennisit и настольный теннис. Всё для игры и тренировок на одной территории."
                tone="dark"
              />

              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-terracotta-300/90">
                  Корты и покрытия
                </h4>
                <div className="mt-4 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
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
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest-900/12 to-transparent" />
          <span className="shrink-0 rounded-full bg-terracotta/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-terracotta-600 ring-1 ring-terracotta/25">
            и
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest-900/12 to-transparent" />
        </div>

        {/* ── БЛОК 2 · ФИТНЕС ── */}
        <Reveal delay={0.05}>
          <div
            id="services-fitness"
            className="relative overflow-hidden rounded-[2rem] border-2 border-lime/35 bg-gradient-to-br from-lime-50 via-white to-cream p-6 shadow-soft sm:p-8 lg:p-10"
          >
            <div
              className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-lime/25 blur-[80px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-12 top-0 h-48 w-48 rounded-full bg-terracotta/10 blur-[70px]"
              aria-hidden
            />

            <div className="relative space-y-10">
              <BlockHeader
                eyebrow="Направление"
                title={
                  <>
                    <Dumbbell className="mr-2 inline-block h-8 w-8 text-terracotta-500 sm:h-9 sm:w-9" />
                    Залы специальной, ОФП-подготовки и групповых программ
                  </>
                }
                description="Тренажёрный зал, специальная подготовка, групповые программы, каратэ, йога и танцы — всё для тренировок и восстановления."
                tone="light"
                titleClassName="text-gradient-purple-lime"
              />

              <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fitnessDirections.map((item, i) => (
                  <CompactFeature
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    text={item.text}
                    image={item.image}
                    imagePosition={item.imagePosition}
                    imagePlaceholder={item.imagePlaceholder}
                    portraitCrop={item.portraitCrop}
                    tone="light"
                    index={i}
                  />
                ))}
              </div>

              <div className="flex justify-start">
                <Button asChild variant="primary" size="lg">
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
            <h3 className="font-display text-display-md font-bold text-balance text-gradient-deep-salmon">
              Инфраструктура спортивного центра
            </h3>
            <div className="mt-5 space-y-6 sm:space-y-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {lockerCards.map((item, i) => (
                  <LockerCard key={item.title} item={item} index={i} />
                ))}
              </div>
              <VipLockersCard />
              <SportsShopBlock />
              <MassageBlock />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
