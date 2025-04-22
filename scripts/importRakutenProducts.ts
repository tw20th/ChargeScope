// scripts/importRakutenProducts.ts
import { Timestamp, Firestore } from 'firebase-admin/firestore'
import {
  fetchRakutenItems,
  mapRakutenItemToProduct,
} from '../dist-cli/lib/rakuten.cjs'

export const importRakutenProducts = async (db: Firestore, keyword: string) => {
  console.log(`🔍 楽天APIで「${keyword}」を検索中...`)
  const items = await fetchRakutenItems(keyword)
  const products = items.map(mapRakutenItemToProduct)

  const now = Timestamp.now()

  for (const product of products) {
    const ref = db.collection('products').doc(product.id)
    const snapshot = await ref.get()
    if (snapshot.exists) {
      console.log(`⚠️ 既に登録済み: ${product.title}`)
      continue
    }

    await ref.set({
      ...product,
      viewCount: 0,
      clickCount: 0,
      createdAt: now,
      updatedAt: now,
    })
    console.log(`✅ 登録完了: ${product.title}`)
  }

  console.log('🎉 登録処理が完了しました。')
}
