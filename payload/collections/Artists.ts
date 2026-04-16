import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const Artists: CollectionConfig = {
  slug: 'artists',
  access: contentAccess,
  labels: { singular: 'Atração', plural: 'Atrações' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'name',
    defaultColumns: ['name', 'dayNumber', 'featured', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome',
      required: true,
      maxLength: 80,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
      required: true,
    },
    {
      name: 'dayNumber',
      type: 'number',
      label: 'Dia (número)',
      required: true,
      admin: { description: 'Ex: 14 para dia 14 de Outubro' },
    },
    {
      name: 'date',
      type: 'text',
      label: 'Data por extenso',
      maxLength: 30,
      admin: { placeholder: '14 de Outubro' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
      maxLength: 200,
    },
    {
      name: 'color',
      type: 'select',
      label: 'Cor do badge',
      defaultValue: 'purple',
      options: [
        { label: 'Purple', value: 'purple' },
        { label: 'Orange', value: 'orange' },
        { label: 'Cyan', value: 'cyan' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destaque na Home',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
