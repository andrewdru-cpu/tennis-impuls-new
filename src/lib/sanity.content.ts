import { media } from "@/lib/media";
import {
  formatNewsDate,
  newsArticles as localNews,
  type NewsArticle,
} from "@/lib/news";
import {
  pricingPlans as LOCAL_PRICING_CARDS,
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

/** «от 2 500 ₽ / час» → { price, unit } */
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
 * База UI = LOCAL_PRICING_CARDS (features, cta, ctaHref, note, featured).
 * Sanity по order 0,1,2 может перекрыть ТОЛЬКО:
 *   name, price/unit (из priceLabel), description (subtitle).
 * featured / badge / features / cta — никогда из Sanity.
 */
function mergePricingLabelsOnly(
  doc: SanityPricingDoc | null
): PricingPlan[] {
  const remote = doc?.plans?.filter(
    (p) => Boolean(p?.title?.trim() || p?.priceLabel?.trim())
  );
  if (!remote?.length) {
    return LOCAL_PRICING_CARDS.map((c) => ({ ...c, features: [...c.features] }));
  }

  const sorted = [...remote].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return LOCAL_PRICING_CARDS.map((base, index) => {
    const s = sorted[index];
    const card: PricingPlan = {
      name: base.name,
      price: base.price,
      unit: base.unit,
      description: base.description,
      features: [...base.features],
      note: base.note,
      cta: base.cta,
      ctaHref: base.ctaHref,
      featured: base.featured,
    };

    if (!s) return card;

    if (s.title?.trim()) card.name = s.title.trim();
    if (s.subtitle?.trim()) card.description = s.subtitle.trim();
    if (s.priceLabel?.trim()) {
      const parsed = parsePriceLabel(s.priceLabel);
      if (parsed.price) card.price = parsed.price;
      if (parsed.unit) card.unit = parsed.unit;
    }

    // Защита: если features вдруг пустые — вернуть local целиком
    if (!card.features.length) {
      return {
        ...base,
        features: [...base.features],
      };
    }

    return card;
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
        /* fallback image */
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
 * Карточки тарифов для главной.
 * DISABLE_SANITY_PRICING=1 → только local (дизайн 1:1).
 */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  const disable =
    process.env.DISABLE_SANITY_PRICING === "1" ||
    process.env.DISABLE_SANITY_PRICING === "true";

  if (disable) {
    return LOCAL_PRICING_CARDS.map((c) => ({
      ...c,
      features: [...c.features],
    }));
  }

  try {
    const doc = await sanityClient.fetch<SanityPricingDoc | null>(
      pricingQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return mergePricingLabelsOnly(doc);
  } catch (err) {
    console.error("[sanity] pricing fetch failed, using local fallback", err);
    return LOCAL_PRICING_CARDS.map((c) => ({
      ...c,
      features: [...c.features],
    }));
  }
}

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
