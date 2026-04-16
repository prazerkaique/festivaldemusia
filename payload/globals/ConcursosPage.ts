import type { GlobalConfig } from 'payload'
import { globalAccess } from '../access'

export const ConcursosPage: GlobalConfig = {
  slug: 'concursos-page',
  label: 'Página Concursos',
  access: globalAccess,
  admin: {
    group: 'Páginas',
    description: 'Conteúdo da página de concursos.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagem de fundo',
            },
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              maxLength: 40,
              defaultValue: 'Participe',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Título',
              maxLength: 60,
              defaultValue: 'Concursos',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Subtítulo',
              maxLength: 200,
              defaultValue: 'Mostre seu talento e concorra a prêmios em dinheiro, troféus e oportunidades únicas no maior festival de música de Maringá.',
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
