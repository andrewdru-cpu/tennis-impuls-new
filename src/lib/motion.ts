/** Премиальные кривые easing — единый источник для CSS и Framer Motion */
export const EASE_PREMIUM = [0.21, 0.47, 0.32, 0.98] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_SMOOTH = [0.33, 1, 0.68, 1] as const;

export const transitionReveal = {
  duration: 0.75,
  ease: EASE_PREMIUM,
} as const;

export const transitionHeroItem = {
  duration: 0.9,
  ease: EASE_OUT_EXPO,
} as const;

export const transitionMenu = {
  duration: 0.38,
  ease: EASE_OUT_EXPO,
} as const;

export const transitionMenuItem = {
  duration: 0.32,
  ease: EASE_OUT_SMOOTH,
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.18 },
  },
} as const;

export const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionHeroItem,
  },
} as const;
