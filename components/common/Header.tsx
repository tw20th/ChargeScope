// components/common/Header.tsx
'use client'

import Link from 'next/link'

export const Header = () => {
  return (
    <header className="bg-bgSoft border-b border-pink-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-darkBrown">
          🦎 はちゅナビ
        </Link>
        <nav className="space-x-4 text-sm text-darkBrown">
          <Link href="/products" className="hover:underline">
            商品一覧
          </Link>
          <Link href="/blog" className="hover:underline">
            ブログ
          </Link>
          <Link href="/about" className="hover:underline">
            このサイトについて
          </Link>
        </nav>
      </div>
    </header>
  )
}
