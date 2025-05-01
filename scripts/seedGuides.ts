import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import * as dotenv from 'dotenv'
import { v4 as uuid } from 'uuid'

dotenv.config()

const privateKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY_BASE64!,
  'base64'
).toString('utf-8')

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID!,
  private_key: privateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL!,
  token_uri: 'https://oauth2.googleapis.com/token',
} as ServiceAccount // ← これがポイント！

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

async function seedGuide() {
  const now = new Date()
  const dateStr = now.toISOString().split('T')[0]
  const timestamp = now.toISOString()

  const guide = {
    slug: `guide-${uuid().slice(0, 8)}`,
    title: '【初心者必見】飼いやすいおすすめ爬虫類5選',
    description: '初心者でも安心して飼える爬虫類5種類をご紹介します。',
    excerpt: '初めての爬虫類選び、悩んでいませんか？',
    content: '# 記事本文（Markdown）\n\nここに実際の記事内容が入ります。',
    date: dateStr,
    createdAt: timestamp,
    updatedAt: timestamp,
    readingTime: 4,
    author: 'ここゆず',
    reviewed: true,
    status: 'published',
    tags: ['初心者', '爬虫類'],
  }

  await db.collection('guides').doc(guide.slug).set(guide)
  console.log(`✅ 書き込み完了: ${guide.slug}`)
}

seedGuide()
