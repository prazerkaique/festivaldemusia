import ColorBadgeLink from '@/components/ui/ColorBadgeLink'

export default function ApoieCTA() {
  return (
    <section className="bg-[#a71580] py-16 sm:py-20">
      <div className="container-site px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase font-[family-name:var(--font-heading)] mb-4">
          Apoie o Festival
        </h2>
        <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Associe sua marca a um dos maiores festivais de música do sul do Brasil.
          Conheça os planos de patrocínio e faça parte dessa história.
        </p>
        <ColorBadgeLink
          href="/apoie"
          className="inline-block bg-white text-gray-900 font-bold uppercase tracking-wider text-sm px-8 py-3.5 rounded-full hover:scale-105"
        >
          Quero Apoiar
        </ColorBadgeLink>
      </div>
    </section>
  )
}
