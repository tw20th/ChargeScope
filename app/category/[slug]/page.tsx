// app/category/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { allCategories } from '@/lib/categories' // ← 後ほど作る
import { ProductCard } from '@/components/ProductCard'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allCategories.map((cat) => ({ slug: cat.slug }))
}

export default function CategoryPage({ params }: Props) {
  const category = allCategories.find((c) => c.slug === params.slug)

  if (!category) return notFound()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">{category.name}</h1>
      <p className="text-gray-600">{category.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
        {category.products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </main>
  )
}
