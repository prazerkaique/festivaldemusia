import type { CollectionConfig, Access } from 'payload'

const isMaster: Access = ({ req: { user } }) => {
  return user?.role === 'master'
}

const isMasterOrSelf: Access = ({ req: { user }, id }) => {
  if (user?.role === 'master') return true
  return user?.id === id
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    group: 'Configurações',
    description: 'Gerencie os usuários que podem acessar este painel.',
    defaultColumns: ['name', 'email', 'role'],
    hidden: ({ user }) => user?.role !== 'master',
  },
  access: {
    read: isMasterOrSelf,
    create: isMaster,
    update: isMasterOrSelf,
    delete: isMaster,
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome Completo',
      admin: {
        placeholder: 'Ex: João Silva',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'cliente',
      label: 'Nível de Acesso',
      admin: {
        description: 'Master: acesso total. Cliente: só edita conteúdo.',
        condition: (data, siblingData, { user }) => user?.role === 'master',
      },
      options: [
        { label: 'Master', value: 'master' },
        { label: 'Cliente', value: 'cliente' },
      ],
    },
  ],
}
