'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { getCategories, Category } from '@/lib/categories'
import { getTags, Tag } from '@/lib/tags'

type Props = {
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  selectedTag?: string
  setSelectedTag: (tag?: string) => void
  minPrice: number
  maxPrice: number
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void
}

export const ProductFilter = ({
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  // ✅ カテゴリ取得
  useEffect(() => {
    const fetch = async () => {
      const cats = await getCategories()
      setCategories(
        cats.filter((c) => c.type === 'product' || c.type === 'both')
      )
    }
    fetch()
  }, [])

  // ✅ タグ取得
  useEffect(() => {
    const fetch = async () => {
      const t = await getTags()
      setTags(t.filter((tag) => tag.type === 'product' || tag.type === 'both'))
    }
    fetch()
  }, [])

  return (
    <div className="space-y-4">
      {/* ✅ カテゴリ */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full border ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'text-blue-600 hover:bg-blue-100'
          }`}
        >
          すべて
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 rounded-full border ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ✅ タグ */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedTag(undefined)}
          className={`px-3 py-1 rounded-full border ${
            selectedTag === undefined
              ? 'bg-green-600 text-white'
              : 'text-green-600 hover:bg-green-100'
          }`}
        >
          すべてのタグ
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setSelectedTag(tag.id)}
            className={`px-3 py-1 rounded-full border ${
              selectedTag === tag.id
                ? 'bg-green-600 text-white'
                : 'text-green-600 hover:bg-green-100'
            }`}
          >
            #{tag.name}
          </button>
        ))}
      </div>

      {/* ✅ 価格帯 */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">価格帯:</label>
        <Input
          type="number"
          className="w-24"
          placeholder="¥ 最低"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <span className="text-gray-500">〜</span>
        <Input
          type="number"
          className="w-24"
          placeholder="¥ 最高"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
