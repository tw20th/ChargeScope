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
  const keywords = [
    '爬虫類 水入れ',
    '爬虫類 ケージ',
    '爬虫類 ヒーター',
    '爬虫類 ライト',
    '爬虫類 エサ',
    '爬虫類 床材',
    'レオパ',
    'フトアゴ',
  ]

  const rakuten = await import('../lib/rakuten.js')

  for (const keyword of keywords) {
    console.log(`🔍 楽天APIで「${keyword}」を検索中...`)

    try {
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
          createdAt: snapshot.exists ? snapshot.data().createdAt : now,
          updatedAt: now,
        })

        console.log(
          `${snapshot.exists ? '🔁 上書き保存' : '✅ 新規登録'}: ${
            product.title
          }`
        )
      }
    } catch (error) {
      console.error(`❌ ${keyword} の取得に失敗:`, error)
    }
  }

  console.log('🎉 全てのキーワードで処理が完了しました。')
}

run()
