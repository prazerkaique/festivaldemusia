import type { BlogPost } from '@/lib/types'
import NewsCard from './NewsCard'

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="bg-gray-50 py-14 sm:py-20">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-10">
          Leia Tambem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
