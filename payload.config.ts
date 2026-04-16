import sharp from 'sharp'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Venues } from './payload/collections/Venues'
import { FestivalEvents } from './payload/collections/FestivalEvents'
import { NewsCategories } from './payload/collections/NewsCategories'
import { BlogPosts } from './payload/collections/BlogPosts'
import { Contests } from './payload/collections/Contests'
import { ExchangePoints } from './payload/collections/ExchangePoints'
import { Sponsors } from './payload/collections/Sponsors'
import { Artists } from './payload/collections/Artists'

import { SiteSettings } from './payload/globals/SiteSettings'
import { HomePage } from './payload/globals/HomePage'
import { ProgramacaoPage } from './payload/globals/ProgramacaoPage'
import { ConcursosPage } from './payload/globals/ConcursosPage'
import { NoticiasPage } from './payload/globals/NoticiasPage'
import { ApoiePage } from './payload/globals/ApoiePage'
import { GarantaPage } from './payload/globals/GarantaPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    dateFormat: 'dd/MM/yyyy',
    theme: 'dark',
    meta: {
      titleSuffix: ' | Painel Gerencial - Festival de Música',
    },
    components: {
      graphics: {
        Logo: './payload/components/AdminLogo',
        Icon: './payload/components/AdminIcon',
      },
      beforeNavLinks: ['./payload/components/NavBranding#NavBranding'],
    },
  },
  editor: lexicalEditor(),
  db: sqliteAdapter({
    client: {
      url: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URI ?? 'file:./.payload/data.sqlite',
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  }),
  collections: [
    Users,
    Media,
    Venues,
    FestivalEvents,
    NewsCategories,
    BlogPosts,
    Contests,
    ExchangePoints,
    Sponsors,
    Artists,
  ],
  globals: [
    SiteSettings,
    HomePage,
    ProgramacaoPage,
    ConcursosPage,
    NoticiasPage,
    ApoiePage,
    GarantaPage,
  ],
  secret: process.env.PAYLOAD_SECRET ?? 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload/payload-types.ts'),
  },
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt },
  },
  sharp,
})
