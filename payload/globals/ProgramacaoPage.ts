import type { GlobalConfig } from 'payload'
import { globalAccess } from '../access'

export const ProgramacaoPage: GlobalConfig = {
  slug: 'programacao-page',
  label: 'Página Programação',
  access: globalAccess,
  admin: {
    group: 'Páginas',
    description: 'Conteúdo da página de programação.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              maxLength: 40,
              defaultValue: 'Programação 2026',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Título',
              maxLength: 60,
              defaultValue: 'Programação',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtítulo',
              maxLength: 160,
              defaultValue: '7 dias de música em 7 palcos pela cidade — 13 a 19 de Outubro',
            },
          ],
        },
        {
          label: 'Datas do Festival',
          fields: [
            {
              name: 'festivalDays',
              type: 'array',
              label: 'Dias do Festival',
              minRows: 1,
              maxRows: 10,
              admin: {
                description: 'Configure os dias do festival. Estes substituem a constante SCHEDULE hardcoded.',
              },
              fields: [
                {
                  name: 'date',
                  type: 'text',
                  label: 'Data (YYYY-MM-DD)',
                  required: true,
                  maxLength: 10,
                  admin: { placeholder: '2026-10-13' },
                },
                {
                  name: 'dayOfWeek',
                  type: 'text',
                  label: 'Dia abreviado',
                  required: true,
                  maxLength: 5,
                  admin: { placeholder: 'Seg' },
                },
                {
                  name: 'dayOfWeekFull',
                  type: 'text',
                  label: 'Dia por extenso',
                  required: true,
                  maxLength: 20,
                  admin: { placeholder: 'Segunda-feira' },
                },
                {
                  name: 'dayNumber',
                  type: 'number',
                  label: 'Número do dia',
                  required: true,
                  admin: { placeholder: '13' },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO e Compartilhamento',
          description: 'Controla como esta pagina aparece no Google e ao ser compartilhada no WhatsApp, Facebook e Twitter.',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Titulo para o Google',
              maxLength: 60,
              admin: {
                description: 'Aparece na aba do navegador e nos resultados de busca. Maximo 60 caracteres. Se vazio, usa o titulo padrao.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Descricao para o Google',
              maxLength: 160,
              admin: {
                description: 'Texto que aparece abaixo do titulo nos resultados de busca. Maximo 160 caracteres. Se vazio, usa a descricao padrao.',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagem de compartilhamento',
              admin: {
                description: 'Imagem que aparece ao compartilhar esta pagina no WhatsApp, Facebook, Twitter, etc. Tamanho ideal: 1200x630px. Se vazio, usa a imagem padrao definida em Configuracoes do Site.',
              },
            },
          ],
        },
      ],
    },
  ],
}
