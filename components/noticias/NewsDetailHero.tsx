import Image from 'next/image'
import type { BlogPost } from '@/lib/types'
import { formatPostDate } from '@/lib/helpers'

export default function NewsDetailHero({ post }: { post: BlogPost }) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={post.thumbnail}
        alt={post.title}
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/30 to-gray-950/80 z-[1]" />

      <div className="relative z-10 container-site px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 max-w-4xl mx-auto">
        <span
          className="hero-stagger-1 inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white mb-5"
          style={{ backgroundColor: post.category.color }}
        >
          {post.category.label}
        </span>

        <h1 className="hero-stagger-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white uppercase font-[family-name:var(--font-heading)] leading-tight mb-5">
          {post.title}
        </h1>

        <div className="hero-stagger-3 flex items-center gap-3 text-sm text-white/70">
          <span>{formatPostDate(post.date)}</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>{post.author}</span>
          {post.readingTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{post.readingTime} min de leitura</span>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
