import { Phone, Mail, MapPin, Clock, Navigation, ParkingCircle } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
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
    <section id="contacts" className="bg-secondary py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Контакты"
          title="Приезжайте в гости"
          description="Мы рядом с Лосиным Островом, в 20 минутах от Москвы. Удобная парковка для гостей клуба."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactCards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-forest-900/10 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-900 text-lime">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="mt-1 block font-display text-lg font-semibold text-forest-900 transition-colors hover:text-lime-600"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-display text-lg font-semibold text-forest-900">
                        {c.value}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/*
            👉 ПЛЕЙСХОЛДЕР КАРТЫ: позже встроить Яндекс.Карты / Google Maps
               (iframe или react-компонент) с реальной точкой клуба.
          */}
          <Reveal delay={0.1}>
            <div className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[2rem] bg-forest-950 p-8 text-white">
              <div
                className="absolute inset-0 bg-grid opacity-20"
                aria-hidden
              />
              <div
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime/20"
                aria-hidden
              >
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime/30" />
                <MapPin className="relative h-7 w-7 text-lime" />
              </div>
              <div className="relative">
                <p className="font-display text-xl font-bold">
                  ЦТТ «Импульс»
                </p>
                <p className="mt-1 text-sm text-white/70">
                  {siteConfig.address}
                </p>
                <Button asChild variant="primary" className="mt-5">
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
      </div>
    </section>
  );
}
