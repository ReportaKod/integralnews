import {StackCompactIcon} from '@sanity/icons'
import { defineField, defineType } from "sanity";

export default defineType({
  name: "theme",
  title: "Rubrique",
  icon: StackCompactIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: "slug",
        title: "Slug de thème",
        type: "slug",
        description: "Un slug de theme (= une partie de l'url) est requis pour accéder à l'article",
        options: {
          source: "name",
          maxLength: 96,
          isUnique: (value, context) => context.defaultIsUnique(value, context),
        },
        validation: (rule) => rule.required(),
      })
  ],
});




