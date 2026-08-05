/**
 * JPEG sibling for WebP paths — corp proxies often block image/webp.
 * "/images/foo.webp" → "/images/foo.jpg"
 */
export function jpegSibling(src: string): string | undefined {
  if (/\.webp$/i.test(src)) return src.replace(/\.webp$/i, ".jpg");
  return undefined;
}

export function isWebp(src: string): boolean {
  return /\.webp$/i.test(src);
}
