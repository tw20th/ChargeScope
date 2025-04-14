// components/product/ProductCard.tsx

'use client'

import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: {
    title: string
    image: string
    link: string
    tags?: string[]
    date?: string
  }
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
      {/* 商品画像 */}
      <div className="aspect-video relative mb-3 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* タイトル */}
      <h3 className="text-lg font-bold mb-1">{product.title}</h3>

      {/* タグ（任意） */}
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

      {/* リンクボタン */}
      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded"
      >
        楽天で見る
      </Link>
    </div>
  )
}
