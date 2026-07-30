/**
 * Актуальный прайс ЦТТ «Импульс».
 * Карточки на главной + полный прайс (accordion).
 */

export type PricingPlan = {
  name: string;
  /** Крупная цифра, например «от 2 500» */
  price: string;
  unit: string;
  description: string;
  features: string[];
  /** Мелкая приписка под пунктами */
  note?: string;
  cta: string;
  /** Ссылка CTA — по умолчанию #booking */
  ctaHref?: string;
  featured?: boolean;
};

export type PriceTableSection = {
  id: string;
  title: string;
  columns?: string[];
  rows: {
    label: string;
    values: string[];
  }[];
  note?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Разовый визит",
    price: "от 2 500",
    unit: "₽ / час",
    description: "аренда корта (хард / падел / грунт)",
    features: [
      "Аренда корта 1 час",
      "Крытый Hard, падел или открытый грунт",
      "Прокат ракеток от 500 ₽",
      "Доступ к раздевалкам",
    ],
    cta: "Забронировать",
  },
  {
    name: "Абонемент PRO",
    price: "от 15 200",
    unit: "₽",
    description: "8 групповых занятий × 1 час (взрослые)",
    features: [
      "8 тренировок в группе",
      "Варианты 1 ч и 1,5 ч",
      "Крытые корты круглый год",
      "Зал ОФП",
    ],
    note: "разовое взрослое 1 ч — 2 600 ₽",
    cta: "Оформить абонемент",
    ctaHref: "/?type=abonement&abonement=adults-1h-8#booking",
    featured: true,
  },
  {
    name: "Детская школа по теннису",
    price: "от 9 600",
    unit: "₽",
    description: "8 занятий «красный мяч» × 1 час",
    features: [
      "8 групповых занятий",
      "Форматы «красный мяч» и детская группа",
      "Профессиональные детские тренеры",
      "Участие в турнирах центра",
    ],
    note: "разовое «красный мяч» 1 ч — 1 700 ₽",
    cta: "Записать ребёнка",
    ctaHref: "/?type=abonement&abonement=red-ball-1h-8#booking",
  },
];

export const fullPriceSections: PriceTableSection[] = [
  {
    id: "group-tennis",
    title: "Групповой теннис",
    columns: ["Разово", "4 занятия", "8 занятий"],
    rows: [
      { label: "Взрослые 1 ч", values: ["2 600 ₽", "8 400 ₽", "15 200 ₽"] },
      { label: "Взрослые 1,5 ч", values: ["3 900 ₽", "12 600 ₽", "22 800 ₽"] },
      { label: "«Красный мяч» 1 ч", values: ["1 700 ₽", "5 800 ₽", "9 600 ₽"] },
      {
        label: "«Красный мяч» 1,5 ч",
        values: ["2 500 ₽", "7 200 ₽", "14 000 ₽"],
      },
      { label: "Детская 1 ч", values: ["2 300 ₽", "6 600 ₽", "10 800 ₽"] },
      { label: "Детская 1,5 ч", values: ["3 200 ₽", "8 400 ₽", "15 200 ₽"] },
    ],
  },
  {
    id: "personal-tennis",
    title: "Персональный теннис",
    columns: ["Профи", "Мастер", "Мастер+"],
    rows: [
      {
        label: "1 занятие",
        values: ["2 800 ₽", "3 000 ₽", "3 200 ₽"],
      },
      {
        label: "Пакет 10",
        values: ["25 000 ₽", "27 000 ₽", "29 000 ₽"],
      },
      {
        label: "Сплит 1",
        values: ["3 400 ₽", "3 600 ₽", "3 800 ₽"],
      },
      {
        label: "Пакет 10 сплит",
        values: ["31 000 ₽", "32 000 ₽", "34 000 ₽"],
      },
    ],
  },
  {
    id: "court-rental",
    title: "Аренда кортов",
    columns: ["Разово", "Выкуп от 6 ч"],
    rows: [
      { label: "Hard будни 07–09", values: ["2 500 ₽", "2 300 ₽"] },
      { label: "Hard будни 09–15", values: ["2 800 ₽", "2 600 ₽"] },
      { label: "Hard будни 15–22", values: ["3 500 ₽", "3 250 ₽"] },
      { label: "Hard будни 22–23:30", values: ["2 600 ₽", "2 500 ₽"] },
      { label: "Hard вых. 07–09", values: ["2 600 ₽", "2 450 ₽"] },
      { label: "Hard вых. 09–22", values: ["3 600 ₽", "3 350 ₽"] },
      { label: "Hard вых. 22–23:30", values: ["2 600 ₽", "2 500 ₽"] },
      {
        label: "Падел",
        values: ["как Hard", "как Hard"],
      },
      { label: "Грунт", values: ["2 500 ₽", "2 350 ₽"] },
      { label: "Детский корт", values: ["1 600 ₽", "1 400 ₽"] },
    ],
    note: "Падел — те же слоты и цены, что Hard. +800 ₽ за игрока сверх 2-х (макс. 4) на Hard",
  },
  {
    id: "fitness",
    title: "Фитнес",
    rows: [
      { label: "Разово", values: ["800 ₽"] },
      { label: "Разово (родители)", values: ["700 ₽"] },
      { label: "1 месяц", values: ["4 000 ₽"] },
      { label: "3 месяца", values: ["7 000 ₽"] },
      { label: "6 месяцев", values: ["10 500 ₽"] },
      { label: "6 месяцев (продление)", values: ["9 500 ₽"] },
      { label: "1 год", values: ["18 500 ₽"] },
      { label: "1 год (продление)", values: ["17 000 ₽"] },
      { label: "Дневная (год)", values: ["16 000 ₽"] },
      { label: "Дневная (продление)", values: ["15 000 ₽"] },
      { label: "Персональная ПТ", values: ["1 800 ₽"] },
      { label: "Пакет 10 ПТ", values: ["15 000 ₽"] },
      { label: "Сплит", values: ["1 200 ₽"] },
      { label: "Пакет 10 сплит / чел", values: ["10 000 ₽"] },
      { label: "Каратэ абонемент", values: ["5 000 ₽"] },
    ],
  },
  {
    id: "vip-inventory",
    title: "VIP и инвентарь",
    rows: [
      { label: "VIP 3 ч (1 чел)", values: ["1 000 ₽"] },
      { label: "VIP 6 посещений", values: ["4 000 ₽"] },
      { label: "VIP до 6 чел", values: ["3 000 ₽"] },
      { label: "Мячи (колба)", values: ["300 ₽"] },
      { label: "Корзина мячей", values: ["600 ₽"] },
      { label: "Ракетка (прокат)", values: ["500 ₽"] },
      { label: "Шкаф 1 мес", values: ["2 000 ₽"] },
      { label: "Шкаф 90 дней", values: ["4 500 ₽"] },
      { label: "Шкаф 6 мес", values: ["8 000 ₽"] },
      { label: "Шкаф 1 год", values: ["15 000 ₽"] },
    ],
  },
  {
    id: "ofp",
    title: "Зал ОФП",
    rows: [
      { label: "1–5 человек", values: ["1 000 ₽"] },
      { label: "Группа от 5 человек", values: ["1 300 ₽"] },
      { label: "Выкуп от 5 ч", values: ["900 ₽"] },
      { label: "Для спортсменов", values: ["800 ₽"] },
    ],
  },
];
