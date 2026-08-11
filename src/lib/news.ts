import { media, type MediaImageSource } from "@/lib/media";

export type NewsArticle = {
  id: string;
  /** Читаемая дата, например «1 мая 2026» */
  date: string;
  dateISO: string;
  title: string;
  excerpt: string;
  /** Текст модалки — краткий, на базе excerpt */
  body: string[];
  image: MediaImageSource;
};

const MONTHS_RU = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
] as const;

/** ISO YYYY-MM-DD → «1 мая 2026» */
export function formatNewsDate(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  return `${d} ${MONTHS_RU[m - 1]} ${y}`;
}

/**
 * Только актуальные новости с корректными фото.
 * Удалены: Чусова, Гагарина/Лебедев, Глушакова (неверные фото / устаревшее).
 */
const newsSource: Omit<NewsArticle, "date">[] = [
  {
    id: "padel-rental-may-2026",
    dateISO: "2026-05-01",
    title: "Ура! С 12 мая в нашем центре можно арендовать падел-корт",
    excerpt:
      "Открыта аренда падел-корта — записывайтесь на игру и тренировки.",
    body: [
      "Открыта аренда падел-корта — записывайтесь на игру и тренировки.",
    ],
    image: media.news.padel,
  },
  {
    id: "victory-podkopaeva-2025",
    dateISO: "2025-10-18",
    title: "Поздравляем с победой! Подкопаева Вера",
    excerpt: "Поздравляем спортсменку центра с победой на турнире.",
    body: ["Поздравляем спортсменку центра с победой на турнире."],
    image: media.news.podkopaeva,
  },
];

/** Новости отсортированы от новых к старым */
export const newsArticles: NewsArticle[] = newsSource
  .map((item) => ({
    ...item,
    date: formatNewsDate(item.dateISO),
  }))
  .sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );

export function getNewsArticle(id: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.id === id);
}

/** Новость опубликована в последние N дней */
export function isRecentNews(dateISO: string, days = 7): boolean {
  const published = new Date(dateISO);
  const now = new Date();
  const diffMs = now.getTime() - published.getTime();
  return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
}
