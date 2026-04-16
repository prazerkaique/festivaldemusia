import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import { buildMetadata } from '@/lib/seo'

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Politica de Privacidade',
    description: 'Politica de privacidade do Festival de Musica de Maringa e Regiao.',
    path: '/privacidade',
  })
}

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="bg-white py-20 sm:py-28">
        <div className="container-site px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] mb-8">
            Politica de Privacidade
          </h1>

          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              O Festival de Musica de Maringa e Regiao valoriza a privacidade dos seus visitantes.
              Esta pagina descreve como coletamos, usamos e protegemos suas informacoes pessoais.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Informacoes coletadas</h2>
            <p>
              Coletamos informacoes fornecidas voluntariamente por voce ao preencher formularios
              no site, como nome, email, telefone e CEP. Tambem coletamos dados de navegacao
              anonimos (cookies, enderecos IP) para melhorar a experiencia do usuario.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Uso das informacoes</h2>
            <p>
              As informacoes coletadas sao utilizadas para: responder a solicitacoes de contato,
              processar inscricoes em concursos, enviar comunicacoes sobre o festival e melhorar
              nosso site e servicos.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Compartilhamento</h2>
            <p>
              Nao vendemos, comercializamos ou transferimos suas informacoes pessoais a terceiros,
              exceto quando necessario para cumprir obrigacoes legais ou operar nossos servicos
              (ex: processamento de formularios).
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Seguranca</h2>
            <p>
              Utilizamos medidas de seguranca adequadas para proteger suas informacoes pessoais
              contra acesso nao autorizado, alteracao ou destruicao.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Contato</h2>
            <p>
              Em caso de duvidas sobre esta politica, entre em contato pelo email{' '}
              <a href="mailto:contato@festivaldemusicademaringa.com.br" className="text-purple hover:underline">
                contato@festivaldemusicademaringa.com.br
              </a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
