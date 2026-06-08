import { Check, Star } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Разовый визит",
    price: "1 500",
    unit: "₽ / час",
    description: "Идеально, чтобы попробовать",
    features: [
      "Аренда корта 1 час",
      "Крытый Hard или открытый грунт",
      "Прокат ракеток",
      "Доступ к раздевалкам",
    ],
    cta: "Забронировать",
    featured: false,
  },
  {
    name: "Абонемент PRO",
    price: "12 900",
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
    name: "Детская академия",
    price: "9 500",
    unit: "₽ / мес",
    description: "Для юных чемпионов",
    features: [
      "12 групповых занятий",
      "Профессиональные детские тренеры",
      "Участие в клубных турнирах",
      "Спортивная экипировка в подарок",
    ],
    cta: "Записать ребёнка",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-secondary py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow="Цены и абонементы"
          title="Прозрачные тарифы без скрытых платежей"
          description="Выберите подходящий формат. Ракетки и инвентарь предоставляются в аренду отдельно."
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[2rem] border p-8 transition-all duration-500",
                  plan.featured
                    ? "border-transparent bg-forest-950 text-white shadow-card lg:-translate-y-4"
                    : "border-forest-900/10 bg-white text-forest-900 hover:-translate-y-1 hover:shadow-soft"
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-lime px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-forest-900">
                    <Star className="h-3.5 w-3.5 fill-forest-900" />
                    Хит продаж
                  </span>
                )}

                <h3 className="font-display text-lg font-semibold">
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

                <div className="mt-6 flex items-end gap-1.5">
                  <span className="font-display text-4xl font-extrabold">
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "pb-1 text-sm font-medium",
                      plan.featured ? "text-white/60" : "text-muted-foreground"
                    )}
                  >
                    {plan.unit}
                  </span>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          plan.featured
                            ? "bg-lime text-forest-900"
                            : "bg-forest-900/5 text-forest-700"
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className={
                          plan.featured ? "text-white/85" : "text-forest-800"
                        }
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
      </div>
    </section>
  );
}
