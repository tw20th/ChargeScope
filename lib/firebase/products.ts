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
