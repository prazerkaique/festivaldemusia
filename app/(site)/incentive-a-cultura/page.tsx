import type { Metadata } from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import { getSiteSettings } from '@/lib/payload-fetchers'
import { buildMetadata } from '@/lib/seo'

const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA'))
const IncentivadorForm = dynamic(() => import('@/components/incentive/IncentivadorForm'))
const IncentiveFAQ = dynamic(() => import('@/components/incentive/IncentiveFAQ'))
const ColorBadgeLink = dynamic(() => import('@/components/ui/ColorBadgeLink'))
const ScrollReveal = dynamic(() => import('@/components/ui/ScrollReveal'))

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const s = settings as any

  return buildMetadata({
    title: 'Incentive a Cultura',
    description:
      'Destine parte dos seus impostos para o Festival de Música de Maringá. Entenda como funciona a Lei de Incentivo à Cultura (Lei Rouanet) e o PROFICE-PR e vire um incentivador sem custo adicional.',
    defaultOgImage: s.defaultOgImage,
    path: '/incentive-a-cultura',
  })
}

const MECHANISMS = [
  {
    tag: 'Pessoa Física',
    percent: '6%',
    title: 'IRPF — Lei Rouanet',
    description:
      'Se você declara Imposto de Renda no modelo completo, pode destinar até 6% do imposto devido para projetos culturais aprovados — direto na sua declaração anual.',
    highlight: 'Você já ia pagar esse imposto. Agora ele volta como cultura.',
    color: 'purple',
  },
  {
    tag: 'Pessoa Jurídica',
    percent: '4%',
    title: 'IRPJ — Lei Rouanet',
    description:
      'Empresas tributadas pelo Lucro Real podem destinar até 4% do IRPJ devido. O valor é totalmente abatido — sua empresa associa a marca a um festival de impacto sem desembolso líquido.',
    highlight: 'Abatimento integral no imposto. Marca vinculada à cultura.',
    color: 'orange',
  },
  {
    tag: 'Empresa Paranaense',
    percent: '3%',
    title: 'PROFICE — ICMS/PR',
    description:
      'O Programa Estadual de Fomento e Incentivo à Cultura permite que empresas do Paraná contribuintes do ICMS destinem até 3% do imposto devido para projetos culturais aprovados pela SEEC-PR.',
    highlight: 'Específico para empresas do Paraná. Benefício local, impacto local.',
    color: 'cyan',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Manifeste interesse',
    description:
      'Preencha o formulário abaixo. Nossa equipe te envia um dossiê com o projeto aprovado, PRONAC e instruções específicas para o seu caso (PF ou PJ).',
  },
  {
    n: '02',
    title: 'Calcule seu valor',
    description:
      'Com base na última declaração de IR ou no ICMS devido pela empresa, estimamos juntos o limite que você pode destinar dentro do teto legal.',
  },
  {
    n: '03',
    title: 'Formalize a doação',
    description:
      'Transferência direta para a conta captadora do projeto, via boleto ou PIX, com recibo oficial emitido em nome do incentivador.',
  },
  {
    n: '04',
    title: 'Abata no imposto',
    description:
      'PF declara o valor doado na declaração anual. PJ compensa no pagamento do IRPJ/ICMS. 100% do valor volta como abatimento fiscal.',
  },
]

const BENEFITS = [
  {
    title: 'Custo líquido zero',
    description:
      'O valor destinado é 100% abatido do imposto devido. Você transforma tributo em cultura sem tirar um real do caixa.',
  },
  {
    title: 'Vinculação de marca (PJ)',
    description:
      'Empresas incentivadoras têm a marca exposta em materiais, palcos e mídia oficial do festival, com níveis de cota conforme o valor.',
  },
  {
    title: 'Recibo oficial e transparência',
    description:
      'Todo recurso é fiscalizado pela Lei Rouanet ou pela SEEC-PR. Você recebe recibo oficial e relatório de prestação de contas.',
  },
  {
    title: 'Impacto direto em Maringá',
    description:
      'Seu imposto deixa de ir para Brasília ou Curitiba e vira palco, oficina, bolsa de estudo e show gratuito na sua cidade.',
  },
]

const COLOR_STYLES: Record<string, { bg: string; text: string; accent: string }> = {
  purple: { bg: 'bg-purple', text: 'text-purple', accent: 'bg-purple/10 border-purple/20' },
  orange: { bg: 'bg-orange', text: 'text-orange', accent: 'bg-orange/10 border-orange/20' },
  cyan: { bg: 'bg-cyan', text: 'text-cyan', accent: 'bg-cyan/10 border-cyan/20' },
}

export default async function IncentiveCulturaPage() {
  return (
    <>
      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden">
        <Image
          src="/assets/hero-apoie.jpg"
          alt="Público vibrando no Festival de Música de Maringá"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950/90 z-[1]" />

        <div className="relative z-10 container-site px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-24 lg:pb-28">
          <span className="hero-stagger-1 inline-block bg-orange text-white font-bold uppercase tracking-[0.25em] text-[10px] sm:text-sm px-4 sm:px-5 py-1.5 rounded-full mb-4 sm:mb-6">
            Incentive a Cultura
          </span>
          <h1 className="hero-stagger-2 text-3xl sm:text-5xl lg:text-7xl font-bold text-white uppercase font-[family-name:var(--font-heading)] leading-[1.05] mb-4 sm:mb-6 max-w-5xl mx-auto">
            Transforme seu imposto em
            <br />
            <span className="text-orange">música, cidade e legado</span>
          </h1>
          <p className="hero-stagger-3 text-white/80 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10">
            Por meio da Lei Federal de Incentivo à Cultura e do PROFICE-PR, você ou sua empresa podem
            destinar parte do imposto devido para o festival —
            <span className="text-white font-semibold"> sem custo adicional</span>. O tributo que já
            seria pago vira palco, aprendizado e cultura em Maringá.
          </p>
          <div className="hero-stagger-3 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <ColorBadgeLink
              href="#quero-incentivar"
              className="inline-flex items-center gap-2 bg-orange text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:scale-105"
            >
              Quero ser um incentivador →
            </ColorBadgeLink>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-sm font-medium uppercase tracking-wider px-4 py-3"
            >
              Entenda como funciona ↓
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ MECANISMOS ═══════════ */}
      <section id="como-funciona" className="bg-white py-14 sm:py-24 lg:py-28">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
              Os três mecanismos
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-3 sm:mb-4">
              Como você pode incentivar
            </h2>
            <p className="text-gray-600 text-center text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-16">
              Cada mecanismo atende a um perfil. Você escolhe o que se aplica ao seu imposto e destina
              o valor direto para o festival.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {MECHANISMS.map((m, i) => {
              const c = COLOR_STYLES[m.color]
              return (
                <ScrollReveal key={m.title} delay={100 + i * 120}>
                  <div className="group relative bg-white border-2 border-gray-100 rounded-3xl p-7 sm:p-8 h-full flex flex-col hover:-translate-y-2 transition-transform duration-300 hover:border-transparent hover:shadow-2xl">
                    <span
                      className={`inline-flex self-start ${c.bg} text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-5`}
                    >
                      {m.tag}
                    </span>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className={`text-6xl sm:text-7xl font-black ${c.text} font-[family-name:var(--font-heading)] leading-none`}>
                        {m.percent}
                      </span>
                      <span className="text-gray-500 text-xs uppercase tracking-wider font-bold">
                        do imposto devido
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-[family-name:var(--font-heading)] uppercase mb-3">
                      {m.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 flex-1">
                      {m.description}
                    </p>
                    <div className={`border ${c.accent} rounded-xl p-3 sm:p-4`}>
                      <p className="text-gray-900 text-xs sm:text-sm font-semibold leading-relaxed">
                        {m.highlight}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ PASSO A PASSO ═══════════ */}
      <section className="bg-peach py-14 sm:py-24 lg:py-28 relative overflow-hidden">
        <div className="container-site px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <p className="text-center text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
              Em 4 passos
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-10 sm:mb-16">
              Como vira um incentivador
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.n} delay={100 + i * 100}>
                <div className="bg-white rounded-3xl p-6 sm:p-7 h-full relative">
                  <span className="absolute -top-5 -left-2 bg-purple text-white text-xs font-black tracking-wider px-3 py-1.5 rounded-full font-[family-name:var(--font-heading)]">
                    PASSO {s.n}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-[family-name:var(--font-heading)] uppercase mb-3 mt-2">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BENEFÍCIOS ═══════════ */}
      <section className="bg-white py-14 sm:py-24 lg:py-28">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
              Por que incentivar
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-10 sm:mb-16">
              Benefícios reais
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} delay={100 + i * 100}>
                <div className="flex gap-4 sm:gap-5 bg-gray-50 rounded-2xl p-5 sm:p-6 h-full">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-[family-name:var(--font-heading)] uppercase mb-1.5 sm:mb-2">
                      {b.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA + FORMULÁRIO ═══════════ */}
      <IncentivadorForm />

      {/* ═══════════ FAQ ═══════════ */}
      <IncentiveFAQ />

      <FloatingCTA targetId="quero-incentivar" label="Quero Incentivar" color="#e9530d" />

      <Footer />
    </>
  )
}
