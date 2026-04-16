import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import { buildMetadata } from '@/lib/seo'

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Politica de Cookies',
    description: 'Politica de cookies do Festival de Musica de Maringa e Regiao.',
    path: '/cookies',
  })
}

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="bg-white py-20 sm:py-28">
        <div className="container-site px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] mb-8">
            Politica de Cookies
          </h1>

          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Este site utiliza cookies para melhorar sua experiencia de navegacao. Ao continuar
              navegando, voce concorda com o uso de cookies conforme descrito abaixo.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">O que sao cookies?</h2>
            <p>
              Cookies sao pequenos arquivos de texto armazenados no seu navegador quando voce
              visita um site. Eles permitem que o site reconheca seu dispositivo e armazene
              algumas informacoes sobre suas preferencias.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Cookies que utilizamos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cookies essenciais:</strong> necessarios para o funcionamento basico do
                site, como navegacao entre paginas.
              </li>
              <li>
                <strong>Cookies de analise:</strong> nos ajudam a entender como os visitantes
                interagem com o site (Google Analytics), coletando informacoes anonimas.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Como gerenciar cookies</h2>
            <p>
              Voce pode configurar seu navegador para recusar cookies ou alertar quando um cookie
              estiver sendo enviado. No entanto, algumas funcionalidades do site podem nao
              funcionar corretamente sem cookies.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contato</h2>
            <p>
              Para duvidas sobre nossa politica de cookies, entre em contato pelo email{' '}
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
