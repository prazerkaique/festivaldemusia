import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo',
    description: 'Notícias e artigos publicados no blog do festival.',
    defaultColumns: ['title', 'category', 'date', 'featured'],
    listSearchableFields: ['title', 'author'],
  },
  labels: { singular: 'Notícia', plural: 'Notícias' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Conteúdo',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Título',
              admin: {
                placeholder: 'Ex: Festival anuncia novos artistas',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              label: 'Slug',
              admin: {
                description: 'URL amigável — deve ser único',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'news-categories',
              required: true,
              label: 'Categoria',
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: 'Resumo',
              admin: {
                placeholder: 'Resumo de 1-2 frases para o card de preview',
                description: 'Aparece nos cards do blog e no SEO',
              },
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              label: 'Conteúdo',
            },
          ],
        },
        {
          label: 'Mídia',
          fields: [
            { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Imagem de Capa' },
            {
              name: 'audioUrl',
              type: 'text',
              label: 'URL do Áudio',
              admin: {
                placeholder: 'https://...',
                description: 'Link para versão em áudio da notícia (podcast)',
              },
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'author',
              type: 'text',
              required: true,
              label: 'Autor',
              admin: {
                placeholder: 'Ex: Assessoria de Imprensa',
              },
            },
            {
              name: 'date',
              type: 'date',
              required: true,
              label: 'Data de Publicação',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                  displayFormat: 'dd/MM/yyyy',
                },
              },
            },
            {
              name: 'readingTime',
              type: 'number',
              label: 'Tempo de Leitura (min)',
              admin: {
                description: 'Tempo estimado de leitura em minutos',
              },
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              fields: [
                { name: 'tag', type: 'text', required: true },
              ],
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              label: 'Destaque',
            },
          ],
        },
      ],
    },
  ],
}
