// ✅ lib/products.ts（Timestampの警告を回避する修正済みバージョン）

import { db } from './firebase'
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'

export type Product = {
  id: string
  slug: string
  title: string
  description: string
  price: number
  image: string
  link: string
  category: string
  displayCategory: string
  tags?: string[]
  date: string
  name: string
  createdAt?: string | null
  updatedAt?: string | null
}

// 🔧 Timestampを文字列に変換する共通関数
const formatProduct = (doc: DocumentData): Product => {
  const data = doc.data()
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString() ?? null,
    updatedAt: data.updatedAt?.toDate().toISOString() ?? null,
  } as Product
}

export const getPaginatedProducts = async (
  pageSize: number,
  cursor?: QueryDocumentSnapshot<DocumentData> | null,
  category: string = 'all',
  tag?: string
) => {
  const baseRef = collection(db, 'products')
  const filters = []

  if (category !== 'all') {
    filters.push(where('category', '==', category))
  }

  if (tag) {
    filters.push(where('tags', 'array-contains', tag))
  }

  let q = query(baseRef, ...filters, orderBy('date', 'desc'), limit(pageSize))

  if (cursor) {
    q = query(q, startAfter(cursor))
  }

  const snapshot = await getDocs(q)
  const products = snapshot.docs.map(formatProduct)
  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null

  return { products, lastVisible }
}

export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(
    query(collection(db, 'products'), orderBy('date', 'desc'))
  )
  return snapshot.docs.map(formatProduct)
}

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  const q = query(
    collection(db, 'products'),
    where('slug', '==', slug),
    limit(1)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  return formatProduct(snapshot.docs[0])
}

export const getRelatedProducts = async (
  category: string,
  tags: string[],
  excludeSlug: string
): Promise<Product[]> => {
  const filters = [where('category', '==', category)]

  if (tags.length > 0) {
    filters.push(where('tags', 'array-contains-any', tags))
  }

  const q = query(
    collection(db, 'products'),
    ...filters,
    orderBy('date', 'desc'),
    limit(6)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(formatProduct).filter((p) => p.slug !== excludeSlug)
}

export const getProductsByCategory = async (
  categorySlug: string
): Promise<Product[]> => {
  const q = query(
    collection(db, 'products'),
    where('category', '==', categorySlug),
    orderBy('date', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(formatProduct)
}

export const getProductsByTag = async (tag: string): Promise<Product[]> => {
  const q = query(
    collection(db, 'products'),
    where('tags', 'array-contains', tag),
    orderBy('date', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(formatProduct)
}

export const getAllProductCategories = async (): Promise<string[]> => {
  const snapshot = await getDocs(collection(db, 'products'))
  const categories = new Set<string>()
  snapshot.docs.forEach((doc) => {
    const data = doc.data()
    if (data.category) {
      categories.add(data.category)
    }
  })
  return Array.from(categories)
}

export const getAllProductTags = async (): Promise<string[]> => {
  const snapshot = await getDocs(collection(db, 'products'))
  const tags = new Set<string>()
  snapshot.docs.forEach((doc) => {
    const data = doc.data()
    if (Array.isArray(data.tags)) {
      data.tags.forEach((tag: string) => tags.add(tag))
    }
  })
  return Array.from(tags)
}

export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
  if (!ids.length) return []

  const products = await Promise.all(
    ids.map(async (id) => {
      const snap = await getDoc(doc(db, 'products', id))
      return snap.exists() ? formatProduct(snap) : null
    })
  )

  return products.filter((p): p is Product => p !== null)
}
