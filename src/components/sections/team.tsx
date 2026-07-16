"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { TeamModal } from "@/components/team/team-modal";
import { TeamPhoto } from "@/components/team/team-photo";
import { teamGroups, type TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

function TeamMemberCard({
  member,
  index,
  priority,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  priority?: boolean;
  onOpen: () => void;
}) {
  return (
    <Reveal delay={index * 0.05} className="h-full">
      <article className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl p-0">
        <div className="relative overflow-hidden">
          <TeamPhoto
            photo={member.photo}
            alt={member.name}
            ratio="portrait"
            priority={priority}
            className="w-full"
            imageClassName="transition-transform duration-700 ease-premium group-hover:scale-[1.04] saturate-[1.08]"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest-950/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg font-bold leading-snug text-forest-800 sm:text-xl">
            {member.name}
          </h3>
          <p className="mt-2 text-sm font-semibold leading-snug text-terracotta-600">
            {member.category}
          </p>

          <div className="mt-auto pt-5">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onOpen}
              className={cn(
                "w-full justify-between border-forest-900/12 bg-white/80",
                "group-hover:border-terracotta/30 group-hover:text-terracotta-600"
              )}
            >
              Подробнее
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Team() {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const visibleGroups = teamGroups.filter((group) => group.id !== "massage");

  return (
    <Section
      id="team"
      tone="muted"
      className="bg-gradient-to-b from-lime-50/50 via-secondary to-secondary"
    >
      <SectionHeading
        eyebrow="Наша команда"
        title={
          <>
            Профессионалы, которые{" "}
            <span className="text-gradient-purple-lime">ведут к результату</span>
          </>
        }
        description="Тренеры и специалисты центра — опыт, внимание к деталям и индивидуальный подход к каждому гостю."
      />

      <div className="section-inner space-y-10 sm:space-y-12 lg:space-y-14">
        {visibleGroups.map((group, groupIndex) => (
          <div key={group.id}>
            <Reveal delay={groupIndex * 0.06}>
              <div className="max-w-3xl">
                <h3 className="heading-subsection text-balance">{group.title}</h3>
                {group.description && (
                  <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-bright sm:text-base">
                    {group.description}
                  </p>
                )}
              </div>
            </Reveal>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {group.members.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  priority={groupIndex === 0 && index < 4}
                  onOpen={() => setSelected(member)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 flex justify-center sm:mt-12">
        <Button asChild variant="primary" size="lg" className="shadow-glow">
          <a href="#booking">
            Записаться к специалисту
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </Reveal>

      <TeamModal member={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
