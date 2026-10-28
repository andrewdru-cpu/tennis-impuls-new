/** Абонементы для формы записи / прайса */

export type AbonementItem = {
  id: string;
  title: string;
  /** Цена с валютой, например «15 200 ₽» */
  price: string;
};

export type AbonementCategory = {
  id: string;
  title: string;
  items: AbonementItem[];
};

export const ABONEMENT_ADULTS_8_ID = "adults-1h-8";
export const ABONEMENT_RED_BALL_8_ID = "red-ball-1h-8";

export const abonementCategories: AbonementCategory[] = [
  {
    id: "tennis-groups",
    title: "Теннис — группы",
    items: [
      { id: "adults-1h-4", title: "Взрослые 1 ч × 4", price: "10 000 ₽" },
      { id: ABONEMENT_ADULTS_8_ID, title: "Взрослые 1 ч × 8", price: "18 200 ₽" },
      { id: "adults-15h-4", title: "Взрослые 1,5 ч × 4", price: "15 000 ₽" },
      { id: "adults-15h-8", title: "Взрослые 1,5 ч × 8", price: "27 200 ₽" },
      {
        id: "red-ball-1h-4",
        title: "«Красный мяч» 1 ч × 4",
        price: "6 900 ₽",
      },
      {
        id: ABONEMENT_RED_BALL_8_ID,
        title: "«Красный мяч» 1 ч × 8",
        price: "11 600 ₽",
      },
      {
        id: "red-ball-15h-4",
        title: "«Красный мяч» 1,5 ч × 4",
        price: "8 600 ₽",
      },
      {
        id: "red-ball-15h-8",
        title: "«Красный мяч» 1,5 ч × 8",
        price: "16 800 ₽",
      },
      { id: "kids-1h-4", title: "Детская 1 ч × 4", price: "7 900 ₽" },
      { id: "kids-1h-8", title: "Детская 1 ч × 8", price: "13 000 ₽" },
      { id: "kids-15h-4", title: "Детская 1,5 ч × 4", price: "10 000 ₽" },
      { id: "kids-15h-8", title: "Детская 1,5 ч × 8", price: "18 200 ₽" },
    ],
  },
  {
    id: "fitness",
    title: "Фитнес",
    items: [
      { id: "fitness-1m", title: "Fitness 1 мес", price: "4 000 ₽" },
      { id: "fitness-3m", title: "Fitness 3 мес", price: "7 000 ₽" },
      { id: "fitness-6m", title: "Fitness 6 мес", price: "10 500 ₽" },
      { id: "fitness-1y", title: "Fitness 1 год", price: "18 500 ₽" },
      {
        id: "fitness-1y-day",
        title: "Fitness 1 год дневная",
        price: "16 000 ₽",
      },
      { id: "karate-abonement", title: "Каратэ абонемент", price: "5 000 ₽" },
    ],
  },
  {
    id: "personal-packs",
    title: "Пакеты персональных",
    items: [
      {
        id: "pt10-profi",
        title: "10 ПТ теннис Профи",
        price: "28 000 ₽",
      },
      {
        id: "pt10-master",
        title: "10 ПТ теннис Мастер",
        price: "30 000 ₽",
      },
      {
        id: "pt10-master-plus",
        title: "10 ПТ теннис Мастер+",
        price: "32 000 ₽",
      },
      { id: "pt10-fitness", title: "10 ПТ фитнес", price: "15 000 ₽" },
    ],
  },
];

export const allAbonements: AbonementItem[] = abonementCategories.flatMap(
  (c) => c.items
);

export function findAbonement(id: string): AbonementItem | undefined {
  return allAbonements.find((item) => item.id === id);
}

export function formatAbonementLabel(item: AbonementItem): string {
  return `${item.title} — ${item.price}`;
}
