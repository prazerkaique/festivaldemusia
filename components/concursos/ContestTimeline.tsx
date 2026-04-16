import type { Contest } from '@/lib/types'
import { COLOR_HEX } from '@/lib/helpers'

export default function ContestTimeline({ contest }: { contest: Contest }) {
  const accentHex = COLOR_HEX[contest.color]

  return (
    <section className="bg-white py-8 sm:py-20">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-1.5 sm:mb-2">
          Cronograma
        </p>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-5 sm:mb-14">
          Datas Importantes
        </h2>

        <div className="max-w-xl mx-auto relative">
          {/* Vertical line */}
          <div
            className="absolute left-[13px] sm:left-[19px] top-2 bottom-2 w-0.5"
            style={{ backgroundColor: `${accentHex}30` }}
          />

          <div className="space-y-5 sm:space-y-8">
            {contest.timeline.map((step, i) => {
              const isLast = i === contest.timeline.length - 1
              return (
                <div key={i} className="relative flex items-start gap-3.5 sm:gap-6">
                  {/* Dot */}
                  <div
                    className={`shrink-0 w-[28px] h-[28px] sm:w-[40px] sm:h-[40px] rounded-full flex items-center justify-center text-white z-10 ${
                      isLast ? 'ring-4' : ''
                    }`}
                    style={{
                      backgroundColor: accentHex,
                      ...(isLast ? { ringColor: `${accentHex}30` } : {}),
                    }}
                  >
                    <span className="text-[9px] sm:text-xs font-bold">{i + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="pt-0.5 sm:pt-2">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
                      {step.date}
                    </p>
                    <p className={`text-sm sm:text-lg font-bold text-gray-900 mt-0.5 ${isLast ? 'font-[family-name:var(--font-heading)] uppercase' : ''}`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
