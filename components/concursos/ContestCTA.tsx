import ColorBadgeLink from '@/components/ui/ColorBadgeLink'
import type { Contest } from '@/lib/types'
import { COLOR_HEX } from '@/lib/helpers'

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

export default function ContestCTA({ contest }: { contest: Contest }) {
  const accentHex = COLOR_HEX[contest.color]

  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: accentHex }}
    >
      <div className="container-site px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase font-[family-name:var(--font-heading)] mb-4">
          Faça parte do festival
        </h2>
        <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8">
          Inscreva-se agora e mostre seu talento no {contest.title}. As vagas são limitadas!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ColorBadgeLink
            href={contest.registrationUrl}
            className="inline-flex items-center gap-3 bg-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105"
          >
            Inscreva-se Agora
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </ColorBadgeLink>

          {contest.pdfUrl && (
            <ColorBadgeLink
              href={contest.pdfUrl}
              className="inline-flex items-center gap-2 text-white/90 text-sm font-medium underline underline-offset-4 decoration-white/40 px-3 py-1.5 rounded-full"
            >
              <DownloadIcon />
              Baixar Cartilha Completa (PDF)
            </ColorBadgeLink>
          )}
        </div>
      </div>
    </section>
  )
}
