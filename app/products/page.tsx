'use client'

import { useEffect, useMemo, useState } from 'react'
import { getPaginatedProducts } from '@/lib/firebase/products'
import type { Product } from '@/lib/products'
import { ProductCard } from '@/components/product/ProductCard'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { ProductFilter } from '@/components/product/ProductFilter'
import { Input } from '@/components/ui/input'
import { ScrollObserver } from '@/components/common/ScrollObserver'

type SortKey = 'new' | 'priceAsc' | 'priceDesc'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cursor, setCursor] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)
  const [sortKey, setSortKey] = useState<SortKey>('new')

  // ✅ 初回読み込み（カテゴリ・タグ変更時）
  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true)
      const res = await getPaginatedProducts(
        20,
        null,
        selectedCategory,
        selectedTag
      )
      setProducts(res.products)
      setCursor(res.lastVisible)
      setLoading(false)
    }

    fetchInitialProducts()
  }, [selectedCategory, selectedTag])

  // ✅ 「もっと見る」読み込み
  const handleLoadMore = async () => {
    if (loading || !cursor) return
    setLoading(true)
    const res = await getPaginatedProducts(
      20,
      cursor,
      selectedCategory,
      selectedTag
    )
    setProducts((prev) => [...prev, ...res.products])
    setCursor(res.lastVisible)
    setLoading(false)
  }

  // ✅ 検索・価格フィルター・並び替え
  const filteredProducts = useMemo(() => {
    let result = products
      .filter((p) =>
        [p.title, p.description, ...(p.tags ?? [])]
          .join(' ')
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
      )
      .filter((p) => p.price >= minPrice && p.price <= maxPrice)

    if (sortKey === 'priceAsc') {
      result = result.sort((a, b) => a.price - b.price)
    } else if (sortKey === 'priceDesc') {
      result = result.sort((a, b) => b.price - a.price)
    } else {
      result = result.sort((a, b) => b.date.localeCompare(a.date))
    }

    return result
  }, [products, searchKeyword, minPrice, maxPrice, sortKey])

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">商品一覧</h1>

      <Input
        type="text"
        placeholder="商品名・説明・タグで検索..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="w-full max-w-md"
      />

      <div className="mt-2">
        <label className="text-sm mr-2 font-medium">並び順:</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="border px-2 py-1 rounded"
        >
          <option value="new">新着順</option>
          <option value="priceAsc">価格が安い順</option>
          <option value="priceDesc">価格が高い順</option>
        </select>
      </div>

      <ProductFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 自動スクロール読み込み */}
      {cursor && (
        <div className="text-center mt-8">
          <ScrollObserver onIntersect={handleLoadMore} disabled={loading} />
          {loading && (
            <p className="text-sm text-gray-500 mt-2">読み込み中...</p>
          )}
        </div>
      )}
    </main>
  )
}
