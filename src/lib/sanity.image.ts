import createImageUrlBuilder from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity.client";

const builder = createImageUrlBuilder(sanityClient);

/** URL изображения из Sanity CDN (без /_next/image). */
export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
