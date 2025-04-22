// lib/tags.ts に追加 or 新しいファイルとしてもOK

import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

export type Tag = {
  id: string
  name: string
  type?: 'product' | 'blog' | 'both'
  isRecommended?: boolean
}

export const getHybridPopularTags = async (limit = 10): Promise<Tag[]> => {
  const productSnap = await getDocs(collection(db, 'products'))
  const tagCount: Record<string, number> = {}

  // タグ使用頻度をカウント
  productSnap.docs.forEach((doc) => {
    const tags: string[] = doc.data().tags ?? []
    tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  const tagsSnap = await getDocs(collection(db, 'tags'))
  const allTags: Tag[] = tagsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tag[]

  const recommendedTags = allTags.filter((t) => t.isRecommended)

  const popularFallbackTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => allTags.find((t) => t.name === name))
    .filter((t): t is Tag => !!t && !recommendedTags.find((r) => r.id === t.id))

  // 推奨 + 人気（重複なし）
  const finalTags = [
    ...recommendedTags,
    ...popularFallbackTags.slice(0, limit - recommendedTags.length),
  ]

  return finalTags
}
