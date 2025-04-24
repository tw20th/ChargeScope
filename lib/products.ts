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

export type Product = {
  id: string
  slug: string
  title: string
  description: string
  price: number
  image: string
  link: string
  category: string
  displayCategory: string // ✅ ← これを追加！
  tags?: string[]
  date: string
  name: string // ← これを追加！
}

// 🔽 商品一覧（ページネーション対応）
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
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]

  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null

  return { products, lastVisible }
}

// 🔽 カテゴリごとの商品取得
export const getProductsByCategory = async (
  categorySlug: string
): Promise<Product[]> => {
  const q = query(
    collection(db, 'products'),
    where('category', '==', categorySlug),
    orderBy('date', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
}

// 🔽 タグによる商品取得
export const getProductsByTag = async (tag: string): Promise<Product[]> => {
  const q = query(
    collection(db, 'products'),
    where('tags', 'array-contains', tag),
    orderBy('date', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
}

// 🔽 全商品取得（オプション：generateStaticParamsなどに）
export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(
    query(collection(db, 'products'), orderBy('date', 'desc'))
  )

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
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
  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...(doc.data() as Omit<Product, 'id'>),
  }
}

export const getRelatedProducts = async (
  category: string,
  tags: string[],
  excludeSlug: string
): Promise<Product[]> => {
  const q = query(
    collection(db, 'products'),
    where('category', '==', category),
    where('tags', 'array-contains-any', tags),
    orderBy('date', 'desc'),
    limit(6)
  )

  const snapshot = await getDocs(q)
  const all = snapshot.docs.map((doc) => doc.data() as Product)

  // 表示中の商品は除外
  return all.filter((p) => p.slug !== excludeSlug)
}
