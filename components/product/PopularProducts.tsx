'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { LoadMoreButton } from '@/components/ui/LoadMoreButton'
import { db } from '@/lib/firebase'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore'

export const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularProducts = async () => {
      const ref = collection(db, 'products')
      const q = query(
        ref,
        where('isPopular', '==', true),
        orderBy('popularityRank', 'asc'),
        limit(5)
      )
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Product)
      )
      setProducts(data)
      setLoading(false)
    }
    fetchPopularProducts()
  }, [])

  if (loading) {
    return <p className="text-center text-gray-500">読み込み中...</p>
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500">
        人気商品が見つかりませんでした。
      </p>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-2xl font-bold text-center mb-10">人気の価格比較</h2>

      {/* 商品カードたち */}
      <div className="grid gap-8 md:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
          >
            <Image
              src={product.image || '/no-image.png'}
              alt={product.title}
              width={600}
              height={400}
              className="object-cover w-full h-48"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-green-600 font-bold">
                {product.price.toLocaleString()}円
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ✅ グリッドの外に「もっと見るボタン」 */}
      <LoadMoreButton href="/products" label="人気商品をもっと見る" />
    </section>
  )
}
