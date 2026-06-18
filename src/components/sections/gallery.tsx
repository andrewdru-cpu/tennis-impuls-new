import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * 👉 ГАЛЕРЕЯ: список фото берётся из media.gallery (массив).
 *    Добавляйте/меняйте кадры в media.ts — сетка подстроится автоматически.
 *    Раскладка masonry-стиля: первый кадр крупный.
 */
export function Gallery() {
  return (
    <Section id="gallery">
        <SectionHeading
          align="center"
          eyebrow="Галерея"
          title="Атмосфера клуба «Импульс»"
          description="Корты, природа и эмоции игры — загляните внутрь."
        />

        <div className="section-inner grid grid-cols-2 gap-4 md:grid-cols-4">
          {media.gallery.map((img, i) => (
            <Reveal
              key={img.src}
              delay={i * 0.06}
              className={cn(
                "group",
                i === 0 && "col-span-2 row-span-2"
              )}
            >
              <MediaImage
                media={img}
                ratio={i === 0 ? "square" : "photo"}
                imageClassName="group-hover:scale-105"
                className="h-full"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </Reveal>
          ))}
        </div>
    </Section>
  );
}
