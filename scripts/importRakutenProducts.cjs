/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config()

const admin = require('firebase-admin')
const {
  fetchRakutenItems,
  mapRakutenItemToProduct,
} = require('../dist-cli/lib/rakuten.cjs')
const serviceAccount = require('../serviceAccountKey.json')

// Firebase Admin 初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const importRakutenProducts = async (keyword) => {
  console.log(`🔍 楽天APIで「${keyword}」を検索中...`)

  const items = await fetchRakutenItems(keyword)
  const products = items.map(mapRakutenItemToProduct)

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
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    })

    console.log(`✅ 登録完了: ${product.title}`)
  }

  console.log('🎉 登録処理が完了しました。')
}

// CLI引数からキーワード取得
const keyword = process.argv[2]
if (!keyword) {
  console.error(
    '❌ キーワードを指定してください。例: node importRakutenProductsAdmin.cjs "レオパ"'
  )
  process.exit(1)
}

importRakutenProducts(keyword)
