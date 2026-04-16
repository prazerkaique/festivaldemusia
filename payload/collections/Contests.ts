import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access'

export const Contests: CollectionConfig = {
  slug: 'contests',
  access: contentAccess,
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo',
    description: 'Concursos do festival — inscrições, regulamentos e premiações.',
    defaultColumns: ['title', 'status', 'color', 'date'],
    listSearchableFields: ['title'],
  },
  labels: { singular: 'Concurso', plural: 'Concursos' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Geral',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Título',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              label: 'Slug',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtítulo',
              admin: {
                placeholder: 'Ex: 15ª Edição',
              },
            },
            {
              name: 'color',
              type: 'select',
              required: true,
              label: 'Cor',
              options: [
                { label: 'Roxo', value: 'purple' },
                { label: 'Laranja', value: 'orange' },
                { label: 'Ciano', value: 'cyan' },
              ],
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'em-breve',
              label: 'Status',
              options: [
                { label: 'Inscrições Abertas', value: 'aberto' },
                { label: 'Encerrado', value: 'encerrado' },
                { label: 'Em Breve', value: 'em-breve' },
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Descrição',
              admin: {
                placeholder: 'Descreva o concurso em detalhes',
              },
            },
            {
              name: 'date',
              type: 'text',
              required: true,
              label: 'Data',
              admin: {
                placeholder: '15 de Outubro',
              },
            },
            {
              name: 'time',
              type: 'text',
              required: true,
              label: 'Horário',
              admin: {
                placeholder: '19h',
              },
            },
            {
              name: 'location',
              type: 'text',
              required: true,
              label: 'Local',
              admin: {
                placeholder: 'Teatro Calil Haddad',
              },
            },
            { name: 'maxParticipants', type: 'number', label: 'Máximo de Participantes' },
          ],
        },
        {
          label: 'Imagens',
          fields: [
            { name: 'cardImage', type: 'upload', relationTo: 'media', label: 'Imagem do Card' },
            { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagem Hero' },
          ],
        },
        {
          label: 'Premiação',
          fields: [
            {
              name: 'prizes',
              type: 'array',
              label: 'Premiações',
              fields: [
                { name: 'place', type: 'text', required: true, label: 'Colocação' },
                { name: 'amount', type: 'text', required: true, label: 'Valor' },
                { name: 'description', type: 'text', required: true, label: 'Descrição' },
              ],
            },
          ],
        },
        {
          label: 'Avaliação',
          fields: [
            {
              name: 'criteria',
              type: 'array',
              label: 'Critérios de Avaliação',
              fields: [
                { name: 'text', type: 'text', required: true, label: 'Critério' },
              ],
            },
          ],
        },
        {
          label: 'Cronograma',
          fields: [
            {
              name: 'timeline',
              type: 'array',
              label: 'Cronograma',
              fields: [
                { name: 'date', type: 'text', required: true, label: 'Data' },
                { name: 'label', type: 'text', required: true, label: 'Etapa' },
              ],
            },
          ],
        },
        {
          label: 'Formulário',
          fields: [
            {
              name: 'formFields',
              type: 'array',
              label: 'Campos do Formulário',
              fields: [
                { name: 'fieldName', type: 'text', required: true, label: 'Nome do Campo (ID)' },
                { name: 'label', type: 'text', required: true, label: 'Label' },
                {
                  name: 'fieldType',
                  type: 'select',
                  required: true,
                  label: 'Tipo',
                  options: [
                    { label: 'Texto', value: 'text' },
                    { label: 'Número', value: 'number' },
                    { label: 'Seleção', value: 'select' },
                    { label: 'Área de Texto', value: 'textarea' },
                  ],
                },
                { name: 'placeholder', type: 'text', label: 'Placeholder' },
                { name: 'required', type: 'checkbox', defaultValue: true, label: 'Obrigatório' },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Opções (para campo tipo Seleção)',
                  admin: {
                    condition: (data, siblingData) => siblingData?.fieldType === 'select',
                  },
                  fields: [
                    { name: 'value', type: 'text', required: true, label: 'Opção' },
                  ],
                },
              ],
            },
            {
              name: 'registrationUrl',
              type: 'text',
              label: 'URL de Inscrição',
              admin: {
                description: 'Link externo para inscrição (se houver)',
              },
            },
            {
              name: 'pdfUrl',
              type: 'text',
              label: 'URL do Regulamento (PDF)',
              admin: {
                description: 'Link para download do regulamento em PDF',
              },
            },
          ],
        },
      ],
    },
  ],
}
