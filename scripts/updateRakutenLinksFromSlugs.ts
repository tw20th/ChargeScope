// scripts/updateRakutenLinksFromSlugs.ts
import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

import serviceAccountRaw from './serviceAccountKey.json' assert { type: 'json' }

const serviceAccount = serviceAccountRaw as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

// 🔑 ここにあなたの楽天アフィリエイトIDを入力してください（必須！）
const SCID = '444dd366.3063ed7d.444dd367.61b93d9b'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, 'slugs.txt') // 🔹 slug一覧を入れるテキストファイル

async function updateRakutenLinksFromSlugs() {
  const slugs: string[] = []

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    const slug = line.trim()
    if (slug) {
      slugs.push(slug)
    }
  }

  console.log(`📦 ${slugs.length} 件の slug を処理します...`)

  for (const slug of slugs) {
    const parts = slug.split(':')
    if (parts.length !== 2) {
      console.warn(`❌ 不正なslug形式: ${slug}`)
      continue
    }

    const shopId = parts[0]
    const itemId = parts[1]

    const rakutenLink = `https://item.rakuten.co.jp/${shopId}/${itemId}/?scid=${SCID}`

    // 🔍 Firestoreの slug フィールドと一致する商品を検索
    const firestoreSlug = slug.replace(':', '-')

    const qSnap = await db
      .collection('products')
      .where('slug', '==', firestoreSlug)
      .limit(1)
      .get()

    if (qSnap.empty) {
      console.warn(`❌ Firestoreに商品が見つかりません: ${slug}`)
      continue
    }

    const doc = qSnap.docs[0]
    await doc.ref.update({ rakutenLink })

    console.log(`✅ 更新完了: ${slug}`)
  }

  console.log('🎉 全ての楽天リンクを更新しました！')
}

updateRakutenLinksFromSlugs().catch(console.error)
