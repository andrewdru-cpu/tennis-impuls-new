"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_OUT_EXPO, transitionReveal } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span" | "section";
}

/**
 * Reveal: никогда не ставит opacity:0 на критичный контент.
 * При reduced-motion / до JS — обычный видимый блок.
 * Анимация только лёгкий сдвиг (opacity всегда 1).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    // opacity всегда 1 — если JS оборвётся на hidden, контент всё равно виден
    hidden: {
      opacity: 1,
      y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...transitionReveal, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      style={{ opacity: 1 }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
    >
      {children}
    </MotionTag>
  );
}

export const revealEase = EASE_OUT_EXPO;
