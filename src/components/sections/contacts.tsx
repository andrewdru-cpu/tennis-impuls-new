import { Phone, Mail, MapPin, Clock, Navigation, ParkingCircle } from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { ContactMenu } from "@/components/contact-menu";
import { siteConfig } from "@/lib/site";

const contactCards = [
  {
    icon: Phone,
    label: "Телефон",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Почта",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: siteConfig.address,
  },
  {
    icon: Clock,
    label: "Часы работы",
    value: "Ежедневно, 07:00 – 23:00",
  },
  {
    icon: ParkingCircle,
    label: "Парковка",
    value: "Бесплатно для клиентов",
  },
];

export function Contacts() {
  return (
    <Section id="contacts" tone="muted">
        <SectionHeading
          eyebrow="Контакты"
          title="Приезжайте в центр"
          description="Мы рядом с Лосиным Островом — в 3 минутах от Москвы и МКАД. Удобная парковка для гостей центра."
        />

        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <div>
            <Reveal delay={0.02}>
              <div className="card-surface overflow-visible rounded-3xl p-4 sm:p-6">
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Выберите удобный способ связи — ответим быстро.
                </p>
                <ContactMenu className="w-full" />
              </div>
            </Reveal>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactCards.map((c, i) => (
                <Reveal key={c.label} delay={0.08 + i * 0.05}>
                  <div className="card-feature group rounded-3xl">
                    <span className="icon-wrap-solid text-lime">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="touch-link mt-0.5 block font-display text-base font-semibold text-[#1F2E2A] hover:text-terracotta-600 sm:text-lg"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-1 font-display text-base font-semibold text-[#1F2E2A] sm:text-lg">
                          {c.value}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/*
            👉 ПЛЕЙСХОЛДЕР КАРТЫ: позже встроить Яндекс.Карты / Google Maps
               (iframe или react-компонент) с реальной точкой клуба.
          */}
          <Reveal delay={0.1}>
            <div className="relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-white via-lime-50 to-emerald-50/70 p-6 text-forest-900 ring-1 ring-forest-900/10 sm:min-h-[320px] sm:p-8">
              <div
                className="absolute inset-0 bg-grid opacity-[0.08]"
                aria-hidden
              />
              <div
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime/35"
                aria-hidden
              >
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime/40" />
                <MapPin className="relative h-7 w-7 text-forest-900/80" />
              </div>
              <div className="relative">
                <p className="text-ctt-red font-display text-xl font-bold">
                  ЦТТ «Импульс»
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {siteConfig.address}
                </p>
                <Button asChild variant="primary" size="lg" className="mt-5 w-full sm:w-auto">
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Navigation className="h-4 w-4" />
                    Построить маршрут
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
    </Section>
  );
}
