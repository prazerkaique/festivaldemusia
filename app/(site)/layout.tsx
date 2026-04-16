import type { Metadata } from 'next'
import { Bricolage_Grotesque, Barlow_Condensed, Karla } from 'next/font/google'
import './globals.css'
import { getSiteSettings } from '@/lib/payload-fetchers'
import { getBaseUrl } from '@/lib/seo'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import SpotifyBar from '@/components/ui/SpotifyBar'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl()

  try {
    const settings = await getSiteSettings() as any
    const name = settings.festivalName || 'Festival de Musica de Maringa'
    const dates = settings.festivalDates || '13 a 19 de Outubro de 2026'
    const description = `De ${dates.toLowerCase()}, a musica toma conta de Maringa. Cultura, educacao e entretenimento em sete dias de programacao para toda a comunidade. Ingresso solidario: 1kg de alimento.`

    const ogImageUrl = settings.defaultOgImage?.url
      ? settings.defaultOgImage.url.startsWith('http')
        ? settings.defaultOgImage.url
        : `${baseUrl}${settings.defaultOgImage.url}`
      : undefined

    return {
      title: {
        default: `${name} e Regiao — ${dates}`,
        template: `%s | ${name}`,
      },
      description,
      metadataBase: new URL(baseUrl),
      robots: { index: false, follow: false },
      openGraph: {
        siteName: `${name} e Regiao`,
        locale: 'pt_BR',
        type: 'website',
        ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] } : {}),
      },
      twitter: {
        card: 'summary_large_image',
      },
      alternates: {
        types: {
          'application/rss+xml': `${baseUrl}/feed.xml`,
        },
      },
      ...(settings.googleVerification
        ? { verification: { google: settings.googleVerification } }
        : {}),
    }
  } catch {
    return {
      title: {
        default: 'Festival de Musica de Maringa e Regiao — 13 a 19 de Outubro de 2026',
        template: '%s | Festival de Musica de Maringa',
      },
      description:
        'De 13 a 19 de outubro de 2026, a musica toma conta de Maringa. Cultura, educacao e entretenimento em sete dias de programacao para toda a comunidade. Ingresso solidario: 1kg de alimento.',
      metadataBase: new URL(baseUrl),
      robots: { index: false, follow: false },
    }
  }
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let orgName = 'Festival de Musica de Maringa e Regiao'
  let sameAs: string[] = []
  let spotifyUrl: string | null = null

  try {
    const settings = await getSiteSettings() as any
    orgName = settings.festivalName ? `${settings.festivalName} e Regiao` : orgName
    const social = settings.socialLinks
    if (social) {
      sameAs = [social.instagram, social.facebook, social.youtube, social.tiktok, social.spotify].filter(Boolean)
    }
    if (settings.spotifyEnable && settings.spotifyUrl) {
      spotifyUrl = settings.spotifyUrl
    }
  } catch { /* fallback */ }

  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${barlowCondensed.variable} ${karla.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-bold"
        >
          Pular para o conteudo
        </a>
        <OrganizationJsonLd name={orgName} sameAs={sameAs} />
        <div id="main-content">
          {children}
        </div>
        {spotifyUrl && <SpotifyBar url={spotifyUrl} />}
      </body>
    </html>
  )
}
