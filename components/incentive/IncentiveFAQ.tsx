'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Eu preciso ter dinheiro sobrando para incentivar?',
    a: 'Não. O valor destinado é abatido integralmente do imposto que você já ia pagar. Você não desembolsa nada a mais — apenas redireciona uma parte do tributo para o festival em vez de mandar 100% para a União ou para o Paraná.',
  },
  {
    q: 'Qual o limite que eu posso destinar?',
    a: 'Pessoa Física: até 6% do imposto de renda devido (modelo completo). Pessoa Jurídica (Lucro Real): até 4% do IRPJ. Empresas do Paraná: até 3% do ICMS via PROFICE. Os limites são independentes entre si.',
  },
  {
    q: 'Preciso ser empresa para incentivar?',
    a: 'Não. Qualquer pessoa física que declare o Imposto de Renda no modelo completo pode destinar parte do imposto. Basta fazer a doação dentro do ano fiscal e informar na declaração anual.',
  },
  {
    q: 'Como tenho certeza de que o dinheiro chega no festival?',
    a: 'Todo incentivo é regido pela Lei Rouanet (federal) ou pela SEEC-PR (PROFICE). A doação é feita para uma conta captadora vinculada a um projeto aprovado com PRONAC próprio. O festival emite recibo oficial e presta contas dos recursos.',
  },
  {
    q: 'Qual o prazo para destinar?',
    a: 'PF: até 31 de dezembro do ano fiscal correspondente (para abater na declaração do ano seguinte). PJ: dentro do ano-calendário do Lucro Real. ICMS-PR: conforme cronograma do PROFICE. Quanto antes, melhor.',
  },
  {
    q: 'Minha empresa tem visibilidade em troca?',
    a: 'Sim. Incentivadores PJ têm marca vinculada ao festival em cotas proporcionais ao valor: exposição em palcos, materiais, mídias digitais, camisetas e ativações de marca no evento.',
  },
]

export default function IncentiveFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-gray-50 py-14 sm:py-24 lg:py-28">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-10 sm:mb-14">
            Ainda tem dúvida?
          </h2>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <button
                key={faq.q}
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-orange transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 font-[family-name:var(--font-heading)]">
                    {faq.q}
                  </h3>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full bg-orange text-white flex items-center justify-center text-lg font-bold transition-transform duration-300 ${
                      open === i ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open === i ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            Outras dúvidas?{' '}
            <a href="#quero-incentivar" className="text-orange font-semibold hover:underline">
              Fale com a gente
            </a>{' '}
            e explicamos caso a caso.
          </p>
        </div>
      </div>
    </section>
  )
}
