// app/category/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { ProductCard } from '@/components/product/ProductCard'
import { Metadata } from 'next'
import { productCategories } from '@/lib/productCategories'

type Props = {
  params: { slug: string }
}

// 📝 動的なメタデータ生成（任意）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `カテゴリ: ${params.slug} | はちゅナビ`,
    description: `「${params.slug}」カテゴリの商品一覧`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params

  // ✅ カテゴリ情報の取得（日本語名表示などのため）
  const categoryMeta = productCategories.find((cat) => cat.slug === slug)
  if (!categoryMeta) return notFound()

  // ✅ Firestore から該当カテゴリの商品を取得
  const q = query(collection(db, 'products'), where('category', '==', slug))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return notFound()

  const products = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      price: data.price,
      image: data.image,
      link: data.link,
      tags: data.tags || [],
      displayCategory: data.displayCategory || slug,
    }
  })

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        {categoryMeta.name} カテゴリの商品
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
