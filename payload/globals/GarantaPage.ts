import type { GlobalConfig } from 'payload'
import { globalAccess } from '../access'

export const GarantaPage: GlobalConfig = {
  slug: 'garanta-page',
  label: 'Página Garanta sua Vaga',
  access: globalAccess,
  admin: {
    group: 'Páginas',
    description: 'Conteúdo da página Garanta sua Vaga.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Conteúdo',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              label: 'Eyebrow',
              maxLength: 50,
              defaultValue: 'Entrada Gratuita',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Título',
              maxLength: 60,
              defaultValue: 'Garanta sua Vaga',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Subtítulo',
              maxLength: 200,
              defaultValue: 'Preencha seus dados e descubra o ponto de troca mais próximo de você',
            },
            {
              name: 'donationNotice',
              type: 'textarea',
              label: 'Aviso sobre doação',
              maxLength: 300,
              defaultValue: 'Leve 1kg de alimento não perecível para trocar pelo seu ingresso. Limite de 3 ingressos por pessoa.',
            },
            {
              name: 'successHeading',
              type: 'text',
              label: 'Título de sucesso',
              maxLength: 60,
              defaultValue: 'Vaga Garantida!',
            },
            {
              name: 'nearestPointLabel',
              type: 'text',
              label: 'Label do ponto mais próximo',
              maxLength: 60,
              defaultValue: 'Ponto de Troca Mais Próximo',
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
