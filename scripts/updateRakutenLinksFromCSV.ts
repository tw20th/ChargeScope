// scripts/updateRakutenLinksFromCSV.ts
import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { fileURLToPath } from 'url'

import serviceAccountRaw from './serviceAccountKey.json' assert { type: 'json' }

const serviceAccount = serviceAccountRaw as admin.ServiceAccount

// ✅ import.meta.url を使って ESM でも __dirname 相当を取得
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, 'rakutenLinks.csv')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function updateRakutenLinksFromCSV() {
  const records: { slug: string; rakutenLink: string }[] = []

  console.log('📄 CSV読み込み中...')

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      records.push({
        slug: data.slug.trim(),
        rakutenLink: data.rakutenLink.trim(),
      })
    })
    .on('end', async () => {
      console.log(`📦 ${records.length} 件のデータを処理します...`)
      for (const item of records) {
        const qSnap = await db
          .collection('products')
          .where('slug', '==', item.slug)
          .limit(1)
          .get()

        if (qSnap.empty) {
          console.log(`❌ 商品が見つかりません: ${item.slug}`)
          continue
        }

        const doc = qSnap.docs[0]
        await doc.ref.update({
          rakutenLink: item.rakutenLink,
        })

        console.log(`✅ 更新完了: ${item.slug}`)
      }

      console.log('🎉 全ての楽天リンクを更新しました！')
    })
}

updateRakutenLinksFromCSV().catch(console.error)
