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
 *    public/images/kids/        — детские тренировки по теннису
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
  /** Постер-кадр на десктопе до загрузки видео */
  poster: string;
  alt: string;
  /** Статичный фон на мобильных (<768px) — WebP */
  mobile: MediaImageSource;
  /** JPEG fallback для мобильных (опционально) */
  mobileFallback?: string;
};

/**
 * Hero может работать в двух режимах. Чтобы переключиться на видео,
 * поменяй `kind` на "video" — компонент <HeroMedia /> сам подхватит изменение.
 */
export type HeroMedia =
  | ({ kind: "image" } & MediaImageSource)
  | ({ kind: "video" } & MediaVideoSource);

/** 👉 ДЕТСКИЙ ТЕННИС: замените файлы в public/images/kids/ и при необходимости alt здесь */
const kidsMedia = {
  training1: {
    src: "/images/kids/kids-training-1.webp",
    alt: "Детская тренировка по теннису на корте ЦТТ Импульс",
  },
  training2: {
    src: "/images/kids/kids-training-2.webp",
    alt: "Групповое занятие детской школы тенниса в клубе",
  },
} satisfies Record<string, MediaImageSource>;

export const media = {
  /* -------------------------------------------------------------- HERO --- */
  hero: {
    kind: "image",
    src: "/images/hero/new-hero.webp",
    alt: "ЦТТ Импульс — спортивный комплекс у Лосиного Острова",
    width: 1920,
    height: 1096,
  } as HeroMedia,

  /* -------------------------------------------------------------- PROMO --- */
  /** Промо-ролик блока «Видео» — единственный видеофайл сайта */
  promo: {
    src: "/videos/impuls-promo.mp4",
    poster: "/images/videos/impuls-promo-poster.jpg",
    alt: "Промо-видео спортивного комплекса ЦТТ Импульс",
  },

  /* ------------------------------------------------------------- KIDS --- */
  kids: kidsMedia,

  /* ---------------------------------------------------------- SERVICES --- */
  services: {
    individual: {
      src: "/images/services/individual.webp",
      alt: "Индивидуальная тренировка взрослого игрока на корте",
    },
    junior: kidsMedia.training1,
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
      src: "/images/services/IMG_8857.webp",
      alt: "Падел — ракетка и мячи на корте клуба",
    },
    groundCourt: {
      src: "/images/services/ground-court.jpg",
      alt: "Грунтовые корты с покрытием Tennisit в ЦТТ Импульс",
    },
    tableTennis: {
      src: "/images/services/table-tennis.webp",
      alt: "Настольный теннис в ЦТТ Импульс",
    },
    lockerMen: {
      src: "/images/services/locker-men.webp",
      alt: "Мужская раздевалка ЦТТ Импульс",
    },
    lockerWomen: {
      src: "/images/services/locker-women.webp",
      alt: "Женская раздевалка ЦТТ Импульс",
    },
    vipLocker1: {
      src: "/images/services/vip-locker-1.webp",
      alt: "VIP-раздевалка ЦТТ Импульс",
    },
    vipSauna1: {
      src: "/images/services/vip-sauna-1.webp",
      alt: "Сауна VIP-раздевалки",
    },
    yoga: {
      src: "/images/services/yoga.webp",
      alt: "Йога в ЦТТ Импульс",
    },
    groupPrograms: {
      src: "/images/services/group-programs.webp",
      alt: "Групповые программы в ЦТТ Импульс",
    },
    danceStudio: {
      src: "/images/services/dance-studio.JPG",
      alt: "Танцевальная студия в ЦТТ Импульс",
    },
    dance: {
      src: "/images/services/dance.webp",
      alt: "Танцы в ЦТТ Импульс",
    },
    gymHall: {
      src: "/images/services/gym-hall.jpg",
      alt: "Тренажёрный зал в ЦТТ Импульс",
    },
    ofpTraining: {
      src: "/images/services/ofp-training.JPG",
      alt: "Зал общей физической подготовки в ЦТТ Импульс",
    },
    ofp: {
      src: "/images/facilities/hall.webp",
      alt: "Зал общей физической подготовки в клубе",
    },
    karate: {
      src: "/images/services/karate.JPG",
      alt: "Секция каратэ в ЦТТ Импульс",
    },
    massage: {
      src: "/images/team/privalov-massage.webp",
      alt: "Массаж в ЦТТ Импульс — специалист Привалов",
    },
    sportShop: {
      src: "/images/services/sport-shop.webp",
      alt: "Спортивный магазин ЦТТ Импульс — аренда и продажа инвентаря",
    },
    activities: {
      src: "/images/gallery/02.webp",
      alt: "Дополнительные направления на территории комплекса",
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
    lockerBlue: {
      src: "/images/facilities/locker-blue.jpg",
      alt: "Синяя раздевалка в ЦТТ Импульс",
    },
    lockerPink: {
      src: "/images/facilities/locker-pink.jpg",
      alt: "Розовая раздевалка в ЦТТ Импульс",
    },
    vipLocker1: {
      src: "/images/facilities/vip-locker-1.jpg",
      alt: "VIP-раздевалка в ЦТТ Импульс",
    },
    vipLocker2: {
      src: "/images/facilities/vip-locker-2.jpg",
      alt: "VIP-раздевалка — зона отдыха в ЦТТ Импульс",
    },
    vipLocker3: {
      src: "/images/facilities/vip-locker-3.jpg",
      alt: "VIP-раздевалка — интерьер в ЦТТ Импульс",
    },
  } satisfies Record<string, MediaImageSource>,

  /* ------------------------------------------------------------- TEAM --- */
  team: {
    paraskeva: {
      src: "/images/team/paraskeva.webp",
      alt: "Параскева Оксана — тренер по теннису ЦТТ Импульс",
    },
    rakhmanina: {
      src: "/images/team/rakhmanina.webp",
      alt: "Мария Рахманина — тренер по теннису ЦТТ Импульс",
    },
    baldin: {
      src: "/images/team/baldin.webp",
      alt: "Александр Балдин — тренер по теннису ЦТТ Импульс",
    },
    averin: {
      src: "/images/team/averin.webp",
      alt: "Андрей Аверин — тренер по теннису ЦТТ Импульс",
    },
    kovgan: {
      src: "/images/team/kovgan.webp",
      alt: "Евгений Ковган — тренер групповых фитнес-программ",
    },
    stoletnyaya: {
      src: "/images/team/stoletnyaya.webp",
      alt: "Столетняя Юлия — тренер групповых программ",
    },
    kostanyan: {
      src: "/images/team/kostanyan.webp",
      alt: "Костанян Аркадий — тренер каратэ киокушинкай",
    },
    privalov: {
      src: "/images/team/privalov-massage.webp",
      alt: "Привалов Роман — массажист-реабилитолог",
    },
  } satisfies Record<string, MediaImageSource>,

  /* ------------------------------------------------------------- NEWS --- */
  news: {
    padel: {
      src: "/images/news/padel.webp",
      alt: "Падел-корт в ЦТТ Импульс",
    },
    podkopaeva: {
      src: "/images/news/podkopaeva.webp",
      alt: "Победа Подкопаевой Веры на турнире клуба",
    },
    kostanyan: {
      src: "/images/news/kostanyan.webp",
      alt: "Костанян Аркадий — чемпион мира среди мастеров",
    },
    family: {
      src: "/images/gallery/05.webp",
      alt: "Семейные занятия теннисом в клубе",
    },
    junior: kidsMedia.training2,
    tournament: {
      src: "/images/gallery/02.webp",
      alt: "Турнир выходного дня на кортах клуба",
    },
  } satisfies Record<string, MediaImageSource>,

  /* ---------------------------------------------------------- GALLERY --- */
  gallery: [
    kidsMedia.training1,
    { src: "/images/gallery/02.webp", alt: "Игрок в динамике на корте" },
    { src: "/images/gallery/03.webp", alt: "Тренировка на грунтовом корте" },
    kidsMedia.training2,
    { src: "/images/gallery/05.webp", alt: "Участники клубного турнира" },
    {
      src: "/images/facilities/aerial.webp",
      alt: "Теннисный комплекс ЦТТ Импульс с высоты",
    },
  ] satisfies MediaImageSource[],
} as const;
