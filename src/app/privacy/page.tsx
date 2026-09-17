import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "@/lib/icons";
import { legalEntity } from "@/lib/legal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных — ЦТТ Импульс",
  description:
    "Политика обработки персональных данных ООО «ИМПУЛЬС»: состав данных, цели, сроки хранения, права субъекта и использование cookie / Яндекс.Метрики.",
};

const headingClass =
  "mt-10 font-display text-xl font-bold text-forest-800 sm:text-2xl";
const proseClass =
  "mt-3 text-pretty text-sm leading-relaxed text-forest-800 sm:text-base sm:leading-[1.7]";
const listClass = "mt-3 list-disc space-y-1.5 pl-5 text-pretty text-sm leading-relaxed text-forest-800 sm:text-base sm:leading-[1.7]";
const linkClass =
  "font-semibold text-terracotta-600 underline-offset-2 hover:underline";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-gradient-to-b from-cream via-lime-50/40 to-cream pt-[calc(5rem+env(safe-area-inset-top,0px))]">
        <Section
          tone="light"
          className="!bg-transparent pb-16 pt-6 sm:pb-24 sm:pt-8"
          before={
            <>
              <div
                className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-terracotta/12 blur-[100px]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-lime/20 blur-[90px]"
                aria-hidden
              />
            </>
          }
        >
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border font-bold",
                "border-forest-900/12 bg-white px-5 py-3 text-[0.9375rem] text-forest-800 shadow-sm",
                "transition-[background-color,border-color,color] duration-300",
                "hover:border-terracotta/40 hover:bg-terracotta/5 hover:text-terracotta-600"
              )}
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              ← На главную
            </Link>
          </div>

          <Badge variant="terracotta">Документы</Badge>

          <h1 className="heading-section mt-4">
            Политика обработки{" "}
            <span className="text-terracotta-600">персональных данных</span>
          </h1>

          <p className={`${proseClass} max-w-[min(42rem,100%)]`}>
            Настоящая Политика описывает, как {legalEntity.shortName} обрабатывает
            персональные данные посетителей сайта {legalEntity.site} в соответствии
            с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            Условия оказания услуг изложены в{" "}
            <Link href="/oferta" className={linkClass}>
              публичной оферте
            </Link>
            .
          </p>

          <div className="mt-2 max-w-3xl">
            <h2 className={headingClass}>1. Оператор и реквизиты</h2>
            <ul className={listClass}>
              <li>Полное наименование: {legalEntity.fullName}</li>
              <li>Краткое наименование: {legalEntity.shortName}</li>
              <li>Юридический и почтовый адрес: {legalEntity.legalAddress}</li>
              <li>ИНН {legalEntity.inn}</li>
              <li>КПП {legalEntity.kpp}</li>
              <li>ОГРН {legalEntity.ogrn}</li>
              <li>Телефон: {legalEntity.phone}</li>
              <li>
                Email:{" "}
                <a href={`mailto:${legalEntity.email}`} className={linkClass}>
                  {legalEntity.email}
                </a>
              </li>
              <li>
                Сайт:{" "}
                <a href={legalEntity.site} className={linkClass}>
                  {legalEntity.site}
                </a>
              </li>
              <li>Директор: {legalEntity.director}</li>
            </ul>

            <h2 className={headingClass}>2. Какие данные обрабатываются</h2>
            <p className={proseClass}>Оператор может обрабатывать:</p>
            <ul className={listClass}>
              <li>
                имя, телефон и комментарий, которые вы указываете в форме записи
                на сайте (#booking);
              </li>
              <li>
                файлы cookie и идентификаторы Яндекс.Метрики (счётчики 111489660 и
                46954113), в том числе данные вебвизора;
              </li>
              <li>
                технические данные браузера и сетевого подключения (в том числе
                IP-адрес), которые может получить хостинг при обращении к сайту.
              </li>
            </ul>

            <h2 className={headingClass}>3. Цели обработки</h2>
            <ul className={listClass}>
              <li>ответ на заявку и связь с вами;</li>
              <li>запись на услуги центра;</li>
              <li>улучшение работы сайта;</li>
              <li>статистика посещений.</li>
            </ul>

            <h2 className={headingClass}>4. Правовые основания</h2>
            <p className={proseClass}>
              Обработка осуществляется на основании согласия субъекта персональных
              данных (ст. 6 Федерального закона № 152-ФЗ) и в связи с заключением
              и исполнением договора на оказание услуг, в том числе на условиях{" "}
              <Link href="/oferta" className={linkClass}>
                публичной оферты
              </Link>
              .
            </p>

            <h2 className={headingClass}>5. Кому могут передаваться данные</h2>
            <ul className={listClass}>
              <li>сотрудникам оператора, которым это необходимо для работы;</li>
              <li>
                почтовому сервису — для доставки писем на {legalEntity.email};
              </li>
              <li>
                сервису 1С:Фитнес / Reservi — для расписания и обработки заявок;
              </li>
              <li>Яндексу — в рамках Яндекс.Метрики.</li>
            </ul>
            <p className={proseClass}>
              Трансграничная передача персональных данных возможна при
              использовании почтового подрядчика. Оператор обеспечивает соблюдение
              требований Федерального закона № 152-ФЗ при такой передаче.
            </p>

            <h2 className={headingClass}>6. Срок хранения</h2>
            <p className={proseClass}>
              Персональные данные хранятся до достижения целей обработки или до
              отзыва согласия, если иной срок не установлен законодательством
              Российской Федерации.
            </p>

            <h2 className={headingClass}>7. Права субъекта</h2>
            <p className={proseClass}>
              Вы вправе запросить доступ к своим данным, их уточнение или отозвать
              согласие, направив обращение на{" "}
              <a href={`mailto:${legalEntity.email}`} className={linkClass}>
                {legalEntity.email}
              </a>{" "}
              или по телефону {legalEntity.phone}.
            </p>

            <h2 className={headingClass}>8. Cookies и Метрика</h2>
            <p className={proseClass}>
              На сайте показывается информационный баннер об использовании cookie.
              Яндекс.Метрика может устанавливать cookie, в том числе _ym_uid и
              связанные идентификаторы. Ограничить cookie можно в настройках
              браузера; подробнее о Метрике:{" "}
              <a
                href="https://yandex.ru/support/metrica/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                https://yandex.ru/support/metrica/
              </a>
              .
            </p>

            <h2 className={headingClass}>9. Дети</h2>
            <p className={proseClass}>
              Заявку на детские секции и занятия оставляет законный представитель
              ребёнка.
            </p>

            <h2 className={headingClass}>10. Изменения политики</h2>
            <p className={proseClass}>
              Актуальная редакция Политики публикуется на этой странице. Продолжая
              пользоваться сайтом после публикации изменений, вы принимаете
              обновлённые условия в части, не требующей отдельного согласия.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
