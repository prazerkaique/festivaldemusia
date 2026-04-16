export default function Loading() {
  return (
    <main className="bg-white flex-1 flex items-center justify-center py-24 sm:py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-orange rounded-full animate-spin" />
        <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">
          Carregando...
        </p>
      </div>
    </main>
  )
}
