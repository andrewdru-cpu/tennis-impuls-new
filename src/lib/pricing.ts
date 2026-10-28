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
  /** Ссылка CTA — по умолчанию расписание (бронь корта) */
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
    description: "аренда корта (падел от 2 500, хард от 3 000)",
    features: [
      "Аренда корта 1 час",
      "Крытый Hard или падел",
      "Прокат ракеток от 500 ₽",
      "Доступ к раздевалкам",
    ],
    cta: "Забронировать",
    ctaHref: "/schedule",
  },
  {
    name: "Абонемент PRO",
    price: "от 18 200",
    unit: "₽",
    description: "8 групповых занятий × 1 час (взрослые)",
    features: [
      "8 тренировок в группе",
      "Варианты 1 ч и 1,5 ч",
      "Крытые корты круглый год",
      "Зал ОФП",
    ],
    note: "разовое взрослое 1 ч — 3 100 ₽",
    cta: "Оформить абонемент",
    ctaHref: "/?type=abonement&abonement=adults-1h-8#booking",
    featured: true,
  },
  {
    name: "Детская школа по теннису",
    price: "от 11 600",
    unit: "₽",
    description: "8 занятий «красный мяч» × 1 час",
    features: [
      "8 групповых занятий",
      "Форматы «красный мяч» и детская группа",
      "Профессиональные детские тренеры",
      "Участие в турнирах центра",
    ],
    note: "разовое «красный мяч» 1 ч — 2 000 ₽",
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
      { label: "Взрослые 1 ч", values: ["3 100 ₽", "10 000 ₽", "18 200 ₽"] },
      { label: "Взрослые 1,5 ч", values: ["4 650 ₽", "15 000 ₽", "27 200 ₽"] },
      { label: "«Красный мяч» 1 ч", values: ["2 000 ₽", "6 900 ₽", "11 600 ₽"] },
      {
        label: "«Красный мяч» 1,5 ч",
        values: ["3 000 ₽", "8 600 ₽", "16 800 ₽"],
      },
      { label: "Детская 1 ч", values: ["2 700 ₽", "7 900 ₽", "13 000 ₽"] },
      { label: "Детская 1,5 ч", values: ["4 050 ₽", "10 000 ₽", "18 200 ₽"] },
    ],
  },
  {
    id: "personal-tennis",
    title: "Персональный теннис",
    columns: ["Профи", "Мастер", "Мастер+"],
    rows: [
      {
        label: "1 занятие",
        values: ["3 000 ₽", "3 300 ₽", "3 500 ₽"],
      },
      {
        label: "Сплит 1",
        values: ["3 700 ₽", "3 900 ₽", "4 200 ₽"],
      },
      {
        label: "Пакет 10",
        values: ["28 000 ₽", "30 000 ₽", "32 000 ₽"],
      },
      {
        label: "Пакет 10 сплит",
        values: ["34 000 ₽", "36 000 ₽", "38 000 ₽"],
      },
    ],
  },
  {
    id: "court-rental",
    title: "Аренда кортов",
    columns: ["Будни", "Выходные"],
    rows: [
      { label: "Hard 07–09", values: ["3 000 ₽", "3 100 ₽"] },
      { label: "Hard 09–15", values: ["3 100 ₽", "4 300 ₽"] },
      { label: "Hard 15–22", values: ["4 200 ₽", "4 300 ₽"] },
      { label: "Hard 22–23:30", values: ["3 100 ₽", "3 100 ₽"] },
      { label: "Падел 07–09", values: ["2 500 ₽", "2 600 ₽"] },
      { label: "Падел 09–15", values: ["2 800 ₽", "3 600 ₽"] },
      { label: "Падел 15–22", values: ["3 500 ₽", "3 600 ₽"] },
      { label: "Падел 22–23:30", values: ["2 600 ₽", "2 600 ₽"] },
      {
        label: "Детский корт (мероприятие)",
        values: ["1 900 ₽", "1 900 ₽"],
      },
      {
        label: "Детский корт (от выкупа)",
        values: ["1 650 ₽", "1 650 ₽"],
      },
      { label: "Грунт", values: ["не в продаже", "не в продаже"] },
    ],
    note: "+800 ₽ за игрока сверх 2-х (макс. 4) на Hard",
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
      { label: "Группа", values: ["1 300 ₽"] },
      { label: "Для спортсменов", values: ["800 ₽"] },
      { label: "Индивидуально", values: ["1 000 ₽"] },
    ],
  },
];
