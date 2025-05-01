// components/product/CategoryTabs.tsx

'use client'

type Props = {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

const categories = [
  { key: 'all', label: 'すべて' },
  { key: 'cage', label: 'ケージ' },
  { key: 'heater', label: 'ヒーター' },
  { key: 'light', label: 'ライト' },
  { key: 'flooring', label: '床材' },
  // 必要に応じてカテゴリを追加！
]

export function CategoryTabs({ selectedCategory, setSelectedCategory }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category.key}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === category.key
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-700 border-gray-300'
          } hover:bg-green-100 transition`}
          onClick={() => setSelectedCategory(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
