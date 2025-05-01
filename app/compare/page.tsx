'use client'

import { useEffect, useState } from 'react'
import { CategoryTabs } from '@/components/product/CategoryTabs'
import { ProductComparisonTable } from '@/components/product/ProductComparisonTable'
import { NoticeText } from '@/components/common/NoticeText'
import { getAllProducts, getProductsByCategory } from '@/lib/products'
import type { Product } from '@/lib/products'

export default function ComparePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let data: Product[] = []
        if (selectedCategory === 'all') {
          data = await getAllProducts() // 「すべて」なら全商品取得
        } else {
          data = await getProductsByCategory(selectedCategory) // カテゴリごとの商品取得
        }
        setProducts(data)
      } catch (error) {
        console.error('商品取得エラー:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">価格比較ページ</h1>

      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <p className="text-center text-gray-500 mt-8">読み込み中...</p>
      ) : (
        <ProductComparisonTable products={products} />
      )}

      <NoticeText>
        ※価格は変動する場合があります。最新情報をご確認ください。
      </NoticeText>
    </main>
  )
}
