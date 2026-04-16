import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-white flex-1 flex items-center justify-center py-24 sm:py-32">
        <div className="text-center px-4">
          <p className="text-orange font-bold uppercase tracking-[0.25em] text-sm mb-4">
            404
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] mb-4">
            Pagina nao encontrada
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto mb-8">
            A pagina que voce procura nao existe ou foi movida.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Voltar ao Inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
