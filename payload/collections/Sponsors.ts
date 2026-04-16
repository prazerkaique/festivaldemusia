import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  access: contentAccess,
  labels: { singular: 'Patrocinador', plural: 'Patrocinadores' },
  admin: {
    group: 'Parceiros',
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'order', 'active'],
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL do site',
      admin: { placeholder: 'https://...' },
    },
    {
      name: 'tier',
      type: 'select',
      label: 'Categoria',
      required: true,
      defaultValue: 'apoiador',
      options: [
        { label: 'Master', value: 'master' },
        { label: 'Patrocinador', value: 'patrocinador' },
        { label: 'Apoiador', value: 'apoiador' },
        { label: 'Realizador', value: 'realizador' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Ativo',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
