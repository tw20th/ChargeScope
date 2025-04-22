// components/product/ProductCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: {
    id: string
    title: string
    image: string
    slug?: string
    link: string
    rakutenLink?: string // ✅ ここ追加！
    tags?: string[]
    date?: string
    category?: string
    displayCategory?: string
    price: number
  }
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
      {/* ✅ 商品詳細ページへの内部リンク */}
      <Link href={`/products/${product.slug ?? product.id}`}>
        <div className="aspect-video relative mb-3 rounded-lg overflow-hidden cursor-pointer">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-lg font-bold mb-1 hover:underline">
          {product.title}
        </h3>
      </Link>

      {/* デバッグ用：追加情報 */}
      <div className="text-xs text-gray-600 space-y-0.5 mb-2">
        <p>
          <span className="font-semibold">ID:</span> {product.id}
        </p>
        <p>
          <span className="font-semibold">カテゴリ:</span> {product.category}
        </p>
        <p>
          <span className="font-semibold">表示カテゴリ:</span>{' '}
          {product.displayCategory}
        </p>
        <p>
          <span className="font-semibold">価格:</span> ¥
          {product.price.toLocaleString()}
        </p>
      </div>

      {/* タグ */}
      {product.tags && (
        <div className="flex flex-wrap gap-2 mb-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 楽天リンク */}
      <Link
        href={product.rakutenLink ?? product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded"
      >
        楽天で見る
      </Link>
    </div>
  )
}
