import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Сотрудник / тренер",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Имя",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Роль / должность",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "string",
      description: "Например: Теннис, Фитнес, Массаж",
      options: {
        list: [
          { title: "Теннис", value: "tennis" },
          { title: "Фитнес / ОФП", value: "fitness" },
          { title: "Массаж", value: "massage" },
        ],
      },
    }),
    defineField({
      name: "bio",
      title: "Биография",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "image",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Порядок",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Порядок",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
