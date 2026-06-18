export const siteConfig = {
  name: "ЦТТ Импульс",
  fullName: "Центр теннисных технологий «Импульс»",
  description:
    "Многофункциональный спортивный комплекс в Мытищах у Лосиного Острова: теннис, падел, фитнес, групповые программы и зоны отдыха. Онлайн-бронирование.",
  location: "Мытищи, рядом с Лосиным Островом",
  phone: "+7 (495) 114-68-01",
  phoneHref: "tel:+74951146801",
  email: "info@tennis-impuls.ru",
  address: "Московская обл., г. Мытищи, ул. 4-я Парковая, д. 7Б",
  // Готовый маршрут до клуба в Яндекс Картах
  mapsUrl:
    "https://yandex.ru/maps/?text=%D0%9C%D1%8B%D1%82%D0%B8%D1%89%D0%B8%2C%204-%D1%8F%20%D0%9F%D0%B0%D1%80%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%83%D0%BB.%2C%207%D0%91",
  contacts: {
    telegram: "https://t.me/tennis_impuls",
    max: "https://max.ru",
    whatsapp: "https://wa.me/74951146801",
    email: "mailto:info@tennis-impuls.ru",
    phone: "tel:+74951146801",
  },
  social: {
    telegram: "https://t.me/tennis_impuls",
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
  { label: "Новости", href: "#news" },
  { label: "Контакты", href: "#contacts" },
] as const;
