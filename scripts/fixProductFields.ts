// scripts/fixProductFields.ts
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { ServiceAccount } from 'firebase-admin' // ✅ 追加
import serviceAccountJson from '../serviceAccountKey.json' assert { type: 'json' } // ✅ JSON import

const serviceAccount = serviceAccountJson as ServiceAccount // ✅ 型アサーション

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

const run = async () => {
  const snapshot = await db.collection('products').get()

  console.log(`🛠 商品数: ${snapshot.size} 件を補完・更新します...`)

  for (const doc of snapshot.docs) {
    const data = doc.data()

    const now = new Date()

    const updatedData = {
      ...data,
      amazonLink:
        data.amazonLink ||
        `https://www.amazon.co.jp/s?k=${encodeURIComponent(data.title || '')}`,
      yahooLink: data.yahooLink ?? '',
      rakutenLink: data.rakutenLink
        ? data.rakutenLink.includes('scid=')
          ? data.rakutenLink
          : `${data.rakutenLink}${
              data.rakutenLink.includes('?') ? '&' : '?'
            }scid=444dd366.3063ed7d.444dd367.61b93d9b`
        : '',
      clickCount: typeof data.clickCount === 'number' ? data.clickCount : 0,
      viewCount: typeof data.viewCount === 'number' ? data.viewCount : 0,
      updatedAt: now,
    }

    await db.collection('products').doc(doc.id).update(updatedData)

    console.log(`✅ 補完・更新完了: ${data.title || doc.id}`)
  }

  console.log('🎉 全商品補完完了！')
}

run().catch((err) => {
  console.error('❌ エラー発生:', err)
})
