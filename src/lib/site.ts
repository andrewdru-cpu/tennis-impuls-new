export const siteConfig = {
  name: "ЦТТ Импульс",
  fullName: "Центр тенниса и тренировок «Импульс»",
  description:
    "Премиальный теннисный клуб в Мытищах рядом с национальным парком «Лосиный Остров». Корты мирового уровня, профессиональные тренеры, онлайн-бронирование.",
  location: "Мытищи, рядом с Лосиным Островом",
  phone: "+7 (495) 120-45-67",
  phoneHref: "tel:+74951204567",
  email: "hello@ctt-impulse.ru",
  address: "Московская обл., г. Мытищи, ул. 4-я Парковая, д. 7Б",
  // Готовый маршрут до клуба в Яндекс Картах
  mapsUrl:
    "https://yandex.ru/maps/?text=%D0%9C%D1%8B%D1%82%D0%B8%D1%89%D0%B8%2C%204-%D1%8F%20%D0%9F%D0%B0%D1%80%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%83%D0%BB.%2C%207%D0%91",
  social: {
    telegram: "https://t.me/",
    instagram: "https://instagram.com/",
    vk: "https://vk.com/",
  },
} as const;

export const navItems = [
  { label: "Главная", href: "#hero" },
  { label: "Услуги", href: "#services" },
  { label: "Бронирование", href: "#booking" },
  { label: "Цены", href: "#pricing" },
  { label: "Команда", href: "#team" },
  { label: "О клубе", href: "#about" },
  { label: "Контакты", href: "#contacts" },
] as const;
