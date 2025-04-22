import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import serviceAccount from './serviceAccountKey.json' assert { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

const db = admin.firestore()
const outputPath = path.join(__dirname, 'amazonSearchHelper.csv')

async function exportTitlesForAmazon() {
  const snapshot = await db.collection('products').get()
  const rows = [['slug', 'title']]

  snapshot.forEach((doc) => {
    const data = doc.data()
    rows.push([data.slug ?? data.id, data.title])
  })

  fs.writeFileSync(outputPath, rows.map((r) => r.join(',')).join('\n'))
  console.log('✅ export 完了 →', outputPath)
}

exportTitlesForAmazon().catch(console.error)
