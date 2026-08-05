import { cn } from "@/lib/utils";
import { isWebp, jpegSibling } from "@/lib/image-fallback";

/**
 * Hero-фото: <picture> WebP + JPEG fallback (корп. прокси часто блокирует WebP).
 * Без onError-скрытия — при сбое остаётся CSS background-image на .jpg.
 */
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const jpg = jpegSibling(src) ?? src;
  const usePicture = isWebp(src) && Boolean(jpegSibling(src));

  const imgClass = cn(
    "absolute inset-0 z-0 h-full w-full object-cover",
    "brightness-[1.14] saturate-[1.2] contrast-[1.05]",
    "object-[46%_center] md:object-[48%_center] lg:object-center"
  );

  if (usePicture) {
    return (
      <picture>
        <source type="image/webp" srcSet={src} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={jpg}
          alt={alt}
          width={1920}
          height={1096}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className={imgClass}
        />
      </picture>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={jpg}
      alt={alt}
      width={1920}
      height={1096}
      fetchPriority="high"
      loading="eager"
      decoding="async"
      className={imgClass}
    />
  );
}
