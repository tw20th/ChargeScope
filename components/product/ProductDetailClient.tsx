'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RelatedProducts } from '@/components/product/RelatedProducts'

type Props = {
  product: any
  relatedProducts: any[]
}

function useViewCount(slug: string) {
  useEffect(() => {
    const key = `viewed-${slug}`
    if (sessionStorage.getItem(key)) return

    fetch('/api/viewCount', {
      method: 'POST',
      body: JSON.stringify({ slug }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      sessionStorage.setItem(key, 'true')
    })
  }, [slug])
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  useViewCount(product.slug)

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
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

      <div className="flex flex-wrap gap-2 mb-8">
        {product.tags?.map((tag: string) => (
          <span
            key={tag}
            className="bg-gray-100 text-sm text-gray-600 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 mb-8">
        <Link
          href={`/api/clickCount?slug=${product.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition"
        >
          楽天でこの商品を見る
        </Link>
      </div>

      <RelatedProducts products={relatedProducts} />
    </main>
  )
}
