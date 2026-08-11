import { defineField, defineType } from "sanity";

/** Singleton: карточки тарифов на главной */
export const pricing = defineType({
  name: "pricing",
  title: "Тарифы (карточки)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок блока",
      type: "string",
      initialValue: "Цены и абонементы",
    }),
    defineField({
      name: "plans",
      title: "Тарифы",
      type: "array",
      of: [
        {
          type: "object",
          name: "plan",
          fields: [
            defineField({
              name: "title",
              title: "Название",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "priceLabel",
              title: "Цена (подпись)",
              type: "string",
              description: "Например: от 2 500 ₽ / час",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Подзаголовок",
              type: "string",
            }),
            defineField({
              name: "featured",
              title: "Выделить (хит)",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "order",
              title: "Порядок",
              type: "number",
              initialValue: 0,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "priceLabel" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Тарифы (карточки на главной)" }),
  },
});
