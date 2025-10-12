import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "header",
  title: "Barre de navigation",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "titre",
      description: "C'est le titre de votre site sur le header",
      title: "Titre du journal",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: "caption",
        title: "Chapeau",
        type: "string",
      }),
    defineField({
        name: "aboutPage",
        title: "Page 'Qui sommes-nous'",
        description: "Sélectionnez l'article qui servira de page 'Qui sommes-nous' dans le menu",
        type: "reference",
        to: [{ type: "post" }],
      })
  ],
  preview: {
    prepare() {
      return {
        title: "Header",
      };
    },
  },
});
