import admin from 'firebase-admin'
import serviceAccountRaw from './serviceAccountKey.json' assert { type: 'json' }
import data from './affiliateLinks.json' assert { type: 'json' }

const serviceAccount = serviceAccountRaw as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function updateAffiliateLinks() {
  for (const item of data) {
    const qSnap = await db
      .collection('products')
      .where('slug', '==', item.slug)
      .limit(1)
      .get()

    if (qSnap.empty) {
      console.log(`商品が見つかりません: ${item.slug}`)
      continue
    }

    const doc = qSnap.docs[0]
    await doc.ref.update({
      rakutenLink: item.rakutenLink || null,
      amazonLink: item.amazonLink || null,
      yahooLink: item.yahooLink || null,
    })

    console.log(`更新完了: ${item.slug}`)
  }

  console.log('✅ アフィリエイトリンクの一括更新完了！')
}

updateAffiliateLinks().catch(console.error)
