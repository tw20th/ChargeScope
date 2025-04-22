import 'dotenv/config'

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore'
// import 文（修正済み）
import { firebaseConfig } from '../lib/firebase/firebase.js'
import { fetchRakutenItems, mapRakutenItemToProduct } from '../lib/rakuten'

// Firebase初期化
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const importRakutenProducts = async (keyword: string) => {
  console.log(`🔍 楽天APIで「${keyword}」を検索中...`)

  const items = await fetchRakutenItems(keyword)
  const products = items.map(mapRakutenItemToProduct)

  for (const product of products) {
    const ref = doc(collection(db, 'products'), product.id)
    const snapshot = await getDoc(ref)

    if (snapshot.exists()) {
      console.log(`⚠️ 既に登録済み: ${product.title}`)
      continue
    }

    await setDoc(ref, {
      ...product,
      viewCount: 0,
      clickCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  console.log('🎉 登録処理が完了しました。')
}

// CLI引数でキーワードを取得
const keywordArg = process.argv[2]
if (!keywordArg) {
  console.error('❌ キーワードを指定してください。例: npm run import "レオパ"')
  process.exit(1)
}

importRakutenProducts(keywordArg)
