// app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { getProductsByIds } from '@/lib/products' // ✅ 追加！
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ProductCard } from '@/components/product/ProductCard' // ✅ 追加！

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description || 'はちゅナビの爬虫類ブログです。',
    openGraph: {
      title: post.title,
      description: post.description || 'はちゅナビの爬虫類ブログです。',
      images: [post.image || 'https://hatyu-navi.vercel.app/ogp.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || 'はちゅナビの爬虫類ブログです。',
      images: [post.image || 'https://hatyu-navi.vercel.app/ogp.png'],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  const relatedPosts = await getRelatedPosts(
    post.category || '',
    post.tags || [],
    post.slug
  )

  const relatedProducts = post.relatedIds
    ? await getProductsByIds(post.relatedIds)
    : []

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {post.image && (
        <figure className="aspect-video relative rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <figcaption className="text-sm text-center text-gray-500 mt-2">
            {post.imageComment}
          </figcaption>
        </figure>
      )}

      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content || ''}</ReactMarkdown>
      </div>

      {/* ✅ 関連商品セクション */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">🔗 関連商品</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ✅ 関連記事セクション */}
      <RelatedPosts posts={relatedPosts} />
    </main>
  )
}
