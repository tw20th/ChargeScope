'use client'

import Link from 'next/link'

type Props = {
  href: string
  label?: string
}

export const LoadMoreButton = ({ href, label = 'もっと見る' }: Props) => {
  return (
    <div className="text-center mt-6">
      <Link
        href={href}
        className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
      >
        {label}
      </Link>
    </div>
  )
}
