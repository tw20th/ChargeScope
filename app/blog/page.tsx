'use client'

import { BlogCard } from '@/components/Blog/BlogCard'
import { usePosts } from '@/hooks/usePosts' // ← {} でインポート！

export default function BlogPage() {
  const posts = usePosts()

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">新着ブログ記事</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  )
}
