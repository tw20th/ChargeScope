'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { CategorySelector } from './CategorySelector'
import { LoadMoreButton } from '@/components/ui/LoadMoreButton' // ✅ ここ追加！
import Link from 'next/link'

type Props = {
  searchKeyword: string
  selectedCategory: string
}

export const ProductListWithCategory = ({
  searchKeyword,
  selectedCategory,
}: Props) => {
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
    fetchProducts(selectedCategory)
  }, [selectedCategory])

  const filteredProducts = products.filter((product) => {
    const keyword = searchKeyword.toLowerCase()
    return (
      product.title?.toLowerCase().includes(keyword) ||
      product.tags?.some((tag: string) => tag.toLowerCase().includes(keyword))
    )
  })

  const displayedProducts = filteredProducts.slice(0, 6) // ✅ 表示数を制限！

  return (
    <div className="space-y-6">
      {/* 商品一覧 */}
      {loading ? (
        <p>読み込み中...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">該当する商品が見つかりませんでした。</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* ✅ もっと見るボタン */}
          {filteredProducts.length > 6 && <LoadMoreButton href="/products" />}
        </>
      )}
    </div>
  )
}
