import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const ExchangePoints: CollectionConfig = {
  slug: 'exchange-points',
  access: contentAccess,
  admin: {
    useAsTitle: 'name',
    group: 'Configurações',
    description: 'Locais onde o público troca 1kg de alimento pelo ingresso.',
    defaultColumns: ['name', 'city', 'hours'],
    listSearchableFields: ['name', 'city'],
  },
  labels: { singular: 'Ponto de Troca', plural: 'Pontos de Troca' },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
      admin: {
        placeholder: 'Ex: Teatro Calil Haddad',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'address',
          type: 'text',
          required: true,
          label: 'Endereço',
          admin: {
            placeholder: 'Ex: Av. Carneiro Leão, 60',
          },
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'Cidade',
          admin: {
            placeholder: 'Ex: Maringá',
          },
        },
      ],
    },
    {
      name: 'cepPrefix',
      type: 'array',
      label: 'Prefixos de CEP',
      admin: { description: 'Primeiros 5 dígitos do CEP atendido' },
      fields: [
        { name: 'prefix', type: 'text', required: true, label: 'Prefixo' },
      ],
    },
    {
      name: 'hours',
      type: 'text',
      required: true,
      label: 'Horário de Funcionamento',
      admin: {
        placeholder: 'Ex: Seg a Sex, 9h às 17h',
        description: 'Horário de funcionamento para troca',
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
    {
      name: 'mapsEmbed',
      type: 'textarea',
      label: 'Embed Google Maps',
      admin: {
        description: 'Código iframe do Google Maps para exibir mapa no site',
        placeholder: "<iframe src='...'></iframe>",
      },
    },
  ],
}
