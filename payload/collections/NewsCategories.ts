import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const NewsCategories: CollectionConfig = {
  slug: 'news-categories',
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo',
    description: 'Categorias para organizar as notícias do blog.',
    defaultColumns: ['title', 'slug', 'color'],
  },
  labels: { singular: 'Categoria do Blog', plural: 'Categorias do Blog' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nome',
      admin: {
        placeholder: 'Ex: Bastidores',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        placeholder: 'ex: bastidores',
        description: 'Identificador único na URL',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      label: 'Cor (hex)',
      admin: {
        placeholder: '#a71580',
        description: 'Cor do badge da categoria no site',
      },
    },
  ],
}
