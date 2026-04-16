import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: contentAccess,
  upload: {
    mimeTypes: ['image/*'],
  },
  admin: {
    group: 'Configurações',
    description: 'Imagens usadas em todo o site.',
    pagination: {
      defaultLimit: 20,
    },
  },
  labels: { singular: 'Mídia', plural: 'Mídias' },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto Alternativo',
      admin: {
        placeholder: 'Descreva a imagem para acessibilidade',
        description: 'Importante para SEO e leitores de tela.',
      },
    },
  ],
}
