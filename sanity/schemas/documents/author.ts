import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Auteur",
  icon: UserIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "picture",
      title: "Avatar",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important pour le SEO et l'accessibilité.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        },
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
