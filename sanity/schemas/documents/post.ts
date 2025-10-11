import { DocumentTextIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType, defineArrayMember } from "sanity";
import {PlayIcon} from '@sanity/icons'
import authorType from "./author";
import themeType from "./theme";


/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: "post",
  title: "Article",
  icon: DocumentTextIcon,
  type: "document",
  fields: [
    defineField({
      name: "featured",
      title: "Article à la une",
      type: "boolean",
      initialValue: false,
      description: "Mettre l'article en premier sur la page d'accueil",
    }),
    defineField({
      name: 'images',
      title: 'Défilement d\' images en fin d\'article',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
            aiAssist: {
              imageDescriptionField: "alt",
            },
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              description: "Important pour l'accessibilité du site web et le SEO - décrire brièvement l'image ou mettre des guillements vide si c'est décoratif",
              validation: (rule) => {
                return rule.custom((alt, context) => {
                  if ((context.document?.image as any)?.asset?._ref && !alt) {
                    return "Required";
                  }
                  return true;
                });
              },
            },
            {
              name: "legend",
              type: "string",
              title: "Légende (optionnelle)",
              description: "Important pour attribuer l'auteur ou donner une description.",
              validation: rule => [
                rule.max(150).error('150 caractères maximum'),
              ]
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: rule => [
        rule.required().min(5).error('Un titre de 5 caractères minimum est requis'),
        rule.max(100).warning('Votre titre dépasse le nombre de 100 caractères, ceci peut altérer le style du site web (texte sortant de son conteneur etc...)')
      ]
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Un slug de titre (= une partie de l'url) est requis pour accéder à l'article",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Chapeau (en italique et gras)",
      type: "text",
    }),
    defineField({
      name: "contentGroup",
      title: "Contenu",
      type: "object",
      fields: [
        {
          name: "firstLetterStyle",
          title: "Première lettre stylisée",
          type: "boolean",
          initialValue: true,
          description: "Activez pour avoir une première lettre plus grande et stylisée au début du contenu (s'applique aux deux types de contenu)",
        },
        {
          name: "richContent",
          title: "Contenu stylisable (Ajout d'images, de vidéos, de liens, texte en gras etc.)",
          type: "array",
          description: "Attention : vous ne pouvez copier/coller du contenu que sur le navigateurChrome.",
          of: [
            defineArrayMember({
              type: 'block'
            }),
            defineArrayMember({
              type: 'youtube'
            }),
            {type: "image"}],
        },
        {
          name: "simpleContent",
          title: "Contenu simple (texte brut)",
          type: "text",
          description: "Zone de texte simple mais copier/coller compatible avec tous les navigateurs.",
        }
      ],
      options: {
        collapsible: false,
        columns: 1
      }
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
    defineField({
      name: 'audio',
      title: 'Audio Recording',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texte alternatif",
          description: "Important pour le SEO et l' accessiblité.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && alt === undefined) {
                return "Le texte alternatif est requis - décrire l'image ou laisser vide si décorative";
              }
              return true;
            });
          },
        },
        {
          name: "legend",
          type: "string",
          title: "Légende",
          description: "Important pour attribuer l'auteur ou donner une description."
        }
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageFirst",
      title: "Première image",
      type: "image",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texte alternatif",
          description: "Important pour le SEO et l' accessiblité.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && alt === undefined) {
                return "Le texte alternatif est requis - décrire l'image ou laisser vide si décorative";
              }
              return true;
            });
          },
        },
        {
          name: "legend",
          type: "string",
          title: "Légende",
          description: "Important pour attribuer l'auteur ou donner une description."
        }
      ]
    }),
    defineField({
      name: "imageSecond",
      title: "Seconde image",
      type: "image",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texte alternatif",
          description: "Important pour le SEO et l' accessiblité.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && alt === undefined) {
                return "Le texte alternatif est requis - décrire l'image ou laisser vide si décorative";
              }
              return true;
            });
          },
        },
        {
          name: "legend",
          type: "string",
          title: "Légende",
          description: "Important pour attribuer l'auteur ou donner une description."
        },
      ]
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: authorType.name }],
    }),
    defineField({
      name: "theme",
      title: "Choix du thème",
      type: "reference",
      to: [{ type: themeType.name }],
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      date: "date",
      media: "coverImage",
      category: "categories[0].title",
      firstLetterStyle: "contentGroup.firstLetterStyle",
    },
    prepare({ title, media, author, date, firstLetterStyle }) {
      const subtitles = [
        author && `par ${author}`,
        date && `le ${format(parseISO(date), "LLL d, yyyy")}`,
        firstLetterStyle ? "Lettre stylisée ✓" : "Lettre normale",
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(" ") };
    },
  },
});




