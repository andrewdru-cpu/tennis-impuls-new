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

function mapSanityPlans(doc: SanityPricingDoc | null): PricingPlan[] | null {
  const plans = doc?.plans?.filter((p) => p?.title && p?.priceLabel);
  if (!plans?.length) return null;

  return [...plans]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((p) => {
      const label = p.priceLabel!.trim();
      // «от 2 500 ₽ / час» → price + unit (грубый разбор для вёрстки)
      const unitMatch = label.match(/\s*(₽.*)$/);
      const price = unitMatch
        ? label.slice(0, label.length - unitMatch[1].length).trim()
        : label;
      const unit = unitMatch ? unitMatch[1].trim() : "";

      return {
        name: p.title!,
        price,
        unit,
        description: p.subtitle?.trim() || "",
        features: [],
        cta: "Забронировать",
        featured: Boolean(p.featured),
      } satisfies PricingPlan;
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
 * Карточки тарифов: Sanity → иначе локальный fallback.
 * Ошибка сети / пустой CMS не ломает сайт.
 */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const doc = await sanityClient.fetch<SanityPricingDoc | null>(
      pricingQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return mapSanityPlans(doc) ?? localPricing;
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
