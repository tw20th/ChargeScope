// scripts/exportSlugs.ts
import admin from 'firebase-admin'
import serviceAccountRaw from './serviceAccountKey.json' assert { type: 'json' }

const serviceAccount = serviceAccountRaw as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function exportSlugs() {
  const snapshot = await db.collection('products').get()
  const slugs = snapshot.docs.map((doc) => doc.id)

  console.log('✅ 登録されている slug 一覧:')
  console.log(slugs.join('\n'))
}

exportSlugs()
