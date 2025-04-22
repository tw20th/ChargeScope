// app/products/[slug]/page.tsx
import { getProductBySlug, getRelatedProducts } from '@/lib/products'
import { notFound } from 'next/navigation'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import Link from 'next/link'

type Props = {
  params: { slug: string }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)
  if (!product) return notFound()

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.tags ?? [],
    product.slug
  )

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* 商品情報 */}
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-auto rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-xl text-blue-600 font-semibold mb-4">
        ¥{product.price.toLocaleString()}
      </p>

      {/* タグ */}
      <div className="flex flex-wrap gap-2 mb-8">
        {product.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-sm text-gray-600 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* ✅ 楽天リンク（アフィリエイト）ボタン */}
      <div className="mt-4 mb-8">
        <Link
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition"
        >
          楽天でこの商品を見る
        </Link>
      </div>

      {/* 関連商品 */}
      <RelatedProducts products={relatedProducts} />
    </main>
  )
}
