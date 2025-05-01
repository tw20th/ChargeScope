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
  const items = await rakuten.fetchRakutenItems(keyword)
  const products = items
    .map((item) => rakuten.mapRakutenItemToProduct(item))
    .filter(Boolean)

  for (const product of products) {
    const ref = db.collection('products').doc(product.id)
    const snapshot = await ref.get()

    const now = admin.firestore.Timestamp.now()

    await ref.set({
      ...product,
      isPopular: false, // ✅ デフォルトfalse
      popularityRank: null, // ✅ デフォルトnull
      createdAt: snapshot.exists ? snapshot.data().createdAt : now,
      updatedAt: now,
    })

    console.log(
      `${snapshot.exists ? '🔁 上書き保存' : '✅ 新規登録'}: ${product.title}`
    )
  }

  console.log('🎉 全て完了しました。')
}

run()
