// components/product/ProductComparisonTable.tsx

'use client'

import { CompareProductCard } from './CompareProductCard'
import type { Product } from '@/lib/products'

type Props = {
  products: Product[]
}

export const ProductComparisonTable = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        現在このカテゴリには商品がありません。
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      {products.map((product) => (
        <CompareProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
