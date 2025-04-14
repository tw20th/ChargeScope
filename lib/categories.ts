// lib/categories.ts

import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

export type Category = {
  id: string // ドキュメントID（= slug）
  name: string // 日本語ラベル
  type: string // "product" | "post" | "both"
}

// 🔽 Firestore からカテゴリ一覧を取得
export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(collection(db, 'categories'))
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[]
}
