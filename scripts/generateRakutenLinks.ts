// scripts/generateRakutenLinks.ts
import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { fileURLToPath } from 'url'

import serviceAccountRaw from './serviceAccountKey.json' assert { type: 'json' }

const serviceAccount = serviceAccountRaw as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

// 🔑 あなたのアフィリエイトIDをここに！
const SCID = '444dd366.3063ed7d.444dd367.61b93d9b' // ← ⭐️ ← 必ず書き換えてね！

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, 'rakutenBaseUrls.csv')

async function generateRakutenLinks() {
  const records: { slug: string; rakutenBaseUrl: string }[] = []

  console.log('📄 CSV読み込み中...')

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // 空行や不正データをスキップ（超重要！）
      if (!data?.slug || !data?.rakutenBaseUrl) return

      records.push({
        slug: data.slug.trim(),
        rakutenBaseUrl: data.rakutenBaseUrl.trim(),
      })
    })
    .on('end', async () => {
      console.log(`🔧 ${records.length} 件の楽天リンクを生成・更新します`)

      for (const item of records) {
        const rakutenLink = `${item.rakutenBaseUrl}?scid=${SCID}`

        const docRef = db.collection('products').doc(item.slug)
        const docSnap = await docRef.get()

        if (!docSnap.exists) {
          console.log(`❌ 商品が見つかりません: ${item.slug}`)
          continue
        }

        await docRef.update({ rakutenLink })
        console.log(`✅ 更新完了: ${item.slug}`)
      }

      console.log('🎉 自動楽天リンク更新 完了！')
    })
}

generateRakutenLinks().catch(console.error)
