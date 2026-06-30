"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "@/lib/icons";

import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { transitionMenu } from "@/lib/motion";

const NAVBAR_HEIGHT = 76;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-650 ease-premium",
          scrolled
            ? "border-b border-forest-900/10 bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="container-wide flex h-[76px] items-center justify-between gap-3">
          <a
            href="#hero"
            className="min-w-0 shrink"
            aria-label={siteConfig.name}
            onClick={() => setOpen(false)}
          >
            <Logo variant={scrolled ? "dark" : "light"} compact />
          </a>

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-[color,background-color] duration-400 ease-premium xl:px-3.5 xl:text-sm",
                    scrolled
                      ? "text-forest-800 hover:bg-forest-900/5"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex xl:gap-3">
            <a
              href={siteConfig.phoneHref}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-semibold tracking-tight transition-[background-color,border-color,color] duration-400 ease-premium xl:text-sm",
                scrolled
                  ? "border-forest-900/10 bg-forest-900/[0.03] text-forest-900 hover:bg-forest-900/5"
                  : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
              )}
            >
              <Phone className="h-4 w-4 shrink-0 text-terracotta-400" />
              {siteConfig.phone}
            </a>
            <Button asChild size="default" className="shrink-0 whitespace-nowrap">
              <a href="#booking">Забронировать</a>
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-[background-color,color] duration-400 ease-premium lg:hidden",
              scrolled
                ? "bg-forest-900/5 text-forest-900"
                : "glass text-white"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-forest-950/45 backdrop-blur-[2px] lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Навигация"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={transitionMenu}
              className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto overscroll-contain lg:hidden"
              style={{
                top: `calc(${NAVBAR_HEIGHT}px + env(safe-area-inset-top, 0px))`,
              }}
            >
              <div className="container-wide pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-2">
                <div className="rounded-3xl border border-forest-900/10 bg-white p-4 shadow-card">
                  <ul className="flex flex-col">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-11 items-center rounded-2xl px-4 py-3 text-base font-medium text-forest-800 transition-[background-color,color] duration-400 ease-premium hover:bg-forest-900/5 active:bg-forest-900/8"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-col gap-2 border-t border-forest-900/10 pt-4">
                    <a
                      href={siteConfig.phoneHref}
                      className="flex min-h-11 items-center justify-center gap-2 rounded-2xl whitespace-nowrap text-sm font-semibold text-forest-900 transition-colors duration-400 ease-premium hover:bg-forest-900/5 active:bg-forest-900/8"
                    >
                      <Phone className="h-4 w-4 text-terracotta-400" />
                      {siteConfig.phone}
                    </a>
                    <Button asChild size="lg" className="w-full">
                      <a href="#booking" onClick={() => setOpen(false)}>
                        Забронировать корт
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
