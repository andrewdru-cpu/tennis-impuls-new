import { media, type MediaImageSource } from "@/lib/media";

export type TeamCategory = "tennis" | "fitness" | "other";

export type TeamFilter = "all" | TeamCategory;

export type Coach = {
  id: string;
  name: string;
  role: string;
  badge: string;
  description: string;
  categories: TeamCategory[];
  image?: MediaImageSource;
  placeholder?: boolean;
};

export const teamFilters: { id: TeamFilter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "tennis", label: "Теннис" },
  { id: "fitness", label: "Фитнес" },
  { id: "other", label: "Другое" },
];

/**
 * Данные команды с tennis-impuls.ru (ФИО, должность, биография).
 * Фото обработаны в едином портретном стиле → public/images/team/*.webp
 */
export const coaches: Coach[] = [
  {
    id: "paraskeva",
    name: "Параскева Оксана",
    role: "Тренер категории «Мастер+»",
    badge: "Теннис",
    description:
      "Высшее образование МГАФК, специализация — спортивная подготовка по теннису. Тренерский стаж с 2010 года, кандидат в мастера спорта. Многократный победитель и призёр турниров TE, ITF и РТТ.",
    categories: ["tennis"],
    image: media.team.paraskeva,
  },
  {
    id: "rakhmanina",
    name: "Мария Рахманина",
    role: "Тренер категории «Профи»",
    badge: "Теннис",
    description:
      "Мастер спорта по теннису, тренерский стаж с 2005 года. Неоднократный победитель российских и международных турниров. Стажировки в теннисных академиях Италии, Голландии и Бельгии.",
    categories: ["tennis"],
    image: media.team.rakhmanina,
  },
  {
    id: "baldin",
    name: "Александр Балдин",
    role: "Тренер категории «Мастер+»",
    badge: "Теннис",
    description:
      "Тренерский стаж с 2009 года, кандидат в мастера спорта. Призёр турниров РТТ, TE и ITF, двукратный победитель Кубка России. Финалист чемпионата Европы в составе сборной России.",
    categories: ["tennis"],
    image: media.team.baldin,
  },
  {
    id: "averin",
    name: "Андрей Аверин",
    role: "Тренер категории «Мастер»",
    badge: "Теннис",
    description:
      "Тренерский стаж с 2005 года. Призёр и победитель российских и международных соревнований. Победитель турнира ITF Grade 3, многократный участник чемпионатов России.",
    categories: ["tennis"],
    image: media.team.averin,
  },
  {
    id: "kovgan",
    name: "Евгений Ковган",
    role: "Тренер групповых программ",
    badge: "Фитнес",
    description:
      "Мастер-тренер, стаж более 10 лет. Мастер спорта по лёгкой атлетике. Тренажёрный зал, силовые и функциональные тренировки, ЛФК, ОФП с детьми и рекомендации по питанию.",
    categories: ["fitness"],
    image: media.team.kovgan,
  },
  {
    id: "stoletnyaya",
    name: "Столетняя Юлия",
    role: "Тренер групповых программ",
    badge: "Фитнес · Танцы",
    description:
      "Инструктор групповых программ, стаж более 10 лет. Основатель школы танцев и воздушной аэробики. Пилатес, стретчинг, силовые направления, танцы и фитбол.",
    categories: ["fitness", "other"],
    image: media.team.stoletnyaya,
  },
  {
    id: "gym-coach",
    name: "Тренер тренажёрного зала",
    role: "Индивидуальные и групповые тренировки",
    badge: "Фитнес",
    description:
      "Персональные и групповые занятия в тренажёрном зале комплекса. Программы под вашу цель: сила, выносливость и восстановление после нагрузок.",
    categories: ["fitness"],
    placeholder: true,
  },
  {
    id: "kostanyan",
    name: "Костанян Аркадий",
    role: "Тренер каратэ",
    badge: "Каратэ",
    description:
      "Сертифицированный тренер киокушинкай, чёрный пояс 3 дан. Тренерский стаж с 2001 года. Чемпион мира и Европы среди мастеров, двукратный чемпион России.",
    categories: ["other"],
    image: media.team.kostanyan,
  },
  {
    id: "privalov",
    name: "Привалов Роман",
    role: "Массажист-реабилитолог",
    badge: "SPA · Реабилитация",
    description:
      "Специалист с медицинским образованием, первая категория по медицинскому массажу. Лечебный и SPA-массаж, восстановление после травм и нагрузок.",
    categories: ["other"],
    image: media.team.privalov,
  },
  {
    id: "yoga-coach",
    name: "Тренер по йоге",
    role: "Групповые и индивидуальные занятия",
    badge: "Йога",
    description:
      "Занятия йогой на территории комплекса — для расслабления, гибкости и баланса тела. Расписание и запись уточняйте на ресепшене клуба.",
    categories: ["other"],
    placeholder: true,
  },
];

export function filterCoaches(filter: TeamFilter): Coach[] {
  if (filter === "all") return coaches;
  return coaches.filter((c) => c.categories.includes(filter));
}
