import type { Contest } from '@/lib/types'
import { COLOR_HEX, COLOR_MAP } from '@/lib/helpers'

function TrophyIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3h14M9 3v2a3 3 0 006 0V3M5 3a2 2 0 00-2 2v2a5 5 0 005 5h0a5 5 0 005-5V5a2 2 0 00-2-2M12 12v4m-3 4h6" />
    </svg>
  )
}

export default function ContestPrizes({ contest }: { contest: Contest }) {
  const accentHex = COLOR_HEX[contest.color]
  const colors = COLOR_MAP[contest.color]

  return (
    <section className="bg-white py-8 sm:py-20">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-1.5 sm:mb-2">
          Premiação
        </p>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-6 sm:mb-14">
          Prêmios
        </h2>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
          {contest.prizes.map((prize, i) => {
            const isFirst = i === 0
            return (
              <div
                key={prize.place}
                className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-8 text-center transition-transform hover:-translate-y-1 ${
                  isFirst
                    ? `border-2 ${colors.border} bg-gray-50 shadow-lg sm:scale-105`
                    : 'border border-gray-200 bg-white'
                }`}
              >
                {isFirst && (
                  <div
                    className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: accentHex }}
                  >
                    <TrophyIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                )}

                <p className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 sm:mb-3 mt-1">
                  {prize.place}
                </p>
                <p
                  className="text-lg sm:text-4xl font-bold font-[family-name:var(--font-heading)]"
                  style={{ color: accentHex }}
                >
                  {prize.amount}
                </p>
                <p className="mt-1.5 sm:mt-3 text-[10px] sm:text-sm text-gray-600 leading-snug sm:leading-relaxed">
                  {prize.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
