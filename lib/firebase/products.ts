// lib/firebase/products.ts

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  Query,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'
import { Product } from '../products'
import { doc, getDoc } from 'firebase/firestore'

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
  limitCount: number,
  cursor: QueryDocumentSnapshot<DocumentData> | null,
  selectedCategory: string,
  selectedTag?: string
) => {
  // ✅ クエリ条件をまとめて配列に追加
  const conditions = []

  if (selectedCategory !== 'all') {
    conditions.push(where('displayCategory', '==', selectedCategory))
  }

  if (selectedTag) {
    conditions.push(where('tags', 'array-contains', selectedTag))
  }

  // ✅ 並び順と取得件数
  conditions.push(orderBy('date', 'desc'))
  conditions.push(limit(limitCount))

  if (cursor) {
    conditions.push(startAfter(cursor))
  }

  // ✅ query関数に条件をまとめて渡す
  const q = query(collection(db, 'products'), ...conditions)

  const snapshot = await getDocs(q)

  return {
    products: snapshot.docs.map((doc) => doc.data() as Product),
    lastVisible: snapshot.docs[snapshot.docs.length - 1] ?? null,
  }
}
// 🔽 商品IDの配列から、該当する商品データを取得
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
