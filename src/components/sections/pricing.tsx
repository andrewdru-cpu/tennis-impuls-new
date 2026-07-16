import { Check, Star } from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * 👉 ЦЕНЫ: чтобы добавить стоимость — заполните price и unit.
 *    Пустое price показывает заглушку «Уточняйте на ресепшене».
 */
type PricingPlan = {
  name: string;
  price?: string;
  unit?: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const plans: PricingPlan[] = [
  {
    name: "Разовый визит",
    unit: "₽ / час",
    description: "Идеально, чтобы попробовать",
    features: [
      "Аренда корта 1 час",
      "Крытый Hard или открытый грунт",
      "Прокат ракеток",
      "Доступ к раздевалкам",
    ],
    cta: "Забронировать",
  },
  {
    name: "Абонемент PRO",
    unit: "₽ / мес",
    description: "Самый популярный формат",
    features: [
      "8 тренировок с тренером",
      "Крытые корты круглый год",
      "Запись на корты без ограничений",
      "Зал ОФП и восстановление",
      "Скидка 15% на турниры",
    ],
    cta: "Оформить абонемент",
    featured: true,
  },
  {
    name: "Детская школа по теннису",
    unit: "₽ / мес",
    description: "Для юных спортсменов",
    features: [
      "12 групповых занятий",
      "Профессиональные детские тренеры",
      "Участие в турнирах центра",
      "Спортивная экипировка в подарок",
    ],
    cta: "Записать ребёнка",
  },
];

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
        description="Актуальные цены уточняйте на ресепшене или по телефону — мы подберём формат под ваши задачи."
      />

      <div className="section-inner mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
        {plans.map((plan, i) => (
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
                {plan.price ? (
                  <div className="flex items-end gap-1.5">
                    <span
                      className={cn(
                        "font-display text-4xl font-extrabold tracking-tight sm:text-5xl",
                        plan.featured ? "text-white" : "text-ctt-red"
                      )}
                    >
                      {plan.price}
                    </span>
                    {plan.unit && (
                      <span
                        className={cn(
                          "pb-1.5 text-sm font-semibold",
                          plan.featured ? "text-lime-200" : "text-terracotta-600"
                        )}
                      >
                        {plan.unit}
                      </span>
                    )}
                  </div>
                ) : (
                  <p
                    className={cn(
                      "rounded-2xl border border-dashed px-4 py-3.5 text-sm font-semibold leading-relaxed",
                      plan.featured
                        ? "border-white/25 bg-white/10 text-white"
                        : "border-terracotta/25 bg-terracotta/5 text-forest-800"
                    )}
                  >
                    Стоимость уточняйте на ресепшене
                    {plan.unit && (
                      <span
                        className={cn(
                          "mt-1 block text-xs font-medium",
                          plan.featured ? "text-white/70" : "text-terracotta-600"
                        )}
                      >
                        Формат: {plan.unit}
                      </span>
                    )}
                  </p>
                )}
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
                <a href="#booking">{plan.cta}</a>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
