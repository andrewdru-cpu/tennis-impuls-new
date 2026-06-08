"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-forest-900/10 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-wide flex h-[72px] items-center justify-between">
        <a href="#hero" aria-label={siteConfig.name}>
          <Logo variant={scrolled ? "dark" : "light"} />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-forest-800 hover:bg-forest-900/5"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className={cn(
              "flex items-center gap-2 text-sm font-semibold transition-colors",
              scrolled ? "text-forest-900" : "text-white"
            )}
          >
            <Phone className="h-4 w-4 text-lime-500" />
            {siteConfig.phone}
          </a>
          <Button asChild size="default">
            <a href="#booking">Забронировать</a>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Открыть меню"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            scrolled
              ? "bg-forest-900/5 text-forest-900"
              : "glass text-white"
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
          >
            <div className="container-wide pb-6 pt-2">
              <div className="rounded-3xl border border-forest-900/10 bg-white p-4 shadow-card">
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-base font-medium text-forest-800 transition-colors hover:bg-forest-900/5"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-col gap-2 border-t border-forest-900/10 pt-4">
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-forest-900"
                  >
                    <Phone className="h-4 w-4 text-lime-500" />
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
        )}
      </AnimatePresence>
    </header>
  );
}
