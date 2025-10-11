import { defineField, defineType } from "sanity";
import { PlayIcon } from '@sanity/icons';

export default defineType({
    name: 'youtube',
    type: 'object',
    title: 'Vidéo Youtube',
    description: 'Vidéo Youtube à intégrer dans un article. Il faut l\'id de la vidéo.',
    icon: PlayIcon,
    fields: [
      defineField({
        name: 'id',
        type: 'string',
        title: 'Youtube video ID',
        description: 'Prendre la partie après "v=" et avant tout caractère "&" dans l\'url du navigateur une fois sur la vidéo.',
      }),
      defineField({
        name: 'title',
        type: 'string',
        title: 'Label pour l\' accessibilité',
        description: 'Description trés courte pour l`accesibilité: les lecteurs d\'écran lirons cette description.',
      }),
    ]
  })





