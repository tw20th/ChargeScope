'use client'

import { productCategories } from '@/lib/productCategories'

type Props = {
  selected: string
  onSelect: (slug: string) => void
}

export const CategorySelector = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {productCategories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
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
  )
}
