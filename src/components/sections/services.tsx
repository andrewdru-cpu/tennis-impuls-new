import {
  Users,
  UserRound,
  Baby,
  Dumbbell,
  CalendarRange,
  Target,
  Activity,
  Shield,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { Card } from "@/components/ui/card";
import { media, type MediaImageSource } from "@/lib/media";
import { cn } from "@/lib/utils";

type ServiceItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  image?: MediaImageSource;
  tags?: string[];
};

const services: ServiceItem[] = [
  {
    icon: Baby,
    title: "Групповые занятия для детей (от 4 лет)",
    text: "Безопасные и увлекательные тренировки для детей от 4 лет. Программа адаптирована по возрасту: координация, техника ударов и любовь к спорту. Занятия ведут опытные детские тренеры на профессиональных кортах.",
    image: media.services.junior,
  },
  {
    icon: Users,
    title: "Групповые занятия для взрослых (мини-группы до 4 человек)",
    text: "Мини-группы до 4 человек — баланс внимания тренера и драйва командной работы. Подходит начинающим и продолжающим игрокам. Удобный график утренних и вечерних занятий.",
    image: media.services.group,
  },
  {
    icon: UserRound,
    title: "Индивидуальные тренировки",
    text: "Персональная программа под вашу цель: техника, тактика, физическая подготовка. Тренер работает только с вами — максимальный прогресс за каждую тренировку. Запись и бронирование онлайн.",
    image: media.services.individual,
  },
  {
    icon: CalendarRange,
    title: "Аренда кортов (Хард и Грунт)",
    text: "Крытые корты Hard и открытые грунтовые площадки на одной территории. Бронирование онлайн 24/7 в любое удобное время. Инвентарь предоставляется в аренду отдельно.",
    image: media.services.rental,
    tags: ["Крытый Hard", "Открытый грунт"],
  },
  {
    icon: Target,
    title: "Падел",
    text: "Современный формат ракеточного спорта на профессиональном крытом покрытии Hard. Отличный вариант для компании друзей и активного отдыха. Корты и инвентарь — всё в одном месте.",
    image: media.services.padel,
  },
  {
    icon: Dumbbell,
    title: "Тренажёрный зал (групповые и индивидуальные тренировки)",
    text: "Полноценный тренажёрный зал для силовой и функциональной подготовки. Групповые и индивидуальные занятия с тренером под ваш уровень. Идеальное дополнение к тренировкам на корте.",
    image: media.services.fitness,
  },
  {
    icon: Activity,
    title: "Залы ОФП",
    text: "Просторные залы общей физической подготовки с профессиональным инвентарём. Балетные станки и зеркала для работы над координацией, гибкостью и растяжкой. Подходит спортсменам любого уровня.",
    image: media.services.ofp,
  },
  {
    icon: Shield,
    title: "Секция каратэ",
    text: "Тренировки по каратэ под руководством опытного наставника. Дисциплина, техника ударов и уверенность в себе. Занятия для детей и взрослых в безопасной атмосфере.",
    image: media.services.karate,
  },
  {
    icon: Sparkles,
    title: "Настольный теннис, Танцевальная студия и Йога",
    text: "Три дополнительных направления на территории комплекса — от проверенных арендаторов клуба. Удобно совмещать с основными тренировками без лишних поездок. Расписание и запись — у администраторов направлений.",
    image: media.services.activities,
    tags: ["Настольный теннис", "Танцы", "Йога"],
  },
];

function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-forest-900/10 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-lime/40 hover:shadow-soft">
      <div className="relative">
        {service.image ? (
          <MediaImage
            media={service.image}
            ratio="photo"
            rounded={false}
            overlay
            imageClassName="group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-forest-700">
            <div className="absolute inset-0 bg-grid opacity-15" aria-hidden />
            <div
              className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-lime/30 blur-2xl"
              aria-hidden
            />
          </div>
        )}
        <span
          className={cn(
            "absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl",
            "bg-forest-900/90 text-lime shadow-lg backdrop-blur-sm",
            "transition-colors group-hover:bg-lime group-hover:text-forest-900"
          )}
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <h3 className="text-card-title">{service.title}</h3>

        <p className="mt-3 flex-1 text-card-body">
          {service.text}
        </p>

        {service.tags && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-forest-900/5 px-3 py-1 text-xs font-semibold text-forest-800 sm:text-[0.8125rem]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <a
          href="#booking"
          className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-5 text-sm font-semibold text-forest-900 transition-colors group-hover:text-lime-600"
        >
          Записаться
          <ArrowUpRight className="h-4 w-4 shrink-0" />
        </a>
      </div>
    </Card>
  );
}

export function Services() {
  return (
    <Section id="services">
        <header className="max-w-3xl">
          <SectionHeading
            eyebrow="Услуги клуба"
            title={
              <>
                Всё необходимое{" "}
                <span className="text-lime-600">на одной территории</span>
              </>
            }
            description="Теннис, падел, тренажёрный зал, ОФП и дополнительные направления — в едином спортивном комплексе у Лосиного Острова."
          />
        </header>

        <div className="section-inner grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
    </Section>
  );
}
