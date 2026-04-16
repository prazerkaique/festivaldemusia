import type { Contest } from '@/lib/types'
import { COLOR_HEX } from '@/lib/helpers'

export default function ContestCriteria({ contest }: { contest: Contest }) {
  const accentHex = COLOR_HEX[contest.color]

  return (
    <section className="bg-gray-50 py-8 sm:py-20">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-1.5 sm:mb-2">
          Regulamento
        </p>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-5 sm:mb-14">
          Critérios de Participação
        </h2>

        <ul className="max-w-2xl mx-auto space-y-2.5 sm:space-y-4">
          {contest.criteria.map((criterion, i) => (
            <li key={i} className="flex items-start gap-3 sm:gap-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm">
              <div
                className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white mt-0.5"
                style={{ backgroundColor: accentHex }}
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 text-xs sm:text-base leading-relaxed">
                {criterion.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
