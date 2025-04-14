import { getProductBySlug, getRelatedProducts } from '@/lib/products'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return <p className="p-4 text-red-500">商品が見つかりませんでした。</p>
  }

  // ✅ 関連商品取得（カテゴリ + タグ + 除外slug）
  const related = await getRelatedProducts(
    product.category,
    product.tags || [],
    product.slug
  )

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* ✅ メイン画像 */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* ✅ タイトル・説明 */}
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>

      {/* ✅ タグ */}
      <div className="flex gap-2 flex-wrap">
        {product.tags?.map((tag) => (
          <span
            key={tag}
            className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* ✅ 価格と楽天リンク */}
      <div className="space-y-2">
        <p className="text-lg font-semibold">
          価格：¥{product.price.toLocaleString()}
        </p>
        <Link
          href={product.link}
          target="_blank"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          楽天で見る
        </Link>
      </div>

      {/* ✅ 関連商品エリア */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">関連商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((item) => (
              <div
                key={item.id}
                className="border rounded p-4 shadow hover:shadow-md transition"
              >
                <div className="relative aspect-video w-full mb-2 rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  ¥{item.price.toLocaleString()}
                </p>
                <Link
                  href={`/products/${item.slug}`}
                  className="text-blue-600 text-sm underline mt-2 inline-block"
                >
                  詳細を見る
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
