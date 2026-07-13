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
    <Section id="pricing" tone="muted">
      <SectionHeading
        align="center"
        eyebrow="Цены и абонементы"
        title="Прозрачные тарифы без скрытых платежей"
        description="Актуальные цены уточняйте на ресепшене или по телефону — мы подберём формат под ваши задачи."
      />

      <div className="section-inner mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08}>
            <div
              className={cn(
                plan.featured ? "card-pricing-featured" : "card-pricing"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-terracotta px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-terracotta">
                  <Star className="h-3.5 w-3.5 fill-white" />
                  Хит продаж
                </span>
              )}

              <h3 className={cn("text-card-title", plan.featured && "text-white")}>
                {plan.name}
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  plan.featured ? "text-white/60" : "text-muted-foreground"
                )}
              >
                {plan.description}
              </p>

              <div className="mt-6 min-h-[3.5rem]">
                {plan.price ? (
                  <div className="flex items-end gap-1.5">
                    <span className="font-display text-4xl font-extrabold">
                      {plan.price}
                    </span>
                    {plan.unit && (
                      <span
                        className={cn(
                          "pb-1 text-sm font-medium",
                          plan.featured ? "text-white/60" : "text-muted-foreground"
                        )}
                      >
                        {plan.unit}
                      </span>
                    )}
                  </div>
                ) : (
                  <p
                    className={cn(
                      "rounded-2xl border border-dashed px-4 py-3 text-sm font-medium leading-relaxed",
                      plan.featured
                        ? "border-white/20 bg-white/5 text-white/70"
                        : "border-forest-900/15 bg-forest-900/[0.03] text-muted-foreground"
                    )}
                  >
                    Стоимость уточняйте на ресепшене
                    {plan.unit && (
                      <span className="mt-0.5 block text-xs opacity-80">
                        Формат: {plan.unit}
                      </span>
                    )}
                  </p>
                )}
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.featured
                          ? "bg-terracotta text-white"
                          : "bg-forest-900/5 text-forest-700"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span
                      className={plan.featured ? "text-white/85" : "text-forest-800"}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                variant={plan.featured ? "primary" : "outline"}
                className="mt-8 w-full"
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
