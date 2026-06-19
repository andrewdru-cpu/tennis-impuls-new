import { media, type MediaImageSource } from "@/lib/media";

export type CoachTier =
  | "master"
  | "kms"
  | "pro"
  | "fitness"
  | "massage";

export type Coach = {
  id: string;
  name: string;
  role: string;
  /** Звание / категория — показывается бейджем на карточке */
  rank?: string;
  tier: CoachTier;
  badges: string[];
  description: string;
  image?: MediaImageSource;
  /** Для массажа — виды услуг */
  serviceTags?: string[];
};

export type TeamSubsection = {
  /** Подзаголовок группы, напр. «в одной категории» */
  label?: string;
  coaches: Coach[];
};

export type TeamGroup = {
  id: "tennis" | "fitness" | "massage";
  title: string;
  subtitle: string;
  subsections: TeamSubsection[];
};

const paraskeva: Coach = {
  id: "paraskeva",
  name: "Параскева Оксана",
  role: "Тренер по теннису",
  rank: "Мастер спорта",
  tier: "master",
  badges: ["Теннис", "Мастер спорта"],
  description:
    "Высшее образование МГАФК, специализация — спортивная подготовка по теннису. Тренерский стаж с 2010 года. Многократный победитель и призёр турниров TE, ITF и РТТ.",
  image: media.team.paraskeva,
};

const baldin: Coach = {
  id: "baldin",
  name: "Александр Балдин",
  role: "Тренер по теннису",
  rank: "КМС",
  tier: "kms",
  badges: ["Теннис", "КМС"],
  description:
    "Тренерский стаж с 2009 года, кандидат в мастера спорта. Призёр турниров РТТ, TE и ITF, двукратный победитель Кубка России. Финалист чемпионата Европы в составе сборной России.",
  image: media.team.baldin,
};

const averin: Coach = {
  id: "averin",
  name: "Андрей Аверин",
  role: "Тренер по теннису",
  tier: "pro",
  badges: ["Теннис", "Профи"],
  description:
    "Тренерский стаж с 2005 года. Призёр и победитель российских и международных соревнований. Победитель турнира ITF Grade 3, многократный участник чемпионатов России.",
  image: media.team.averin,
};

const rakhmanina: Coach = {
  id: "rakhmanina",
  name: "Мария Рахманина",
  role: "Тренер по теннису",
  tier: "pro",
  badges: ["Теннис", "Профи"],
  description:
    "Мастер спорта по теннису, тренерский стаж с 2005 года. Неоднократный победитель российских и международных турниров. Стажировки в теннисных академиях Италии, Голландии и Бельгии.",
  image: media.team.rakhmanina,
};

const kovgan: Coach = {
  id: "kovgan",
  name: "Евгений Ковган",
  role: "Тренер персональных и групповых тренировок",
  tier: "fitness",
  badges: ["Фитнес", "ОФП", "Тренажёрный зал"],
  description:
    "Мастер-тренер, стаж более 10 лет. Мастер спорта по лёгкой атлетике. Силовые и функциональные тренировки, ЛФК, ОФП с детьми и рекомендации по питанию.",
  image: media.team.kovgan,
};

const stoletnyaya: Coach = {
  id: "stoletnyaya",
  name: "Столетняя Юлия",
  role: "Тренер персональных и групповых тренировок",
  tier: "fitness",
  badges: ["Фитнес", "Танцы", "Групповые программы"],
  description:
    "Инструктор групповых программ, стаж более 10 лет. Основатель школы танцев и воздушной аэробики. Пилатес, стретчинг, силовые направления, танцы и фитбол.",
  image: media.team.stoletnyaya,
};

const privalov: Coach = {
  id: "privalov",
  name: "Привалов Роман",
  role: "Массажист-реабилитолог",
  rank: "Специалист первой категории",
  tier: "massage",
  badges: ["Массаж", "Реабилитация"],
  description:
    "Специалист с медицинским образованием. Помогает восстановиться после нагрузок и травм, снимает мышечное напряжение и улучшает самочувствие.",
  serviceTags: [
    "Лечебный",
    "Спортивный",
    "Восстановительный",
    "Расслабляющий",
  ],
  image: media.team.privalov,
};

export const teamGroups: TeamGroup[] = [
  {
    id: "tennis",
    title: "Теннис",
    subtitle: "Тренеры с подтверждённым спортивным званием и богатым соревновательным опытом",
    subsections: [
      { coaches: [paraskeva, baldin] },
      {
        label: "Тренеры категории «Профи»",
        coaches: [averin, rakhmanina],
      },
    ],
  },
  {
    id: "fitness",
    title: "Фитнес",
    subtitle: "Персональные и групповые тренировки под вашу цель",
    subsections: [
      {
        label: "Персональные и групповые тренировки",
        coaches: [kovgan, stoletnyaya],
      },
    ],
  },
  {
    id: "massage",
    title: "Массаж",
    subtitle: "Профессиональное восстановление после нагрузок",
    subsections: [{ coaches: [privalov] }],
  },
];

/** Плоский список для подсчётов и совместимости */
export const coaches: Coach[] = teamGroups.flatMap((g) =>
  g.subsections.flatMap((s) => s.coaches)
);

export const tierStyles: Record<
  CoachTier,
  { rankClass: string; accent: string }
> = {
  master: {
    rankClass: "bg-lime text-forest-900 ring-lime/50",
    accent: "from-lime/30 to-lime/5",
  },
  kms: {
    rankClass: "bg-emerald-400 text-forest-950 ring-emerald-300/60",
    accent: "from-emerald-300/40 to-emerald-50",
  },
  pro: {
    rankClass: "bg-white/90 text-forest-900 ring-white/40",
    accent: "from-white/20 to-white/5",
  },
  fitness: {
    rankClass: "bg-lime/90 text-forest-900 ring-lime/40",
    accent: "from-lime/25 to-white",
  },
  massage: {
    rankClass: "bg-teal-300 text-forest-950 ring-teal-200/60",
    accent: "from-teal-200/50 to-teal-50",
  },
};
