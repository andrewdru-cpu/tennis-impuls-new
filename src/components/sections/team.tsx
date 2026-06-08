import { ArrowUpRight, Award } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { Button } from "@/components/ui/button";
import { media } from "@/lib/media";

/**
 * 👉 Портреты тренеров — реальные фото клуба (с прежнего сайта), на кортах,
 *    в едином стиле. Меняются через media.team в media.ts.
 */
const coaches = [
  {
    name: "Андрей Соколов",
    role: "Главный тренер",
    badge: "Мастер спорта",
    image: media.team.coach2,
  },
  {
    name: "Мария Левина",
    role: "Тренер по индивидуальной подготовке",
    badge: "Кандидат в мастера",
    image: media.team.coach1,
  },
  {
    name: "Елена Кравцова",
    role: "Детский тренер",
    badge: "Тренер ITF",
    image: media.team.coach3,
  },
  {
    name: "Дмитрий Орлов",
    role: "Тренер · спарринг",
    badge: "10+ лет опыта",
    image: media.team.coach4,
  },
  {
    // TODO: заглушка — заменить имя и описание на реальные
    name: "Иван Иванов",
    role: "Тренер по карате Киокушинкай",
    badge: "Чемпион мира среди мастеров",
    image: media.team.coach5,
  },
];

export function Team() {
  return (
    <section id="team" className="bg-white py-24 lg:py-32">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Наша команда"
            title="Тренеры, которые приводят к результату"
            description="Профессионалы со спортивным прошлым. Подберём тренера под вашу цель и уровень."
          />
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <a href="#booking">
                Записаться к тренеру
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {coaches.map((coach, i) => (
            <Reveal key={coach.name} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-[1.75rem]">
                <MediaImage
                  media={coach.image}
                  ratio="portrait"
                  rounded={false}
                  overlay
                  imageClassName="group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-forest-900">
                    <Award className="h-3 w-3" />
                    {coach.badge}
                  </span>
                  <h3 className="mt-2.5 font-display text-lg font-bold leading-tight text-white">
                    {coach.name}
                  </h3>
                  <p className="text-xs text-white/80">{coach.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
