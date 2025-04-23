// components/product/ProductList.tsx
'use client'

import { ProductCard } from './ProductCard'
import { usePopularProducts } from '@/hooks/usePopularProducts'

export const ProductList = () => {
  const { products, loading } = usePopularProducts()

  if (loading) {
    return <p className="text-center text-gray-500">読み込み中...</p>
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500">
        人気商品が見つかりませんでした。
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
