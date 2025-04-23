// components/product/ProductListWithCategory.tsx
'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { productCategories } from '@/lib/productCategories'

type Props = {
  searchKeyword: string
}

export const ProductListWithCategory = ({ searchKeyword }: Props) => {
  const [selected, setSelected] = useState('cage')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = async (category: string) => {
    setLoading(true)
    const q = query(
      collection(db, 'products'),
      where('category', '==', category)
    )
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts(selected)
  }, [selected])

  const filteredProducts = products.filter((product) => {
    const keyword = searchKeyword.toLowerCase()
    return (
      product.title?.toLowerCase().includes(keyword) ||
      product.tags?.some((tag: string) => tag.toLowerCase().includes(keyword))
    )
  })

  return (
    <div className="space-y-6">
      {/* カテゴリボタン */}
      <div className="flex flex-wrap gap-2">
        {productCategories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelected(cat.slug)}
            className={`px-4 py-2 rounded-full transition ${
              selected === cat.slug
                ? 'bg-green-500 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 商品一覧 */}
      {loading ? (
        <p>読み込み中...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">該当する商品が見つかりませんでした。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
