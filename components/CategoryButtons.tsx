'use client'

import { useRouter } from 'next/navigation'

const categories = [
  { label: '英語', tag: 'english' },
  { label: 'プログラミング', tag: 'programming' },
  { label: '音楽', tag: 'music' },
  { label: 'スポーツ', tag: 'sports' },
]

const CategoryButtons = () => {
  const router = useRouter()

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.tag}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          onClick={() => router.push(`/category/${category.tag}`)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryButtons
