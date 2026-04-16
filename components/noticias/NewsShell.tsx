'use client'

import React, { useState, useMemo } from 'react'
import type { NewsCategory, BlogPost } from '@/lib/types'
import CategoryFilter from './CategoryFilter'
import NewsCard from './NewsCard'
import AdBanner from './AdBanner'

export default function NewsShell({
  categories,
  posts,
}: {
  categories: NewsCategory[]
  posts: BlogPost[]
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      selectedCategory
        ? posts.filter((p) => p.category.slug === selectedCategory)
        : posts,
    [selectedCategory, posts],
  )

  return (
    <>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <section className="bg-white py-8 sm:py-12">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm uppercase tracking-wider font-bold">
                Nenhuma notícia encontrada
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((post, i) => {
                const isFeatured = i === 0 && selectedCategory === null
                const adBreak = selectedCategory === null ? 5 : 3
                return (
                  <React.Fragment key={post.id}>
                    {i === adBreak && filtered.length > adBreak && <AdBanner />}
                    <NewsCard post={post} featured={isFeatured} />
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
