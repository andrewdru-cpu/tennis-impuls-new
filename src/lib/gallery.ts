import { media, type MediaImageSource } from "@/lib/media";

/**
 * 👉 ГАЛЕРЕЯ: добавляйте и меняйте кадры здесь.
 *    Детские фото — в media.kids (public/images/kids/).
 */
export type GalleryItem = MediaImageSource & {
  id: string;
  caption: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g01",
    ...media.kids.training1,
    caption: "Тренировки для детей",
  },
  {
    id: "g02",
    src: "/images/gallery/02.webp",
    alt: "Игрок в динамике на корте",
    caption: "Игра на корте",
  },
  {
    id: "g03",
    src: "/images/gallery/03.webp",
    alt: "Тренировка на грунтовом корте",
    caption: "Грунтовые корты Tennisit",
  },
  {
    id: "g04",
    ...media.kids.training2,
    caption: "Детский теннис",
  },
  {
    id: "g05",
    src: "/images/gallery/05.webp",
    alt: "Участники клубного турнира",
    caption: "Клубные турниры",
  },
  {
    id: "g06",
    src: "/images/gallery/06.webp",
    alt: "Атмосфера тренировки в клубе",
    caption: "Атмосфера клуба",
  },
  {
    id: "g07",
    src: "/images/facilities/indoor.webp",
    alt: "Крытые корты с профессиональным покрытием",
    caption: "Крытые корты",
  },
  {
    id: "g08",
    src: "/images/facilities/aerial.webp",
    alt: "Теннисный комплекс ЦТТ Импульс с высоты",
    caption: "Комплекс с высоты",
  },
];
