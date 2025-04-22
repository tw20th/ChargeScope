'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { getHybridPopularTags } from '@/lib/getHybridPopularTags'
import type { Tag } from '@/lib/tags'
import { displayCategoryLabels } from '@/lib/displayCategoryLabels'

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
  const [tags, setTags] = useState<Tag[]>([])
  const displayCategories = Object.entries(displayCategoryLabels)

  // ✅ タグを Firestore から取得
  useEffect(() => {
    const fetchTags = async () => {
      const topTags = await getHybridPopularTags(8) // ← 件数はお好みで
      setTags(topTags)
    }
    fetchTags()
  }, [])

  return (
    <div className="space-y-4">
      {/* ✅ 表示カテゴリフィルター */}
      <div className="flex gap-2 flex-wrap">
        {displayCategories.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-3 py-1 rounded-full border ${
              selectedCategory === key
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ✅ タグフィルター */}
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

      {/* ✅ 価格フィルター */}
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
