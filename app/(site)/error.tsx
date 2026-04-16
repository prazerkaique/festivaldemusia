'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="bg-white flex-1 flex items-center justify-center py-24 sm:py-32">
      <div className="text-center px-4">
        <p className="text-purple font-bold uppercase tracking-[0.25em] text-sm mb-4">
          Erro
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] mb-4">
          Algo deu errado
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto mb-8">
          Ocorreu um erro inesperado. Tente novamente.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-purple text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
        >
          Tentar Novamente
        </button>
      </div>
    </main>
  )
}
