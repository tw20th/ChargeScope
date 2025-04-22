// scripts/addMetaFieldsToProducts.ts
import admin from 'firebase-admin'
import serviceAccountRaw from './serviceAccountKey.json' assert { type: 'json' }

const serviceAccount = serviceAccountRaw as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function main() {
  const snapshot = await db.collection('products').get()
  console.log(`🛠 ${snapshot.size} 件のドキュメントを処理します...`)

  const now = admin.firestore.Timestamp.now()

  for (const doc of snapshot.docs) {
    const updates = {
      viewCount: doc.data().viewCount ?? 0,
      clickCount: doc.data().clickCount ?? 0,
      createdAt: doc.data().createdAt ?? now,
      updatedAt: now,
    }

    await doc.ref.update(updates)
    console.log(`✅ 更新完了: ${doc.id}`)
  }

  console.log('🎉 全てのフィールドを追加しました！')
}

main().catch(console.error)
