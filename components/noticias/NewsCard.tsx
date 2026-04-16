import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/types'
import { formatPostDate } from '@/lib/helpers'

export default function NewsCard({
  post,
  featured = false,
}: {
  post: BlogPost
  featured?: boolean
}) {
  return (
    <Link href={`/noticias/${post.slug}`} className={featured ? 'md:col-span-2' : ''}>
    <article
      className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          featured ? 'h-48 sm:h-64 lg:h-80' : 'h-44 sm:h-48'
        }`}
      >
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            featured
              ? '(max-width: 768px) 100vw, 66vw'
              : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Category badge */}
        <span
          className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white mb-3"
          style={{ backgroundColor: post.category.color }}
        >
          {post.category.label}
        </span>

        {/* Title */}
        <h3
          className={`font-bold text-gray-900 font-[family-name:var(--font-heading)] leading-snug group-hover:text-purple transition-colors duration-200 ${
            featured
              ? 'text-lg sm:text-xl lg:text-2xl mb-2'
              : 'text-base sm:text-lg mb-2'
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{formatPostDate(post.date)}</span>
          <span>·</span>
          <span>{post.author}</span>
        </div>
      </div>
    </article>
    </Link>
  )
}
