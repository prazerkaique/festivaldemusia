import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const FestivalEvents: CollectionConfig = {
  slug: 'festival-events',
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    group: 'Programação',
    description: 'Programação completa do festival — cada evento aparece na timeline.',
    defaultColumns: ['title', 'date', 'timeDisplay', 'venue'],
    listSearchableFields: ['title', 'date'],
  },
  labels: { singular: 'Evento', plural: 'Eventos' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
      admin: {
        placeholder: 'Ex: Orquestra Sinfônica de Maringá',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
        description: 'URL amigável — gerado automaticamente se deixar em branco',
      },
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'Data',
      admin: {
        placeholder: '2026-10-13',
      },
    },
    {
      name: 'timeDisplay',
      type: 'text',
      required: true,
      label: 'Horário',
      admin: {
        placeholder: '19h30',
      },
    },
    {
      name: 'sortKey',
      type: 'text',
      required: true,
      label: 'Chave de Ordenação',
      admin: {
        description: 'Número usado para ordenar eventos no mesmo dia. Ex: 1930 para 19h30',
        position: 'sidebar',
      },
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
      required: true,
      label: 'Local / Palco',
    },
    { name: 'thumbnail', type: 'upload', relationTo: 'media', label: 'Imagem' },
    {
      name: 'imageLayout',
      type: 'checkbox',
      defaultValue: false,
      label: 'Layout com Imagem',
      admin: { description: 'Exibir como card horizontal com foto' },
    },
    {
      type: 'collapsible',
      label: 'Detalhes Adicionais',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
          admin: {
            placeholder: 'Breve descrição do evento',
          },
        },
        {
          name: 'genre',
          type: 'text',
          label: 'Gênero Musical',
          admin: {
            placeholder: 'Ex: MPB, Jazz, Rock',
          },
        },
        {
          name: 'note',
          type: 'text',
          label: 'Observação',
          admin: {
            placeholder: 'Ex: Abertura oficial do festival',
            description: 'Texto complementar exibido abaixo do horário',
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Destaque',
      admin: { position: 'sidebar' },
    },
  ],
}
