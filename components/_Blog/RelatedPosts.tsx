// components/blog/RelatedPosts.tsx

import { Post } from '@/lib/posts'
import { BlogCard } from './BlogCard'

type Props = {
  posts: Post[]
}

export const RelatedPosts = ({ posts }: Props) => {
  if (!posts || posts.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">関連記事</h2>
        <p className="text-gray-500">関連する記事は見つかりませんでした。</p>
      </section>
    )
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">関連記事</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
