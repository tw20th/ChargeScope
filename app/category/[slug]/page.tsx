import { notFound } from 'next/navigation'
import { productCategories, Category } from '@/lib/productCategories'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import { Product } from '@/lib/products'
import Image from 'next/image'

type Props = {
  params: { slug: string }
}

export default function CategoryPage({ params }: Props) {
  const category = productCategories.find(
    (cat: Category) => cat.slug === params.slug
  )

  if (!category) return notFound()

  // ✅ 型エラー回避のため displayCategory を追加
  const products: Product[] = category.products.map((p, i) => ({
    id: `static-${i}`,
    slug: p.slug ?? `static-slug-${i}`,
    title: p.title,
    description: p.description,
    price: Number(p.price.replace(/[¥,]/g, '')),
    image: p.image,
    link: p.link,
    category: category.slug,
    displayCategory: category.name, // ← ここ追加！
    date: '2025-04-01',
    tags: p.tags ?? [],
  }))

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <p className="mb-6 text-gray-600">{category.description}</p>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-sm">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-auto mb-2 object-contain rounded"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-blue-600 font-bold mt-1">
              ¥{product.price.toLocaleString()}
            </p>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-blue-500 underline"
            >
              商品ページを見る
            </a>
          </div>
        ))}
      </div>

      <RelatedProducts products={products} />
    </main>
  )
}
