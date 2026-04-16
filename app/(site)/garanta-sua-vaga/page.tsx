import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import GarantaSuaVaga from '@/components/ui/GarantaSuaVaga'
import { getExchangePoints, getGarantaPage, getSiteSettings } from '@/lib/payload-fetchers'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getGarantaPage(), getSiteSettings()])
  const p = page as any
  const s = settings as any

  return buildMetadata({
    title: p.metaTitle || 'Garanta sua Vaga',
    description: p.metaDescription || 'Garanta seu ingresso gratuito para o Festival de Musica de Maringa 2026. Troque 1kg de alimento nao perecivel pelo seu ingresso nos pontos de troca.',
    ogImage: p.ogImage,
    defaultOgImage: s.defaultOgImage,
    path: '/garanta-sua-vaga',
  })
}

export default async function GarantaSuaVagaPage() {
  const [exchangePoints, page] = await Promise.all([
    getExchangePoints(),
    getGarantaPage(),
  ])

  const p = page as any

  return (
    <div className="bg-orange min-h-screen">
      <Header />
      <GarantaSuaVaga
        exchangePoints={exchangePoints}
        eyebrow={p.eyebrow}
        heading={p.heading}
        subtitle={p.subtitle}
        donationNotice={p.donationNotice}
        successHeading={p.successHeading}
        nearestPointLabel={p.nearestPointLabel}
      />
      <Footer />
    </div>
  )
}
