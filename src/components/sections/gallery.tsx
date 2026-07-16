"use client";

import { useCallback, useState } from "react";
import { ZoomIn } from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { GalleryModal } from "@/components/gallery/gallery-modal";
import { galleryItems, type GalleryItem } from "@/lib/gallery";
import { cn } from "@/lib/utils";

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className={cn(
          "interactive-lift group relative w-full overflow-hidden rounded-2xl text-left ring-2 ring-forest-900/6",
          "hover:ring-sand/50 hover:shadow-elevated",
          "focus-visible:outline-none focus-visible:ring-terracotta focus-visible:ring-offset-2"
        )}
        aria-label={`Открыть фото: ${item.caption}`}
      >
        <MediaImage
          media={item}
          ratio="square"
          imageClassName="transition-transform duration-750 ease-out-expo saturate-[1.08] group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent p-3",
            "opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4"
          )}
        >
          <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/90 text-white shadow-terracotta">
            <ZoomIn className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-white">{item.caption}</span>
        </div>
      </button>
    </Reveal>
  );
}

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem =
    activeIndex !== null ? galleryItems[activeIndex] ?? null : null;

  const open = useCallback((item: GalleryItem) => {
    const index = galleryItems.findIndex((g) => g.id === item.id);
    setActiveIndex(index >= 0 ? index : null);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) =>
      i !== null && i < galleryItems.length - 1 ? i + 1 : i
    );
  }, []);

  return (
    <Section
      id="gallery"
      className="overflow-hidden bg-gradient-to-b from-white via-lime-50/40 to-white"
    >
      <SectionHeading
        align="center"
        eyebrow="Галерея"
        title={
          <>
            Как выглядит{" "}
            <span className="text-ctt-red">ЦТТ «Импульс»</span>
          </>
        }
        description="Корты, тренировки, инфраструктура и атмосфера комплекса — загляните внутрь клуба."
      />

      <div className="section-inner">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item, i) => (
            <GalleryTile key={item.id} item={item} index={i} onOpen={open} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Нажмите на фото, чтобы открыть в полном размере
          </p>
        </Reveal>
      </div>

      <GalleryModal
        item={activeItem}
        onClose={close}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={activeIndex !== null && activeIndex > 0}
        hasNext={
          activeIndex !== null && activeIndex < galleryItems.length - 1
        }
      />
    </Section>
  );
}
