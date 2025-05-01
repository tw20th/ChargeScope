'use client'

import Link from 'next/link'

const guides = [
  {
    step: 'STEP 1',
    title: '飼育前に知っておきたいこと',
    href: '/beginner-guide/preparation',
  },
  {
    step: 'STEP 2',
    title: '必要な飼育用品を揃えよう',
    href: '/beginner-guide/supplies',
  },
  {
    step: 'STEP 3',
    title: '実際にお迎えしてみよう',
    href: '/beginner-guide/how-to-keep',
  },
]

export const BeginnerGuide = () => {
  return (
    <section className="py-16 px-4 bg-green-50">
      <h2 className="text-2xl font-bold text-center mb-10">
        はじめての飼育ガイド
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 text-center"
          >
            <div className="text-green-600 font-bold mb-2">{guide.step}</div>
            <h3 className="text-lg font-semibold">{guide.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
