// components/blog/CategoryFilter.tsx
'use client'

import { blogCategories } from '@/lib/blogCategories'

type Props = {
  selected: string
  onSelect: (slug: string) => void
}

export const CategoryFilter = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {blogCategories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`px-3 py-1 rounded-full border ${
            selected === cat.slug
              ? 'bg-blue-600 text-white'
              : 'text-blue-600 hover:bg-blue-100'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
