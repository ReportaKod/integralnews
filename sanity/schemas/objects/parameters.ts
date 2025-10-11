import { defineField, defineType } from "sanity";
import {CogIcon} from '@sanity/icons'

export default defineType({
    name: 'parameters',
    type: 'object',
    title: 'Vos paramètres',
    description: '',
    icon: CogIcon,
    fields: [
      defineField({
        name: 'dropcap',
        type: 'boolean',
        title: 'Première lettre du premier paragraphe : désactiver l\' agrandissement',
        description: '',
      })
    ]
  })
