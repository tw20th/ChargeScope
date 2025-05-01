'use client'

import { Post } from '@/lib/posts'
import { BlogCard } from './BlogCard'
import { LoadMoreButton } from '@/components/ui/LoadMoreButton'

type Props = {
  posts: Post[]
}

const MAX_DISPLAY = 6 // ✅ 表示上限を設定

export const BlogList = ({ posts }: Props) => {
  if (!posts.length) {
    return (
      <p className="text-center text-gray-500">記事が見つかりませんでした。</p>
    )
  }

  const displayedPosts = posts.slice(0, MAX_DISPLAY)

  return (
    <section className="space-y-8">
      {/* ブログカードリスト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* もっと見るボタン */}
      {posts.length > MAX_DISPLAY && (
        <LoadMoreButton href="/blog" label="ブログをもっと見る" />
      )}
    </section>
  )
}
