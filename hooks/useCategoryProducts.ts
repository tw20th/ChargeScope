'use client'

import { useEffect, useState } from 'react'
import { getProductsByCategory } from '@/lib/products'
import type { Product } from '@/lib/products'

export const useCategoryProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await getProductsByCategory(selectedCategory)
        setProducts(data)
      } catch (error) {
        console.error('商品取得エラー:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  return { products, selectedCategory, setSelectedCategory, loading }
}
