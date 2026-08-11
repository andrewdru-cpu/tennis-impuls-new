import type { SanityImageSource } from "@sanity/image-url";

/** GROQ: singleton тарифов */
export const pricingQuery = `*[_type == "pricing" && _id == "pricing"][0]{
  title,
  plans[]{
    title,
    priceLabel,
    subtitle,
    featured,
    order
  }
}`;

/** GROQ: новости */
export const newsArticlesQuery = `*[_type == "newsArticle" && defined(slug.current)] | order(date desc){
  "id": slug.current,
  title,
  "dateISO": date,
  excerpt,
  mainImage
}`;

export type SanityPricingDoc = {
  title?: string;
  plans?: {
    title?: string;
    priceLabel?: string;
    subtitle?: string;
    featured?: boolean;
    order?: number;
  }[];
};

export type SanityNewsDoc = {
  id: string;
  title: string;
  dateISO: string;
  excerpt: string;
  mainImage?: SanityImageSource & { alt?: string };
};
