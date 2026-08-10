"use client";

import { UserRound } from "@/lib/icons";
import { PictureImage } from "@/components/media/picture-image";
import { cn } from "@/lib/utils";

type TeamPhotoProps = {
  photo?: string;
  alt: string;
  ratio?: "portrait" | "video" | "photo" | "wide";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const ratioClass = {
  portrait: "aspect-[3/4]",
  video: "aspect-video",
  photo: "aspect-[4/3]",
  wide: "aspect-[16/10]",
} as const;

function PhotoFallback({
  ratio,
  className,
  absolute = false,
}: {
  ratio: keyof typeof ratioClass;
  className?: string;
  absolute?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-gradient-to-br from-forest-100 via-lime-50/80 to-sand/20",
        absolute ? "absolute inset-0" : cn("relative", ratioClass[ratio]),
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <UserRound className="h-12 w-12 text-forest-900/20" aria-hidden />
      </div>
    </div>
  );
}

/**
 * Прямой /images/team/... без optimizer.
 * PictureImage: webp → jpg → нейтральная заглушка того же размера.
 */
export function TeamPhoto({
  photo,
  alt,
  ratio = "portrait",
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px",
}: TeamPhotoProps) {
  if (!photo) {
    return <PhotoFallback ratio={ratio} className={className} />;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-forest-100",
        ratioClass[ratio],
        className
      )}
    >
      <PictureImage
        src={photo}
        alt={alt}
        width={600}
        height={800}
        eager={priority}
        sizes={sizes}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center",
          imageClassName
        )}
        fallback={<PhotoFallback ratio={ratio} absolute />}
      />
    </div>
  );
}
