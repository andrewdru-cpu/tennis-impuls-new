import type { PricingPlan } from "@/lib/pricing";

/**
 * Что внешний источник (Sanity) может предложить для карточки тарифа.
 * features / note / cta / ctaHref / featured — всегда только из local.
 */
export type PricingPlanOverlay = Partial<
  Pick<PricingPlan, "name" | "price" | "unit" | "description">
>;

/** Индекс карточки «Разовый визит» (аренда корта) в LOCAL_PRICING_CARDS. */
export const COURT_RENTAL_CARD_INDEX = 0;

/** Слова, которых в подписи карточки быть не должно (позиция снята с продажи). */
const BANNED_DESCRIPTION = /грунт/i;

/** «от 18 200 ₽» → 18200. Берём первое число, пробелы внутри числа игнорируем. */
export function parsePriceNumber(label: string): number | null {
  const match = label.match(/\d(?:[\d\s\u00a0\u202f]*\d)?/);
  if (!match) return null;
  const digits = match[0].replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

/**
 * Накладывает overlay на локальную карточку с защитой актуального прайса:
 *  - price принимается только если он не ниже локального (нельзя вернуть старые цифры);
 *  - description у карточки аренды корта всегда локальная;
 *  - description с упоминанием грунта игнорируется у любой карточки.
 */
export function applyPricingOverlay(
  base: PricingPlan,
  overlay: PricingPlanOverlay | undefined,
  index: number
): PricingPlan {
  const card: PricingPlan = { ...base, features: [...base.features] };
  if (!overlay) return card;

  const name = overlay.name?.trim();
  if (name) card.name = name;

  const price = overlay.price?.trim();
  if (price && price !== base.price) {
    const remote = parsePriceNumber(price);
    const local = parsePriceNumber(base.price);
    const allowed = remote !== null && (local === null || remote >= local);
    if (allowed) {
      card.price = price;
      const unit = overlay.unit?.trim();
      if (unit) card.unit = unit;
    }
  } else if (price) {
    const unit = overlay.unit?.trim();
    if (unit) card.unit = unit;
  }

  const description = overlay.description?.trim();
  if (
    description &&
    index !== COURT_RENTAL_CARD_INDEX &&
    !BANNED_DESCRIPTION.test(description)
  ) {
    card.description = description;
  }

  return card;
}
