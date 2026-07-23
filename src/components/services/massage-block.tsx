"use client";

import { useState } from "react";
import { ArrowUpRight, HeartHandshake } from "@/lib/icons";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { TeamModal } from "@/components/team/team-modal";
import { TeamPhoto } from "@/components/team/team-photo";
import { openBookingWithSpecialist } from "@/lib/booking-deeplink";
import { findTeamMember, type TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

/** Fallback, если запись в team.ts недоступна. */
const PRIVALOV_FALLBACK: TeamMember = {
  id: "privalov",
  name: "Привалов Роман",
  category: "Массажист-реабилитолог",
  photo: "/images/team/privalov-massage.webp",
  bio: [
    "Специалист по массажу с медицинским образованием.",
    "Имеет Первую категорию по медицинскому массажу.",
    "Сертификаты повышения квалификации по различным техникам массажа.",
    "Использует профессиональную косметику.",
    "Сергиево-Посадское медицинское училище — удостоверение по курсу «Лечебный массаж».",
    "Сертификат по курсу «Медицинский массаж», ФГУ «7 Центральный военный клинический авиационный госпиталь Министерства обороны РФ».",
  ],
};

/**
 * Карточка массажиста в инфраструктуре (фото, имя, должность, «Подробнее»).
 * Данные из team.ts или локального fallback.
 */
export function MassageBlock() {
  const member = findTeamMember("privalov") ?? PRIVALOV_FALLBACK;
  const [open, setOpen] = useState(false);
  const shortBio = member.bio[0];

  return (
    <>
      <Reveal delay={0.18}>
        <article className="card-infra group overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-stretch">
            {/* Портретный кадр: лицо + плечи, не wide-полоска */}
            <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5] lg:aspect-auto lg:min-h-[320px]">
              <TeamPhoto
                photo={member.photo}
                alt={member.name}
                ratio="portrait"
                className="absolute inset-0 h-full w-full !aspect-auto"
                imageClassName="object-cover object-[center_15%] transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

            <div className="flex flex-col justify-center px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
              <div className="mb-3 flex items-center gap-3">
                <span className="icon-wrap">
                  <HeartHandshake className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">
                  Массаж
                </p>
              </div>

              <h4 className="font-display text-display-sm font-semibold text-forest-800">
                {member.name}
              </h4>
              <p className="mt-2 text-sm font-semibold leading-snug text-terracotta-600 sm:text-[0.9375rem]">
                {member.category}
              </p>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-[#1F2E2A]/62 sm:text-[0.9375rem] sm:leading-[1.7]">
                {shortBio}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setOpen(true)}
                  className={cn(
                    "justify-between border-forest-900/12 bg-white/80 sm:min-w-[10.5rem]",
                    "group-hover:border-terracotta/30 group-hover:text-terracotta-600"
                  )}
                >
                  Подробнее
                  <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="sm:min-w-[10.5rem]"
                  onClick={() => openBookingWithSpecialist(member.id)}
                >
                  Записаться
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      <TeamModal member={open ? member : null} onClose={() => setOpen(false)} />
    </>
  );
}
