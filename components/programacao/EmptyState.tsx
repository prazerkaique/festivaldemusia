export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4" role="img" aria-label="Sem eventos">
        🎵
      </span>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-[family-name:var(--font-heading)] uppercase">
        Nenhum evento encontrado
      </h3>
      <p className="mt-2 text-gray-500 max-w-md">
        Não há eventos para esta combinação de dia e palco. Tente outro filtro ou confira outro dia da programação.
      </p>
    </div>
  )
}
