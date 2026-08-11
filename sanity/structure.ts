import type { StructureResolver } from "sanity/structure";

const MANAGED = new Set([
  "pricing",
  "siteSettings",
  "newsArticle",
  "teamMember",
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Контент ЦТТ Импульс")
    .items([
      S.listItem()
        .title("Тарифы (карточки)")
        .id("pricing")
        .child(S.document().schemaType("pricing").documentId("pricing")),
      S.listItem()
        .title("Настройки сайта")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("newsArticle").title("Новости"),
      S.documentTypeListItem("teamMember").title("Команда"),
      ...S.documentTypeListItems().filter(
        (item) => !MANAGED.has(item.getId() ?? "")
      ),
    ]);
