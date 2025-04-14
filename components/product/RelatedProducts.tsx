'use client'

import { ProductCard } from './ProductCard'
import type { Product } from '@/lib/products'

type Props = {
  products: Product[]
}

export const RelatedProducts = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">関連商品</h2>
        <p className="text-gray-500">関連する商品は見つかりませんでした。</p>
      </section>
    )
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">関連商品</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
