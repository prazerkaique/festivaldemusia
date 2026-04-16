const ICON_MAP: Record<string, React.ReactNode> = {
  audience: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  creative: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  social: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  regional: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  legacy: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-6.388V4.5c0-.067-.01-.133-.03-.197" />
    </svg>
  ),
  visibility: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>
  ),
}

const COLOR_STYLES: Record<string, { iconColor: string; hoverCard: string; hoverIcon: string; hoverTitle: string; hoverDesc: string }> = {
  purple: {
    iconColor: 'text-purple', hoverCard: 'hover:bg-purple',
    hoverIcon: 'group-hover:text-white', hoverTitle: 'group-hover:text-white', hoverDesc: 'group-hover:text-white/80',
  },
  orange: {
    iconColor: 'text-orange', hoverCard: 'hover:bg-orange',
    hoverIcon: 'group-hover:text-white', hoverTitle: 'group-hover:text-white', hoverDesc: 'group-hover:text-white/80',
  },
  cyan: {
    iconColor: 'text-cyan', hoverCard: 'hover:bg-cyan',
    hoverIcon: 'group-hover:text-white', hoverTitle: 'group-hover:text-white', hoverDesc: 'group-hover:text-white/80',
  },
  peach: {
    iconColor: 'text-cyan', hoverCard: 'hover:bg-peach',
    hoverIcon: 'group-hover:text-gray-900', hoverTitle: 'group-hover:text-gray-900', hoverDesc: 'group-hover:text-gray-700',
  },
}

const FALLBACK_BENEFITS = [
  { title: 'Conexão com Diferentes Públicos', description: 'Alta visibilidade nos eventos e na mídia, alcançando públicos diversos em toda a região.', iconType: 'audience' as const, color: 'purple' as const },
  { title: 'Ativações Criativas', description: 'Oportunidades de interação direta com o público em espaços estratégicos do festival.', iconType: 'creative' as const, color: 'orange' as const },
  { title: 'Impacto Social e Educacional', description: 'Apoio à formação de novos talentos e à democratização do acesso à música.', iconType: 'social' as const, color: 'cyan' as const },
  { title: 'Geração de Valor para a Região', description: 'Fortalecimento da economia criativa, incentivo ao turismo e movimentação de comércio, hotelaria e serviços.', iconType: 'regional' as const, color: 'purple' as const },
  { title: 'Legado Institucional', description: 'Patrocinar um evento que vai além do entretenimento e deixa uma contribuição duradoura para a cidade.', iconType: 'legacy' as const, color: 'orange' as const },
  { title: 'Alta Visibilidade', description: 'Presença de marca em materiais, mídias digitais, painéis e palcos do festival.', iconType: 'visibility' as const, color: 'peach' as const },
]

interface BenefitItem {
  title: string
  description: string
  iconType: string
  color?: string
}

interface BenefitsGridProps {
  label?: string
  heading?: string
  benefits?: BenefitItem[]
}

export default function BenefitsGrid({
  label = 'Por Que Apoiar',
  heading = 'Benefícios para sua Marca',
  benefits,
}: BenefitsGridProps) {
  const items = benefits && benefits.length > 0 ? benefits : FALLBACK_BENEFITS

  return (
    <section className="bg-white py-10 sm:py-24 lg:py-28">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
          {label}
        </p>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-6 sm:mb-16">
          {heading}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {items.map((benefit) => {
            const styles = COLOR_STYLES[benefit.color ?? 'purple'] ?? COLOR_STYLES.purple
            const icon = ICON_MAP[benefit.iconType] ?? ICON_MAP.audience

            return (
              <div
                key={benefit.title}
                className={`group border border-gray-200 ${styles.hoverCard} bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-transparent`}
              >
                <div className={`${styles.iconColor} ${styles.hoverIcon} mb-2 sm:mb-4 transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-7 sm:[&>svg]:h-7`}>{icon}</div>
                <h3 className={`text-sm sm:text-lg font-bold text-gray-900 ${styles.hoverTitle} font-[family-name:var(--font-heading)] mb-1 sm:mb-2 transition-colors duration-300 leading-tight`}>
                  {benefit.title}
                </h3>
                <p className={`text-gray-500 ${styles.hoverDesc} text-[11px] sm:text-sm leading-snug sm:leading-relaxed transition-colors duration-300`}>{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
