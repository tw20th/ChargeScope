// hooks/usePopularProducts.ts
import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  limit,
  query,
} from 'firebase/firestore'
import { firebaseApp } from '@/lib/firebase' // ← クライアント用 Firebase 初期化済み

export type Product = {
  id: string
  title: string
  image: string
  price: number
  slug: string
  link: string
  rakutenLink?: string
  tags?: string[]
  category?: string
  displayCategory?: string
  clickCount?: number
}

export const usePopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const db = getFirestore(firebaseApp)
      const q = query(
        collection(db, 'products'),
        orderBy('clickCount', 'desc'),
        limit(6)
      )
      const snapshot = await getDocs(q)
      const result: Product[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Product[]
      setProducts(result)
      setLoading(false)
    }

    fetch()
  }, [])

  return { products, loading }
}
