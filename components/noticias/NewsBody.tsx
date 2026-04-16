function SideAdSquare() {
  return (
    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center aspect-square">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
          Publicidade
        </p>
        <p className="text-xs text-gray-300 mt-1">300 x 300</p>
      </div>
    </div>
  )
}

function SideAdVertical() {
  return (
    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center sticky top-28"
      style={{ minHeight: '600px', width: '160px' }}
    >
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-gray-400 [writing-mode:vertical-lr] rotate-180">
          Publicidade
        </p>
        <p className="text-xs text-gray-300 mt-2">160 x 600</p>
      </div>
    </div>
  )
}

export default function NewsBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-8 xl:gap-10">
          {/* Left vertical banner — desktop only */}
          <aside className="hidden lg:block shrink-0">
            <SideAdVertical />
          </aside>

          {/* Article body */}
          <div className="max-w-3xl w-full space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-gray-700 text-base sm:text-lg leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Right square banners — desktop only */}
          <aside className="hidden lg:flex flex-col gap-6 shrink-0 w-[300px]">
            <SideAdSquare />
            <SideAdSquare />
          </aside>
        </div>
      </div>
    </section>
  )
}
