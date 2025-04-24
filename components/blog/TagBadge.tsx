'use client'

import { useEffect, useState } from 'react'
import { getTagLabel } from '@/lib/firebase/gettagsLabel'

type Props = {
  tag: string
}

export const TagBadge = ({ tag }: Props) => {
  const [label, setLabel] = useState(tag)

  useEffect(() => {
    getTagLabel(tag).then(setLabel)
  }, [tag])

  return (
    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
      #{label}
    </span>
  )
}
