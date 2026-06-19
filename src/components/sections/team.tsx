"use client";

import {
  ArrowUpRight,
  Award,
  Dumbbell,
  HeartHandshake,
  Medal,
  Sparkles,
  Target,
  UserRound,
} from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { Button } from "@/components/ui/button";
import {
  teamGroups,
  tierStyles,
  type Coach,
  type TeamGroup,
} from "@/lib/team";
import { cn } from "@/lib/utils";

const groupMeta: Record<
  TeamGroup["id"],
  { icon: typeof Target; accent: string; panel: string }
> = {
  tennis: {
    icon: Target,
    accent: "text-lime",
    panel:
      "border-lime/30 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 text-white",
  },
  fitness: {
    icon: Dumbbell,
    accent: "text-lime-600",
    panel:
      "border-lime/40 bg-gradient-to-br from-lime-100/80 via-lime-50 to-white",
  },
  massage: {
    icon: HeartHandshake,
    accent: "text-teal-600",
    panel:
      "border-teal-200/60 bg-gradient-to-br from-teal-50 via-white to-lime-50/40",
  },
};

function RankBadge({ coach }: { coach: Coach }) {
  const style = tierStyles[coach.tier];
  if (!coach.rank) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 sm:text-xs",
        style.rankClass
      )}
    >
      {coach.tier === "master" || coach.tier === "kms" ? (
        <Award className="h-3.5 w-3.5 shrink-0" aria-hidden />
      ) : (
        <Medal className="h-3.5 w-3.5 shrink-0" aria-hidden />
      )}
      {coach.rank}
    </span>
  );
}

function CoachCard({
  coach,
  index,
  tone,
}: {
  coach: Coach;
  index: number;
  tone: "dark" | "light";
}) {
  const isDark = tone === "dark";

  return (
    <Reveal delay={index * 0.06}>
      <article
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-3xl border-2 shadow-card transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-glow active:scale-[0.99]",
          isDark
            ? "border-lime/25 bg-white/[0.07] hover:border-lime/50"
            : "border-lime/35 bg-white hover:border-lime/60"
        )}
      >
        <div className="relative overflow-hidden">
          {coach.image ? (
            <MediaImage
              media={coach.image}
              ratio="portrait"
              rounded={false}
              position="top"
              imageClassName="group-hover:scale-105 saturate-[1.08]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="relative aspect-[3/4] bg-gradient-to-br from-forest-900 to-forest-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <UserRound className="h-12 w-12 text-lime/50" />
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-3 sm:p-4">
            {coach.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide sm:text-[11px]",
                  isDark
                    ? "bg-lime/95 text-forest-900"
                    : "bg-forest-900 text-lime"
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-3">
            <RankBadge coach={coach} />
          </div>

          <h3
            className={cn(
              "font-display text-lg font-bold leading-snug sm:text-xl",
              isDark ? "text-white" : "text-forest-900"
            )}
          >
            {coach.name}
          </h3>
          <p
            className={cn(
              "mt-1 text-sm font-semibold",
              isDark ? "text-lime/90" : "text-lime-700"
            )}
          >
            {coach.role}
          </p>

          <p
            className={cn(
              "mt-3 flex-1 text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-6",
              isDark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {coach.description}
          </p>

          {coach.serviceTags && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {coach.serviceTags.map((tag) => (
                <li
                  key={tag}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                    isDark
                      ? "bg-teal-400/20 text-teal-100 ring-teal-300/30"
                      : "bg-teal-100 text-teal-900 ring-teal-200"
                  )}
                >
                  <Sparkles className="h-3 w-3 shrink-0" aria-hidden />
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <a
            href="#booking"
            className={cn(
              "mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold transition-colors",
              isDark
                ? "text-lime hover:text-lime-200"
                : "text-forest-900 hover:text-lime-600"
            )}
          >
            Записаться
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function TeamGroupBlock({ group, groupIndex }: { group: TeamGroup; groupIndex: number }) {
  const meta = groupMeta[group.id];
  const Icon = meta.icon;
  const isDark = group.id === "tennis";

  return (
    <Reveal delay={groupIndex * 0.08}>
      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] border-2 p-5 sm:p-7 lg:p-8",
          meta.panel
        )}
      >
        {isDark && (
          <>
            <div
              className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-lime/20 blur-[80px]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-grid opacity-[0.07]" aria-hidden />
          </>
        )}

        <div className="relative space-y-6 sm:space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1",
                  isDark
                    ? "bg-lime/20 text-lime ring-lime/35"
                    : "bg-lime/30 text-forest-900 ring-lime/45"
                )}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3
                  className={cn(
                    "font-display text-2xl font-bold sm:text-3xl",
                    isDark ? "text-white" : "text-forest-900"
                  )}
                >
                  {group.title}
                </h3>
                <p
                  className={cn(
                    "mt-1 max-w-xl text-sm leading-relaxed sm:text-base",
                    isDark ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  {group.subtitle}
                </p>
              </div>
            </div>
          </div>

          {group.subsections.map((subsection) => (
            <div key={subsection.label ?? subsection.coaches[0]?.id}>
              {subsection.label && (
                <p
                  className={cn(
                    "mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] ring-1",
                    isDark
                      ? "bg-white/10 text-lime ring-lime/30"
                      : "bg-lime/25 text-forest-800 ring-lime/40"
                  )}
                >
                  <Medal className="h-3.5 w-3.5" aria-hidden />
                  {subsection.label}
                </p>
              )}
              <div
                className={cn(
                  "grid grid-cols-1 gap-4 sm:grid-cols-2",
                  subsection.coaches.length === 1 && "lg:max-w-md",
                  subsection.coaches.length >= 3 && "lg:grid-cols-3"
                )}
              >
                {subsection.coaches.map((coach, i) => (
                  <CoachCard
                    key={coach.id}
                    coach={coach}
                    index={i}
                    tone={isDark ? "dark" : "light"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Team() {
  return (
    <Section
      id="team"
      tone="muted"
      className="bg-gradient-to-b from-lime-50/50 via-secondary to-secondary"
    >
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Наша команда"
          title={
            <>
              Подберём идеального{" "}
              <span className="text-lime-600">специалиста под ваши задачи</span>
            </>
          }
          description="Теннис, фитнес и восстановление — опытные тренеры и массажист помогут достичь цели: от первых шагов на корте до персональной формы и реабилитации."
        />
        <Reveal delay={0.1}>
          <Button asChild variant="primary" size="lg" className="shrink-0 shadow-glow">
            <a href="#booking">
              Записаться к специалисту
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </Reveal>
      </div>

      <div className="section-inner space-y-6 sm:space-y-8">
        {teamGroups.map((group, i) => (
          <TeamGroupBlock key={group.id} group={group} groupIndex={i} />
        ))}
      </div>
    </Section>
  );
}
