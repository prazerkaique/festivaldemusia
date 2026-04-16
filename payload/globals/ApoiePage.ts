import type { GlobalConfig } from 'payload'
import { globalAccess } from '../access'

export const ApoiePage: GlobalConfig = {
  slug: 'apoie-page',
  label: 'Página Apoie',
  access: globalAccess,
  admin: {
    group: 'Páginas',
    description: 'Conteúdo da página Seja um Apoiador.',
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
              defaultValue: 'Apoie o Festival',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Título',
              maxLength: 60,
              defaultValue: 'Sua Marca no Evento',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Subtítulo',
              maxLength: 200,
              defaultValue: 'Conecte sua marca a um festival que une cultura, educação e entretenimento, impactando milhares de pessoas em toda a região de Maringá.',
            },
          ],
        },
        {
          label: 'Benefícios',
          fields: [
            {
              name: 'benefitsLabel',
              type: 'text',
              label: 'Label da seção',
              maxLength: 50,
              defaultValue: 'Por Que Apoiar',
            },
            {
              name: 'benefitsHeading',
              type: 'text',
              label: 'Título da seção',
              maxLength: 60,
              defaultValue: 'Benefícios para sua Marca',
            },
            {
              name: 'benefits',
              type: 'array',
              label: 'Benefícios',
              minRows: 3,
              maxRows: 8,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                  required: true,
                  maxLength: 60,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descrição',
                  required: true,
                  maxLength: 200,
                },
                {
                  name: 'iconType',
                  type: 'select',
                  label: 'Ícone',
                  required: true,
                  options: [
                    { label: 'Público / Audiência', value: 'audience' },
                    { label: 'Criativo / Estrela', value: 'creative' },
                    { label: 'Social / Educação', value: 'social' },
                    { label: 'Regional / Cidade', value: 'regional' },
                    { label: 'Legado / Troféu', value: 'legacy' },
                    { label: 'Visibilidade / Gráfico', value: 'visibility' },
                  ],
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
                    { label: 'Peach', value: 'peach' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Edição Anterior',
          fields: [
            {
              name: 'editionLabel',
              type: 'text',
              label: 'Label da seção',
              maxLength: 50,
              defaultValue: 'Resultados',
            },
            {
              name: 'editionHeading',
              type: 'text',
              label: 'Título da seção',
              maxLength: 60,
              defaultValue: 'Edição 2025',
            },
            {
              name: 'editionParagraph',
              type: 'textarea',
              label: 'Parágrafo',
              maxLength: 400,
              defaultValue: 'A edição 2025 reuniu a Orquestra Sinfônica do Paraná, grandes shows e intervenções em espaços inusitados como o aeroporto e a rodoviária de Maringá. Oficinas de formação musical, o concurso estudantil e programação descentralizada impactaram milhares de pessoas em uma semana de pura cultura.',
            },
            {
              name: 'editionStats',
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
                  name: 'prefix',
                  type: 'text',
                  label: 'Prefixo',
                  maxLength: 5,
                  admin: { placeholder: '+' },
                },
                {
                  name: 'suffix',
                  type: 'text',
                  label: 'Sufixo',
                  maxLength: 20,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Descrição',
                  maxLength: 60,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Cobertura na Mídia',
          fields: [
            {
              name: 'mediaLabel',
              type: 'text',
              label: 'Label da seção',
              maxLength: 50,
              defaultValue: 'Cobertura',
            },
            {
              name: 'mediaHeading',
              type: 'text',
              label: 'Título da seção',
              maxLength: 60,
              defaultValue: 'Na Mídia',
            },
            {
              name: 'mediaStats',
              type: 'array',
              label: 'Mídia',
              minRows: 2,
              maxRows: 6,
              fields: [
                {
                  name: 'category',
                  type: 'text',
                  label: 'Categoria',
                  maxLength: 40,
                  required: true,
                },
                {
                  name: 'metric',
                  type: 'text',
                  label: 'Métrica',
                  maxLength: 80,
                  required: true,
                },
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
                  maxLength: 30,
                },
                {
                  name: 'iconType',
                  type: 'select',
                  label: 'Tipo de ícone',
                  required: true,
                  options: [
                    { label: 'Rádio', value: 'radio' },
                    { label: 'Social / Mobile', value: 'social' },
                    { label: 'Web / Portal', value: 'web' },
                    { label: 'Imprensa', value: 'press' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Formulário',
          fields: [
            {
              name: 'formLabel',
              type: 'text',
              label: 'Label',
              maxLength: 60,
              defaultValue: 'Formulário',
            },
            {
              name: 'formHeading',
              type: 'text',
              label: 'Título',
              maxLength: 60,
              defaultValue: 'Quero Apoiar o Festival',
            },
            {
              name: 'formSubtitle',
              type: 'text',
              label: 'Subtítulo',
              maxLength: 120,
              defaultValue: 'Preencha o formulário e nossa equipe entrará em contato',
            },
            {
              name: 'formSuccessTitle',
              type: 'text',
              label: 'Título de sucesso',
              maxLength: 60,
              defaultValue: 'Mensagem Enviada!',
            },
            {
              name: 'formSuccessMessage',
              type: 'textarea',
              label: 'Mensagem de sucesso',
              maxLength: 200,
              defaultValue: 'Obrigado pelo interesse em apoiar o Festival de Música de Maringá. Nossa equipe entrará em contato em breve.',
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
