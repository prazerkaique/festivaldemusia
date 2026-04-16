import type { GlobalConfig } from 'payload'
import { globalAccess } from '../access'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Página Inicial',
  access: globalAccess,
  admin: {
    group: 'Páginas',
    description: 'Conteúdo da página inicial do site.',
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
              name: 'heroSubtitle',
              type: 'text',
              label: 'Subtítulo do Hero',
              maxLength: 120,
              defaultValue: 'A cidade se torna instrumento, o povo se torna platéia e a música é a protagonista.',
            },
            {
              name: 'heroCountdownLabel',
              type: 'text',
              label: 'Label do Countdown',
              maxLength: 60,
              defaultValue: 'Falta pouco para o festival',
            },
            {
              name: 'heroCta1Label',
              type: 'text',
              label: 'Texto do Botão 1',
              maxLength: 30,
              defaultValue: 'Garanta sua vaga',
            },
            {
              name: 'heroCta1Href',
              type: 'text',
              label: 'Link do Botão 1',
              maxLength: 80,
              defaultValue: '/garanta-sua-vaga',
            },
            {
              name: 'heroCta2Label',
              type: 'text',
              label: 'Texto do Botão 2',
              maxLength: 30,
              defaultValue: 'Ver Programação',
            },
            {
              name: 'heroCta2Href',
              type: 'text',
              label: 'Link do Botão 2',
              maxLength: 80,
              defaultValue: '#programacao',
            },
            {
              name: 'countdownTargetDate',
              type: 'text',
              label: 'Data alvo do countdown (ISO)',
              maxLength: 30,
              defaultValue: '2026-10-13T18:00:00-03:00',
              admin: { description: 'Formato ISO: 2026-10-13T18:00:00-03:00' },
            },
          ],
        },
        {
          label: 'Sobre',
          fields: [
            {
              name: 'aboutBadge',
              type: 'text',
              label: 'Badge',
              maxLength: 40,
              defaultValue: 'O Festival',
            },
            {
              name: 'aboutHeading',
              type: 'text',
              label: 'Título',
              maxLength: 60,
              defaultValue: 'Transformar Maringá na',
            },
            {
              name: 'aboutHeadingAccent',
              type: 'text',
              label: 'Título (destaque colorido)',
              maxLength: 40,
              defaultValue: 'Capital da Música',
            },
            {
              name: 'aboutParagraph1',
              type: 'textarea',
              label: 'Parágrafo 1',
              maxLength: 300,
              defaultValue: 'Em 2026, o festival propõe unir cultura, educação e entretenimento, fortalecendo a identidade artística local. De 13 a 19 de outubro, a música toma conta das ruas, praças, escolas, teatros e espaços públicos.',
            },
            {
              name: 'aboutParagraph2',
              type: 'textarea',
              label: 'Parágrafo 2',
              maxLength: 300,
              defaultValue: 'Inspirado no Festival de Dança de Joinville e no Festival de Música de Viena, o projeto nasceu com a missão de posicionar Maringá — a Cidade Canção — como polo musical de referência nacional.',
            },
            {
              name: 'aboutVideo',
              type: 'text',
              label: 'Vídeo (path ou URL)',
              admin: { placeholder: '/assets/video-about.mp4' },
            },
          ],
        },
        {
          label: 'Números',
          fields: [
            {
              name: 'statsLabel',
              type: 'text',
              label: 'Label da seção',
              maxLength: 50,
              defaultValue: 'Edição 2025 em Números',
            },
            {
              name: 'statsFooter',
              type: 'text',
              label: 'Texto abaixo dos números',
              maxLength: 80,
              defaultValue: 'em 2026 esperamos ainda mais',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Estatísticas',
              minRows: 2,
              maxRows: 6,
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  label: 'Valor',
                  required: true,
                },
                {
                  name: 'suffix',
                  type: 'text',
                  label: 'Sufixo',
                  maxLength: 10,
                  admin: { placeholder: 'h+, mil+, M+' },
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Descrição',
                  maxLength: 50,
                  required: true,
                },
                {
                  name: 'color',
                  type: 'select',
                  label: 'Cor',
                  defaultValue: 'purple',
                  options: [
                    { label: 'Purple', value: 'purple' },
                    { label: 'Orange', value: 'orange' },
                    { label: 'Cyan', value: 'cyan' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Atrações',
          description: 'Os cards vêm da collection Atrações (featured: true)',
          fields: [
            {
              name: 'atracoesBadge',
              type: 'text',
              label: 'Badge',
              maxLength: 40,
              defaultValue: 'Confirmados',
            },
            {
              name: 'atracoesHeading',
              type: 'text',
              label: 'Título',
              maxLength: 60,
              defaultValue: 'Principais Atrações',
            },
          ],
        },
        {
          label: 'Local',
          fields: [
            {
              name: 'locationBadge',
              type: 'text',
              label: 'Badge',
              maxLength: 40,
              defaultValue: 'O Local',
            },
            {
              name: 'locationHeading',
              type: 'text',
              label: 'Título',
              maxLength: 40,
              defaultValue: 'Maringá,',
            },
            {
              name: 'locationHeadingAccent',
              type: 'text',
              label: 'Título (destaque)',
              maxLength: 40,
              defaultValue: 'Cidade Canção',
            },
            {
              name: 'locationDescription',
              type: 'textarea',
              label: 'Descrição',
              maxLength: 300,
              defaultValue: 'O festival acontece em diversos pontos da cidade — teatros, praças, ruas, parques, escolas, aeroporto e rodoviária. Uma semana inteira de música espalhada por Maringá.',
            },
            {
              name: 'locationVideo',
              type: 'text',
              label: 'Vídeo (path ou URL)',
              admin: { placeholder: '/assets/video-local.mp4' },
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
