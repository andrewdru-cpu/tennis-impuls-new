/**
 * ============================================================================
 *  ЦЕНТРАЛИЗОВАННЫЙ КОНФИГ МЕДИА
 * ============================================================================
 *
 *  Здесь собраны ВСЕ пути к изображениям и видео сайта. Все фото —
 *  РЕАЛЬНЫЕ снимки клуба, обработанные в едином премиальном стиле
 *  (тёмно-зелёный грейдинг + лайм-акценты), экспортированы в .webp.
 *
 *  Структура папок:
 *    public/images/hero/        — медиа Hero-секции
 *    public/images/services/    — фото для блока «Услуги»
 *    public/images/team/        — портреты тренеров
 *    public/images/facilities/  — корты и инфраструктура
 *    public/images/gallery/     — галерея
 *    public/videos/             — видеофайлы (mp4 / webm) + постеры
 *
 *  👉 ЗАМЕНА ФОТО: положите новый файл в нужную папку и поменяйте путь здесь —
 *     компоненты (MediaImage / MediaVideo / HeroMedia) трогать не нужно.
 *
 *  Исходники и пайплайн обработки: см. /media-raw (скрипты _download / _process).
 * ============================================================================
 */

export type MediaImageSource = {
  /** Путь от корня /public, например "/images/hero/hero.webp" */
  src: string;
  /** Альтернативный текст (важно для SEO и доступности) */
  alt: string;
  /** Опционально: размеры исходника, помогают next/image (необязательно для fill) */
  width?: number;
  height?: number;
};

export type MediaVideoSource = {
  /** Список источников видео (mp4 обязателен, webm — опционально) */
  sources: { src: string; type: string }[];
  /** Постер-кадр, показывается до загрузки видео */
  poster: string;
  alt: string;
};

/**
 * Hero может работать в двух режимах. Чтобы переключиться на видео,
 * поменяй `kind` на "video" — компонент <HeroMedia /> сам подхватит изменение.
 */
export type HeroMedia =
  | ({ kind: "image" } & MediaImageSource)
  | ({ kind: "video" } & MediaVideoSource);

export const media = {
  /* -------------------------------------------------------------- HERO --- */
  hero: {
    // ⚙️ Переключатель Hero: "image" ↔ "video".
    // Сейчас — фирменное видео комплекса (аэросъёмка у леса + корты + игра).
    kind: "video",
    sources: [{ src: "/videos/hero.mp4", type: "video/mp4" }],
    poster: "/images/hero/poster.webp",
    alt: "Видеопрезентация теннисного центра ЦТТ Импульс у Лосиного Острова",
    // Запасной режим — статичное фото:
    // kind: "image",
    // src: "/images/hero/hero.webp",
    // alt: "Просторный крытый теннисный центр ЦТТ Импульс",
  } as HeroMedia,

  /* ---------------------------------------------------------- SERVICES --- */
  services: {
    individual: {
      src: "/images/services/individual.webp",
      alt: "Индивидуальная тренировка взрослого игрока на корте",
    },
    junior: {
      src: "/images/services/junior.webp",
      alt: "Юная теннисистка на тренировке в детской академии",
    },
    group: {
      src: "/images/services/group.webp",
      alt: "Группа игроков с ракетками на корте",
    },
    rental: {
      src: "/images/services/rental.webp",
      alt: "Профессиональный корт клуба для аренды",
    },
    fitness: {
      src: "/images/services/fitness.webp",
      alt: "Общефизическая подготовка в зале клуба",
    },
    padel: {
      src: "/images/services/padel.webp",
      alt: "Падел — ракетка и мячи на корте клуба",
    },
  } satisfies Record<string, MediaImageSource>,

  /* -------------------------------------------------------- FACILITIES --- */
  facilities: {
    indoor: {
      src: "/images/facilities/indoor.webp",
      alt: "Крытые корты клуба с профессиональным покрытием",
    },
    hall: {
      src: "/images/facilities/hall.webp",
      alt: "Просторный светлый теннисный манеж клуба",
    },
    outdoor: {
      src: "/images/facilities/outdoor.webp",
      alt: "Открытые грунтовые корты на свежем воздухе",
    },
    aerial: {
      src: "/images/facilities/aerial.webp",
      alt: "Теннисный комплекс ЦТТ Импульс с высоты, в окружении леса",
    },
  } satisfies Record<string, MediaImageSource>,

  /* ------------------------------------------------------------- TEAM --- */
  team: {
    coach1: {
      src: "/images/team/coach-1.webp",
      alt: "Тренер клуба ЦТТ Импульс на корте",
    },
    coach2: {
      src: "/images/team/coach-2.webp",
      alt: "Главный тренер клуба ЦТТ Импульс",
    },
    coach3: {
      src: "/images/team/coach-3.webp",
      alt: "Тренер клуба ЦТТ Импульс на корте",
    },
    coach4: {
      src: "/images/team/coach-4.webp",
      alt: "Тренер клуба ЦТТ Импульс на корте",
    },
    coach5: {
      src: "/images/team/coach-5.webp",
      alt: "Тренер по карате Киокушинкай",
    },
  } satisfies Record<string, MediaImageSource>,

  /* ---------------------------------------------------------- GALLERY --- */
  gallery: [
    { src: "/images/gallery/01.webp", alt: "Юная теннисистка отрабатывает удар" },
    { src: "/images/gallery/02.webp", alt: "Игрок в динамике на корте" },
    { src: "/images/gallery/03.webp", alt: "Тренировка на грунтовом корте" },
    { src: "/images/gallery/04.webp", alt: "Юный игрок в движении на корте" },
    { src: "/images/gallery/05.webp", alt: "Участники клубного турнира" },
    {
      src: "/images/facilities/aerial.webp",
      alt: "Теннисный комплекс ЦТТ Импульс с высоты",
    },
  ] satisfies MediaImageSource[],
} as const;
