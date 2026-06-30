import { Phone, Mail, Send } from "@/lib/icons";

import { Logo } from "@/components/logo";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest-950 text-white">
      <div className="container-wide py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {siteConfig.fullName}. Премиальный теннис в окружении природы
              Лосиного Острова — корты, тренеры и атмосфера мирового уровня.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-[transform,background-color,color] duration-500 ease-premium hover:scale-105 hover:bg-lime hover:text-forest-900"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.phoneHref}
                aria-label="Позвонить"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-[transform,background-color,color] duration-500 ease-premium hover:scale-105 hover:bg-lime hover:text-forest-900"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Написать"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-[transform,background-color,color] duration-500 ease-premium hover:scale-105 hover:bg-lime hover:text-forest-900"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Навигация
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="touch-link text-white/70 hover:text-lime">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Контакты
            </p>
            <ul className="mt-5 space-y-1 text-sm text-white/70">
              <li>
                <a href={siteConfig.phoneHref} className="touch-link hover:text-lime">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="touch-link hover:text-lime"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="py-2 leading-relaxed">{siteConfig.address}</li>
              <li className="py-2 leading-relaxed">Ежедневно, 07:00 – 23:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
          </p>
          <p>Мытищи · Лосиный Остров</p>
        </div>
      </div>
    </footer>
  );
}
