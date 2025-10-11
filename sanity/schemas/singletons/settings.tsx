import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { description } from "../../lib/demo"
export default defineType({
  name: "settings",
  title: "Paramètres généraux",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      description: "C'est le titre du blog.",
      title: "Title",
      type: "string",
      initialValue: "Intégrale Infos"
    }),
    defineField({
      name: "description",
      description:
        "Utilisé pour la <meta> description pour le SE0.",
      title: "Description",
      type: "array",
      initialValue: description,
      of: [
        defineArrayMember({
          type: "block",
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: "object",
                name: "link",
                fields: [
                  {
                    type: "string",
                    name: "href",
                    title: "URL",
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "footer",
      description:
        "Ce bloc de texte sera mis dans le pied de page.",
      title: "Pied de page",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Image Open Graph",
      type: "image",
      description: "Image qui sera perçu lors de partage sur les réseaux sociaux ou dans les recherches sur internet",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      fields: [
        defineField({
          name: "alt",
          description: "Important pour l'accessibilité et le SEO.",
          title: "Texte alternatif",
          type: "string",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        }),
        defineField({
          name: "metadataBase",
          type: "url",
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
             Plus d'information sur la base de métadata (en anglais)
            </a>
          ),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Paramètres généraux",
      };
    },
  },
});
