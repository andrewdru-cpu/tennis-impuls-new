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
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 sm:text-[11px]",
        style.rankClass
      )}
    >
      {coach.tier === "master" || coach.tier === "kms" ? (
        <Award className="h-3 w-3 shrink-0" aria-hidden />
      ) : (
        <Medal className="h-3 w-3 shrink-0" aria-hidden />
      )}
      {coach.rank}
    </span>
  );
}

function MassageCoachCard({ coach, index }: { coach: Coach; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <article className="group overflow-hidden rounded-2xl border-2 border-teal-200/70 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-lime/50 hover:shadow-glow">
        <div className="flex flex-row">
          <div className="relative w-[112px] shrink-0 sm:w-[132px]">
            {coach.image ? (
              <MediaImage
                media={coach.image}
                ratio="auto"
                rounded={false}
                position="center top"
                className="aspect-[4/5] h-full min-h-[140px] rounded-none sm:min-h-[165px]"
                imageClassName="object-cover object-[center_15%] group-hover:scale-105 saturate-[1.06]"
                sizes="132px"
              />
            ) : (
              <div className="flex aspect-[4/5] min-h-[140px] items-center justify-center bg-gradient-to-br from-teal-100 to-forest-100 sm:min-h-[165px]">
                <UserRound className="h-8 w-8 text-teal-400/60" />
              </div>
            )}
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {coach.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-forest-900/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-lime backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
            <RankBadge coach={coach} />

            <h3 className="mt-2 text-base font-bold leading-snug text-forest-900 sm:text-lg">
              {coach.name}
            </h3>
            <p className="mt-0.5 text-xs font-semibold text-teal-700 sm:text-sm">{coach.role}</p>

            <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-5">
              {coach.description}
            </p>

            {coach.serviceTags && (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {coach.serviceTags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold text-teal-900 ring-1 ring-teal-200 sm:text-xs"
                  >
                    <Sparkles className="h-2.5 w-2.5 shrink-0" aria-hidden />
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <a
              href="#booking"
              className="mt-3 inline-flex min-h-[40px] w-fit items-center gap-1 text-xs font-semibold text-forest-900 transition-colors hover:text-lime-600 sm:min-h-[44px] sm:text-sm"
            >
              Записаться на массаж
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
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
    <Reveal delay={index * 0.06} className="h-full">
      <article
        className={cn(
          "group card-surface flex h-full flex-col overflow-hidden rounded-2xl border-2 p-0",
          isDark
            ? "border-sand/20 bg-white/[0.07] hover:border-sand/40"
            : "border-sand/25 hover:border-terracotta/25"
        )}
      >
        <div className="relative overflow-hidden">
          {coach.image ? (
            <MediaImage
              media={coach.image}
              ratio="auto"
              rounded={false}
              position="top"
              className="aspect-[5/6] w-full"
              imageClassName="group-hover:scale-105 saturate-[1.08]"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            />
          ) : (
            <div className="relative aspect-[5/6] bg-gradient-to-br from-forest-900 to-forest-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <UserRound className="h-9 w-9 text-lime/50" />
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1 p-2 sm:p-2.5">
            {coach.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide sm:text-[10px]",
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

        <div className="flex flex-1 flex-col p-3 sm:p-3.5">
          <div className="mb-2">
            <RankBadge coach={coach} />
          </div>

          <h3
            className={cn(
              "font-display text-base font-bold leading-snug sm:text-lg",
              isDark ? "text-white" : "text-forest-900"
            )}
          >
            {coach.name}
          </h3>
          <p
            className={cn(
              "mt-0.5 text-xs font-semibold sm:text-sm",
              isDark ? "text-lime/90" : "text-lime-700"
            )}
          >
            {coach.role}
          </p>

          <p
            className={cn(
              "mt-2 line-clamp-3 flex-1 text-xs leading-relaxed sm:text-sm sm:leading-5",
              isDark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {coach.description}
          </p>

          {coach.serviceTags && (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {coach.serviceTags.map((tag) => (
                <li
                  key={tag}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 sm:text-xs",
                    isDark
                      ? "bg-teal-400/20 text-teal-100 ring-teal-300/30"
                      : "bg-teal-100 text-teal-900 ring-teal-200"
                  )}
                >
                  <Sparkles className="h-2.5 w-2.5 shrink-0" aria-hidden />
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <a
            href="#booking"
            className={cn(
              "mt-3 inline-flex min-h-[40px] items-center gap-1 text-xs font-semibold transition-colors sm:min-h-[44px] sm:text-sm",
              isDark
                ? "text-lime hover:text-lime-200"
                : "text-forest-900 hover:text-lime-600"
            )}
          >
            Записаться
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
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
          "relative overflow-hidden rounded-2xl border-2 p-4 sm:p-5 lg:p-6",
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

        <div className="relative space-y-4 sm:space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 sm:h-11 sm:w-11 sm:rounded-2xl",
                  isDark
                    ? "bg-lime/20 text-lime ring-lime/35"
                    : "bg-lime/30 text-forest-900 ring-lime/45"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3
                  className={cn(
                    "font-display text-xl font-bold sm:text-2xl",
                    isDark ? "text-white" : "text-forest-900"
                  )}
                >
                  {group.title}
                </h3>
                <p
                  className={cn(
                    "mt-1 max-w-xl text-xs leading-relaxed sm:text-sm",
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
                    "mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ring-1 sm:text-xs",
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
                  "grid grid-cols-2 gap-3 sm:gap-3.5",
                  subsection.coaches.length >= 3 && "lg:grid-cols-3",
                  subsection.coaches.length >= 4 && "xl:grid-cols-4"
                )}
              >
                {subsection.coaches.map((coach, i) =>
                  coach.tier === "massage" ? (
                    <div key={coach.id} className="col-span-2 max-w-xl">
                      <MassageCoachCard coach={coach} index={i} />
                    </div>
                  ) : (
                    <CoachCard
                      key={coach.id}
                      coach={coach}
                      index={i}
                      tone={isDark ? "dark" : "light"}
                    />
                  )
                )}
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

      <div className="section-inner space-y-4 sm:space-y-6">
        {teamGroups.map((group, i) => (
          <TeamGroupBlock key={group.id} group={group} groupIndex={i} />
        ))}
      </div>
    </Section>
  );
}
