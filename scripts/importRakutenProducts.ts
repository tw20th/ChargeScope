// scripts/importRakutenProducts.ts

import { Timestamp, Firestore } from 'firebase-admin/firestore'
import {
  fetchRakutenItems,
  mapRakutenItemToProduct,
} from '../dist-cli/lib/rakuten.cjs'

export const importRakutenProducts = async (db: Firestore, keyword: string) => {
  if (!keyword) {
    console.error('❌ キーワードを指定してください')
    return
  }

  console.log(`🔍 楽天APIで「${keyword}」を検索中...`)
  const items = await fetchRakutenItems(keyword)
  const products = items.map(mapRakutenItemToProduct).filter(Boolean)

  const now = Timestamp.now()

  for (const product of products) {
    const ref = db.collection('products').doc(product.id)
    const snapshot = await ref.get()

    await ref.set({
      ...product,
      createdAt: snapshot.exists ? snapshot.data()?.createdAt : now,
      updatedAt: now,
    })

    console.log(
      `${snapshot.exists ? '🔁 上書き保存' : '✅ 新規登録'}: ${product.title}`
    )
  }

  console.log('🎉 全て完了しました。')
}
