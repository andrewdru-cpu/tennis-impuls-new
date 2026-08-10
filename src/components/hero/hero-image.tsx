import { cn } from "@/lib/utils";
import { PictureImage } from "@/components/media/picture-image";

/**
 * Hero-фото: PictureImage (webp → jpg по onError, если прокси режет WebP).
 * eager + fetchPriority=high. Без /_next/image.
 * mobileSrc — только если файл реально существует (не выдумывать).
 */
export function HeroImage({
  src,
  alt,
  mobileSrc,
}: {
  src: string;
  alt: string;
  mobileSrc?: string;
}) {
  return (
    <PictureImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      eager
      sizes="100vw"
      mobileSrc={mobileSrc}
      className={cn(
        "absolute inset-0 z-0 h-full w-full object-cover",
        "brightness-[1.14] saturate-[1.2] contrast-[1.05]",
        "object-[46%_center] md:object-[48%_center] lg:object-center"
      )}
      fallback={null}
    />
  );
}
