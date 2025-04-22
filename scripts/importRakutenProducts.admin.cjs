const dotenv = require('dotenv')
dotenv.config()

const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('../serviceAccountKey.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = getFirestore()

const run = async () => {
  const keyword = process.argv[2]
  const isForceUpdate = process.argv.includes('--force')

  if (!keyword) {
    console.error(
      '❌ キーワードを指定してください（例: node importRakutenProducts.admin.cjs "レオパ"）'
    )
    process.exit(1)
  }

  console.log(`🔍 楽天APIで「${keyword}」を検索中...`)

  const rakuten = await import('../lib/rakuten.js')
  const { classifyProduct } = await import(
    '../lib/classifier/classifyProduct.js'
  )

  const items = await rakuten.fetchRakutenItems(keyword)

  // ✅ 商品分類 & 除外処理（null の除外も含む）
  const products = items
    .map((item) => {
      const product = rakuten.mapRakutenItemToProduct(item)
      const result = classifyProduct(item)
      if (!result) return null // ❌ 除外対象はスキップ
      return {
        ...product,
        ...result,
      }
    })
    .filter(Boolean) // null 除外

  // ✅ Firestore に登録
  for (const product of products) {
    const ref = db.collection('products').doc(product.id)
    const snapshot = await ref.get()

    if (snapshot.exists && !isForceUpdate) {
      console.log(`⏭ スキップ（既に登録済）: ${product.title}`)
      continue
    }

    await ref.set(product)
    console.log(
      `${snapshot.exists ? '🔁 上書き保存' : '✅ 新規登録'}: ${product.title}`
    )
  }

  console.log('🎉 全て完了しました。')
}

run()
