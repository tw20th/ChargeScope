'use client'

import { Heading } from '@/lib/markdown'

type Props = {
  headings: Heading[]
}

export default function TableOfContents({ headings }: Props) {
  return (
    <nav className="mb-8 border-l-4 border-pink-300 pl-4">
      <h2 className="text-lg font-semibold mb-2">目次</h2>
      <ul className="space-y-1 text-sm text-gray-700">
        {headings.map((heading, i) => (
          <li key={i} className={`ml-${(heading.level - 1) * 4}`}>
            <a
              href={`#${heading.text.replace(/\s+/g, '-')}`}
              className="hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
