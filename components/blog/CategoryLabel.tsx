'use client'

import { useEffect, useState } from 'react'
import { getCategoryLabel } from '@/lib/firebase/getCategoryLabel'

type Props = {
  category: string
}

export const CategoryLabel = ({ category }: Props) => {
  const [label, setLabel] = useState(category)

  useEffect(() => {
    getCategoryLabel(category).then(setLabel)
  }, [category])

  return (
    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
      🗂 {label}
    </span>
  )
}
