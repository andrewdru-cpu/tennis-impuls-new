import { cn } from "@/lib/utils";
import { PictureImage } from "@/components/media/picture-image";

/**
 * Hero-фото: PictureImage (webp → jpg по onError, если прокси режет WebP).
 * Если и JPEG недоступен — img исчезает, остаётся CSS background-image
 * на .jpg + solid #0A2F24 из HeroMedia. Вёрстка текста не зависит от фото.
 */
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <PictureImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      eager
      className={cn(
        "absolute inset-0 z-0 h-full w-full object-cover",
        "brightness-[1.14] saturate-[1.2] contrast-[1.05]",
        "object-[46%_center] md:object-[48%_center] lg:object-center"
      )}
      fallback={null}
    />
  );
}
