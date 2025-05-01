import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export type AdminProduct = {
  id: string
  title: string
  image: string // ⭐️ ←これを追加！
  price: number
  category: string
  tags: string[]
  date: string
  rakutenLink: string
  amazonLink: string
}

export const useAdminProducts = () => {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    const snapshot = await getDocs(collection(db, 'products'))
    const data = snapshot.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        title: d.title || '',
        image: d.image || '',
        price: d.price || 0,
        category: d.category || '',
        tags: d.tags || [],
        date: d.date || '',
        rakutenLink: d.rakutenLink || '',
        amazonLink: d.amazonLink || '',
      }
    })
    setProducts(data)
    setLoading(false)
  }

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id))
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, loading, deleteProduct }
}
