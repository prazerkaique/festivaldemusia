import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const Venues: CollectionConfig = {
  slug: 'venues',
  access: contentAccess,
  admin: {
    useAsTitle: 'name',
    group: 'Programação',
    description: 'Palcos e locais onde acontecem os eventos do festival.',
    defaultColumns: ['name', 'shortName', 'color'],
  },
  labels: { singular: 'Local / Palco', plural: 'Locais / Palcos' },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nome' },
    {
      name: 'shortName',
      type: 'text',
      required: true,
      label: 'Nome Curto',
      admin: {
        placeholder: 'Ex: Teatro Calil',
        description: 'Nome abreviado exibido nos filtros da programação',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      label: 'Cor (hex)',
      admin: {
        placeholder: '#a71580',
      },
    },
    {
      type: 'collapsible',
      label: 'Localização',
      fields: [
        {
          name: 'address',
          type: 'text',
          label: 'Endereço',
          admin: {
            placeholder: 'Ex: Av. Brasil, 1234 - Centro',
          },
        },
        {
          name: 'mapsUrl',
          type: 'text',
          label: 'Link Google Maps',
          admin: {
            placeholder: 'https://maps.google.com/...',
          },
        },
      ],
    },
  ],
}
