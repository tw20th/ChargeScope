export const dynamic = 'force-dynamic'

import { getPostsByCategory } from '@/lib/posts'
import { BlogCard } from '@/components/blog/BlogCard'

type Props = {
  params: {
    slug: string // categoryのslug
  }
}

export default async function CategoryPage({ params }: Props) {
  const posts = await getPostsByCategory(params.slug)

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">カテゴリ: {params.slug}</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">このカテゴリには記事がありません。</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
