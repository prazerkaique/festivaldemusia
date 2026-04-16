import type { GlobalConfig } from 'payload'
import { isMaster, isLoggedIn } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configurações do Site',
  access: {
    read: isLoggedIn,
    update: isMaster,
  },
  admin: {
    group: 'Configurações',
    description: 'Configurações gerais do festival exibidas em todo o site.',
    hidden: ({ user }) => user?.role !== 'master',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informações',
          fields: [
            {
              name: 'festivalName',
              type: 'text',
              label: 'Nome do Festival',
              defaultValue: 'Festival de Música de Maringá',
              maxLength: 80,
            },
            {
              name: 'festivalDates',
              type: 'text',
              label: 'Datas do Festival',
              defaultValue: '13 a 19 de Outubro de 2026',
              maxLength: 60,
            },
            {
              name: 'festivalLocation',
              type: 'text',
              label: 'Local',
              defaultValue: 'Maringá, Paraná',
              maxLength: 60,
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Telefone',
              maxLength: 20,
              admin: { placeholder: '(44) 3220-4003' },
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email',
              maxLength: 80,
              admin: { placeholder: 'contato@festivaldemusicademaringa.com.br' },
            },
            {
              name: 'address',
              type: 'text',
              label: 'Endereço completo',
              maxLength: 120,
              admin: { placeholder: 'Av. Getúlio Vargas, 266 — Térreo' },
            },
            {
              name: 'addressShort',
              type: 'text',
              label: 'Endereço curto (footer)',
              maxLength: 80,
              admin: { placeholder: 'Maringá, PR — 87013-130' },
            },
            {
              name: 'city',
              type: 'text',
              label: 'Cidade',
              maxLength: 40,
              admin: { placeholder: 'Maringá, PR' },
            },
            {
              name: 'cep',
              type: 'text',
              label: 'CEP',
              maxLength: 10,
              admin: { placeholder: '87013-130' },
            },
            { name: 'aboutText', type: 'textarea', label: 'Texto Sobre' },
          ],
        },
        {
          label: 'Ingresso Solidário',
          fields: [
            {
              name: 'ingressoRule',
              type: 'text',
              label: 'Regra do Ingresso',
              maxLength: 60,
              defaultValue: '1KG de Alimento = 1 Ingresso',
            },
            {
              name: 'ingressoLimit',
              type: 'text',
              label: 'Limite',
              maxLength: 50,
              defaultValue: 'limitado a 3 por pessoa',
            },
            {
              name: 'ingressoStartDate',
              type: 'text',
              label: 'Data de início',
              maxLength: 20,
              defaultValue: '13/10',
            },
            {
              name: 'ingressoHours',
              type: 'text',
              label: 'Horário',
              maxLength: 30,
              defaultValue: '9h às 18h',
            },
          ],
        },
        {
          label: 'Pilares',
          fields: [
            {
              name: 'pillarWords',
              type: 'array',
              label: 'Palavras-pilar',
              minRows: 2,
              maxRows: 5,
              fields: [
                {
                  name: 'word',
                  type: 'text',
                  label: 'Palavra',
                  required: true,
                  maxLength: 20,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO Global',
          description: 'Configuracoes de SEO que se aplicam a todo o site. Cada pagina pode sobrescrever individualmente na sua aba "SEO e Compartilhamento".',
          fields: [
            {
              name: 'siteUrl',
              type: 'text',
              label: 'URL do Site',
              maxLength: 100,
              admin: {
                placeholder: 'https://festivaldemusicademaringa.com.br',
                description: 'URL principal do site. Usada para gerar links canonicos, sitemap e compartilhamento.',
              },
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              label: 'Imagem padrao de compartilhamento',
              relationTo: 'media',
              admin: {
                description:
                  'Imagem exibida ao compartilhar qualquer pagina que nao tenha uma imagem propria (WhatsApp, Facebook, Twitter). Tamanho ideal: 1200x630px.',
              },
            },
            {
              name: 'googleVerification',
              type: 'text',
              label: 'Verificacao Google Search Console',
              maxLength: 60,
              admin: {
                placeholder: 'ex: abc123def456',
                description: 'Codigo de verificacao do Google Search Console. Fornecido pelo Google ao registrar o site.',
              },
            },
            {
              name: 'facebookAppId',
              type: 'text',
              label: 'Facebook App ID',
              maxLength: 30,
              admin: {
                placeholder: 'ex: 123456789',
                description: 'Opcional. ID do aplicativo Facebook para insights de compartilhamento.',
              },
            },
          ],
        },
        {
          label: 'Spotify',
          description: 'Player de musica que aparece como barra fixa no rodape de todas as paginas do site.',
          fields: [
            {
              name: 'spotifyEnable',
              type: 'checkbox',
              label: 'Ativar player Spotify',
              defaultValue: false,
              admin: {
                description: 'Quando ativo, exibe o player de Spotify em todas as paginas do site.',
              },
            },
            {
              name: 'spotifyUrl',
              type: 'text',
              label: 'URL da playlist Spotify',
              maxLength: 200,
              admin: {
                placeholder: 'https://open.spotify.com/playlist/...',
                description: 'Cole aqui o link da playlist do Spotify.',
                condition: (_, siblingData) => siblingData?.spotifyEnable,
              },
            },
          ],
        },
        {
          label: 'Rodapé',
          fields: [
            { name: 'footerText', type: 'textarea', label: 'Texto do Footer' },
            {
              name: 'footerTagline',
              type: 'text',
              label: 'Tagline do Footer',
              maxLength: 60,
              admin: { placeholder: 'Cidade Canção' },
            },
            {
              name: 'copyrightName',
              type: 'text',
              label: 'Nome no Copyright',
              maxLength: 80,
              defaultValue: 'Festival de Música de Maringá e Região',
            },
            {
              name: 'socialLinks',
              type: 'group',
              label: 'Redes Sociais',
              fields: [
                {
                  name: 'instagram',
                  type: 'text',
                  label: 'Instagram',
                  admin: { placeholder: 'https://instagram.com/...' },
                },
                {
                  name: 'facebook',
                  type: 'text',
                  label: 'Facebook',
                  admin: { placeholder: 'https://facebook.com/...' },
                },
                {
                  name: 'youtube',
                  type: 'text',
                  label: 'YouTube',
                  admin: { placeholder: 'https://youtube.com/...' },
                },
                {
                  name: 'tiktok',
                  type: 'text',
                  label: 'TikTok',
                  admin: { placeholder: 'https://tiktok.com/...' },
                },
                {
                  name: 'spotify',
                  type: 'text',
                  label: 'Spotify',
                  admin: { placeholder: 'https://open.spotify.com/...' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
