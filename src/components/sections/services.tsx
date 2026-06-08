import {
  Trophy,
  Users,
  Baby,
  Dumbbell,
  CalendarRange,
  Target,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { Card } from "@/components/ui/card";
import { media, type MediaImageSource } from "@/lib/media";

type ServiceItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  image: MediaImageSource;
  tags?: string[];
};

const services: ServiceItem[] = [
  {
    icon: Trophy,
    title: "Индивидуальные тренировки",
    text: "Персональная программа с тренером PRO-уровня: техника, тактика, физическая подготовка.",
    image: media.services.individual,
  },
  {
    icon: Baby,
    title: "Детская академия",
    text: "Группы по возрастам от 4 лет. Игровой подход, турниры и спортивный рост.",
    image: media.services.junior,
  },
  {
    icon: Users,
    title: "Групповые занятия",
    text: "Тренировки в мини-группах 2–4 человека — эффективно и в компании.",
    image: media.services.group,
  },
  {
    icon: CalendarRange,
    title: "Аренда кортов",
    text: "Бронирование онлайн 24/7. Инвентарь — в аренду.",
    image: media.services.rental,
    tags: ["Крытый Hard", "Открытый грунт", "Падел"],
  },
  {
    icon: Target,
    title: "Падел",
    text: "Самая динамичная ракеточная игра. Корты и аренда оборудования в клубе.",
    image: media.services.padel,
  },
  {
    icon: Dumbbell,
    title: "Фитнес и ОФП",
    text: "Зал, функциональные тренировки и восстановление для теннисистов.",
    image: media.services.fitness,
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-24 lg:py-32">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Услуги клуба"
            title="Всё для вашего тенниса — на одной территории"
            description="От первой ракетки до профессионального уровня. Выбирайте формат, а мы создадим идеальные условия."
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <Card className="group flex h-full flex-col overflow-hidden border-forest-900/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                <MediaImage
                  media={s.image}
                  ratio="photo"
                  rounded={false}
                  imageClassName="group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="flex flex-1 flex-col p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-900/5 text-forest-900 transition-colors group-hover:bg-lime group-hover:text-forest-900">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-forest-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                  {s.tags && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-forest-900/5 px-2.5 py-1 text-xs font-semibold text-forest-800"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href="#booking"
                    className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-900 transition-colors group-hover:text-lime-600"
                  >
                    Подробнее
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
