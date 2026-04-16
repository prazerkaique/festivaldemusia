import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import ScheduleHero from '@/components/programacao/ScheduleHero'
import ScheduleShell from '@/components/programacao/ScheduleShell'
import { getFestivalDays, getProgramacaoPage, getSiteSettings } from '@/lib/payload-fetchers'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getProgramacaoPage(), getSiteSettings()])
  const p = page as any
  const s = settings as any

  return buildMetadata({
    title: p.metaTitle || 'Programacao',
    description: p.metaDescription || 'Confira a programacao completa do Festival de Musica de Maringa 2026 — 7 dias de eventos musicais em 7 palcos pela cidade. De 13 a 19 de outubro.',
    ogImage: p.ogImage,
    defaultOgImage: s.defaultOgImage,
    path: '/programacao',
  })
}

export default async function ProgramacaoPage() {
  const [days, page] = await Promise.all([
    getFestivalDays(),
    getProgramacaoPage(),
  ])

  const p = page as any

  return (
    <>
      <Header />
      <ScheduleHero
        badge={p.badge}
        heading={p.heading}
        subtitle={p.subtitle}
      />
      <ScheduleShell days={days} />
      <Footer />
    </>
  )
}
