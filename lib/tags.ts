// lib/tags.ts

import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export type Tag = {
  id: string
  name: string
  type?: 'product' | 'blog' | 'both'
}

export const getPopularTagsFromProducts = async (
  limit = 10
): Promise<Tag[]> => {
  const productSnap = await getDocs(collection(db, 'products'))
  const tagCount: Record<string, number> = {}

  // 🔢 タグ使用頻度をカウント
  productSnap.docs.forEach((doc) => {
    const data = doc.data()
    const tags: string[] = data.tags ?? []
    tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  // 🔄 Firestoreの tags コレクション（マスタ）
  const tagsSnap = await getDocs(collection(db, 'tags'))
  const allTags: Record<string, Tag> = {}
  tagsSnap.docs.forEach((doc) => {
    const data = doc.data() as Omit<Tag, 'id'>
    allTags[data.name] = { ...data, id: doc.id }
  })

  // 🏆 使用頻度の高いタグを name 順で表示（なければ fallback）
  const sortedTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => {
      return (
        allTags[name] ?? {
          id: name, // ← fallback: Firestoreにない場合
          name: name,
          type: 'product',
        }
      )
    })

  return sortedTags
}
