import { media } from "@/lib/media";
import {
  formatNewsDate,
  newsArticles as localNews,
  type NewsArticle,
} from "@/lib/news";
import {
  pricingPlans as localPricing,
  type PricingPlan,
} from "@/lib/pricing";
import { sanityClient } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.image";
import {
  newsArticlesQuery,
  pricingQuery,
  type SanityNewsDoc,
  type SanityPricingDoc,
} from "@/lib/sanity.queries";

/** «от 2 500 ₽ / час» → { price, unit } для вёрстки карточки */
function parsePriceLabel(label: string): { price: string; unit: string } {
  const trimmed = label.trim();
  const unitMatch = trimmed.match(/\s*(₽.*)$/);
  if (!unitMatch) {
    return { price: trimmed, unit: "" };
  }
  return {
    price: trimmed.slice(0, trimmed.length - unitMatch[1].length).trim(),
    unit: unitMatch[1].trim(),
  };
}

/**
 * Локальный pricing.ts = UI-структура (features, CTA, note, featured-база).
 * Sanity перекрывает только подписи: title, priceLabel, subtitle, featured —
 * по индексу order (0…n), без замены карточек целиком.
 * Пустой CMS / ошибка → 100% локальный вид.
 */
function mergePricingWithSanity(doc: SanityPricingDoc | null): PricingPlan[] {
  const remote = doc?.plans?.filter(
    (p) => Boolean(p?.title?.trim() || p?.priceLabel?.trim())
  );
  if (!remote?.length) {
    return localPricing;
  }

  const sorted = [...remote].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return localPricing.map((local, index) => {
    const s = sorted[index];
    if (!s) return local;

    const fromLabel = s.priceLabel?.trim()
      ? parsePriceLabel(s.priceLabel)
      : null;

    return {
      ...local,
      name: s.title?.trim() || local.name,
      description: s.subtitle?.trim() || local.description,
      price: fromLabel?.price || local.price,
      unit:
        fromLabel && s.priceLabel?.trim()
          ? fromLabel.unit || local.unit
          : local.unit,
      featured:
        typeof s.featured === "boolean" ? s.featured : local.featured,
    };
  });
}

function mapSanityNews(docs: SanityNewsDoc[] | null): NewsArticle[] | null {
  if (!docs?.length) return null;

  return docs.map((doc) => {
    const dateISO = doc.dateISO;
    let imageSrc = media.news.padel.src;
    let imageAlt = doc.title;

    if (doc.mainImage) {
      try {
        imageSrc = urlForImage(doc.mainImage)
          .width(1200)
          .height(900)
          .format("jpg")
          .quality(82)
          .url();
        imageAlt =
          (doc.mainImage as { alt?: string }).alt?.trim() || doc.title;
      } catch {
        /* оставляем fallback-картинку */
      }
    }

    return {
      id: doc.id,
      dateISO,
      date: formatNewsDate(dateISO),
      title: doc.title,
      excerpt: doc.excerpt,
      body: [doc.excerpt],
      image: { src: imageSrc, alt: imageAlt },
    } satisfies NewsArticle;
  });
}

/**
 * Карточки тарифов: локальный UI + опциональные подписи из Sanity.
 */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const doc = await sanityClient.fetch<SanityPricingDoc | null>(
      pricingQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return mergePricingWithSanity(doc);
  } catch (err) {
    console.error("[sanity] pricing fetch failed, using local fallback", err);
    return localPricing;
  }
}

/**
 * Новости: Sanity → иначе локальный fallback.
 */
export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const docs = await sanityClient.fetch<SanityNewsDoc[] | null>(
      newsArticlesQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return mapSanityNews(docs) ?? localNews;
  } catch (err) {
    console.error("[sanity] news fetch failed, using local fallback", err);
    return localNews;
  }
}
