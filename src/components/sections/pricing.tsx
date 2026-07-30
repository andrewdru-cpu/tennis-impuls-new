import { Check, ChevronDown, Star } from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  fullPriceSections,
  pricingPlans,
  type PriceTableSection,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

function PriceTable({ section }: { section: PriceTableSection }) {
  const colCount = section.columns?.length ?? 1;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[18rem] border-collapse text-left">
        {section.columns && (
          <thead>
            <tr className="border-b border-forest-900/10">
              <th className="pb-3 pr-3 text-xs font-bold uppercase tracking-[0.14em] text-terracotta-600">
                Услуга
              </th>
              {section.columns.map((col) => (
                <th
                  key={col}
                  className="pb-3 px-2 text-right text-xs font-bold uppercase tracking-[0.12em] text-terracotta-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {section.rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-forest-900/[0.06] last:border-0"
            >
              <td className="py-3 pr-3 text-sm font-medium leading-snug text-forest-800 sm:text-[0.9375rem]">
                {row.label}
              </td>
              {row.values.map((value, i) => (
                <td
                  key={`${row.label}-${i}`}
                  className={cn(
                    "py-3 px-2 text-right font-display text-sm font-bold tabular-nums text-forest-900 sm:text-base",
                    colCount === 1 && "whitespace-nowrap"
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {section.note && (
        <p className="mt-3 text-xs leading-relaxed text-[#1F2E2A]/55 sm:text-sm">
          {section.note}
        </p>
      )}
    </div>
  );
}

export function Pricing() {
  return (
    <Section
      id="pricing"
      className="overflow-hidden bg-gradient-to-b from-lime-50/80 via-cream to-terracotta/5"
    >
      <SectionHeading
        align="center"
        className="mx-auto"
        eyebrow="Цены и абонементы"
        title={
          <>
            Прозрачные тарифы{" "}
            <span className="text-terracotta-600">без скрытых платежей</span>
          </>
        }
        description="Актуальные цены на аренду кортов, групповые и персональные тренировки, фитнес и VIP."
      />

      <div className="section-inner mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
        {pricingPlans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08} className="h-full">
            <div
              className={cn(
                "h-full",
                plan.featured ? "card-pricing-featured" : "card-pricing"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-forest-900 shadow-[0_6px_20px_-4px_rgba(10,47,36,0.45)] ring-2 ring-lime">
                  <Star className="h-3.5 w-3.5 fill-lime text-forest-900" />
                  Хит продаж
                </span>
              )}

              <h3
                className={cn(
                  "font-display text-xl font-bold sm:text-2xl",
                  plan.featured ? "text-white" : "text-forest-800"
                )}
              >
                {plan.name}
              </h3>
              <p
                className={cn(
                  "mt-1.5 text-sm font-medium",
                  plan.featured ? "text-white/80" : "text-terracotta-600"
                )}
              >
                {plan.description}
              </p>

              <div className="mt-6 min-h-[4rem]">
                <div className="flex flex-wrap items-end gap-1.5">
                  <span
                    className={cn(
                      "font-display text-4xl font-extrabold tracking-tight sm:text-5xl",
                      plan.featured ? "text-white" : "text-ctt-red"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "pb-1.5 text-sm font-semibold",
                      plan.featured ? "text-lime-200" : "text-terracotta-600"
                    )}
                  >
                    {plan.unit}
                  </span>
                </div>
              </div>

              <ul className="mt-7 flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.featured
                          ? "bg-lime text-forest-950"
                          : "bg-terracotta/15 text-terracotta"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span
                      className={cn(
                        "leading-snug",
                        plan.featured
                          ? "font-medium text-white/90"
                          : "font-medium text-[#1F2E2A]/78"
                      )}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.note && (
                <p
                  className={cn(
                    "mt-4 text-xs leading-relaxed sm:text-[0.8125rem]",
                    plan.featured ? "text-white/65" : "text-[#1F2E2A]/50"
                  )}
                >
                  {plan.note}
                </p>
              )}

              <Button
                asChild
                size="lg"
                variant="primary"
                className={cn(
                  "mt-8 w-full",
                  plan.featured &&
                    "!bg-none bg-white text-forest-900 shadow-soft hover:!bg-lime hover:text-forest-950"
                )}
              >
                <a href={plan.ctaHref ?? "#booking"}>{plan.cta}</a>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Полный прайс */}
      <Reveal delay={0.2} className="section-inner mx-auto mt-12 max-w-4xl sm:mt-14">
        <details className="group overflow-hidden rounded-[1.75rem] border border-forest-900/10 bg-white/90 shadow-soft open:shadow-elevated">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-4",
              "px-5 py-5 sm:px-8 sm:py-6",
              "marker:content-none [&::-webkit-details-marker]:hidden",
              "transition-colors duration-300 hover:bg-lime-50/50"
            )}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">
                Полный прайс
              </p>
              <h3 className="mt-1.5 font-display text-xl font-bold text-forest-800 sm:text-2xl">
                Смотреть полный прайс
              </h3>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta ring-1 ring-terracotta/20 transition-transform duration-300 group-open:rotate-180">
              <ChevronDown className="h-5 w-5" aria-hidden />
            </span>
          </summary>

          <div className="space-y-3 border-t border-forest-900/8 px-3 pb-4 pt-3 sm:space-y-4 sm:px-5 sm:pb-6 sm:pt-4">
            {fullPriceSections.map((section) => (
              <details
                key={section.id}
                className="group/section overflow-hidden rounded-2xl border border-forest-900/[0.07] bg-gradient-to-br from-white via-cream/40 to-lime-50/30"
              >
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center justify-between gap-3",
                    "px-4 py-4 sm:px-5",
                    "marker:content-none [&::-webkit-details-marker]:hidden",
                    "transition-colors duration-300 hover:bg-white/70"
                  )}
                >
                  <h4 className="font-display text-base font-bold text-forest-800 sm:text-lg">
                    {section.title}
                  </h4>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-terracotta-600 transition-transform duration-300 group-open/section:rotate-180"
                    aria-hidden
                  />
                </summary>
                <div className="border-t border-forest-900/[0.06] px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
                  <PriceTable section={section} />
                </div>
              </details>
            ))}
          </div>
        </details>
      </Reveal>
    </Section>
  );
}
