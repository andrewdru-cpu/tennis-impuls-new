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

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: (offset: number) => ({
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : offset,
    }),
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { ...transitionReveal, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={y}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
    >
      {children}
    </MotionTag>
  );
}

/** Для элементов с кастомной анимацией внутри Framer Motion */
export const revealEase = EASE_OUT_EXPO;
