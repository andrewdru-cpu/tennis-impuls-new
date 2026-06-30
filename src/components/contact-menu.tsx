"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, MessageCircle, Phone } from "@/lib/icons";
import {
  MaxIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/icons/brand-icons";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { transitionMenu, transitionMenuItem } from "@/lib/motion";

const contactLinks = [
  {
    label: "Написать в Telegram",
    href: siteConfig.contacts.telegram,
    icon: TelegramIcon,
    external: true,
  },
  {
    label: "Написать в Макс",
    href: siteConfig.contacts.max,
    icon: MaxIcon,
    external: true,
  },
  {
    label: "Написать в WhatsApp",
    href: siteConfig.contacts.whatsapp,
    icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "Написать на почту",
    href: siteConfig.contacts.email,
    icon: Mail,
    external: false,
  },
  {
    label: "Позвонить",
    href: siteConfig.contacts.phone,
    icon: Phone,
    external: false,
  },
] as const;

interface ContactMenuProps {
  className?: string;
  /** Компактный вид для тёмного фона карты */
  variant?: "light" | "dark";
}

export function ContactMenu({ className, variant = "light" }: ContactMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isDark = variant === "dark";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <Button
        type="button"
        size="lg"
        variant={isDark ? "primary" : "dark"}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full justify-between sm:w-auto sm:min-w-[280px]",
          isDark && "shadow-glow"
        )}
      >
        <span className="flex items-center gap-2.5">
          <MessageCircle className="h-5 w-5 text-lime" />
          Связаться с нами
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-500 ease-out-expo",
            open && "rotate-180"
          )}
        />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={transitionMenu}
            className={cn(
              "absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border shadow-card sm:right-auto sm:min-w-[320px]",
              isDark
                ? "border-white/10 bg-forest-950/95 backdrop-blur-xl"
                : "border-forest-900/10 bg-white"
            )}
          >
            <ul className="p-2">
              {contactLinks.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035, ...transitionMenuItem }}
                >
                  <a
                    role="menuitem"
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-[background-color,color] duration-400 ease-premium",
                      isDark
                        ? "text-white/90 hover:bg-white/10 hover:text-white"
                        : "text-forest-900 hover:bg-forest-900/5"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        isDark ? "bg-lime/15 text-lime" : "bg-forest-900/5 text-forest-800"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
