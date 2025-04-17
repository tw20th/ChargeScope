/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config()

const { initializeApp } = require('firebase/app')
const {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} = require('firebase/firestore')
const { firebaseConfig } = require('../lib/firebase')
const { fetchRakutenItems, mapRakutenItemToProduct } = require('../lib/rakuten')

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

    await setDoc(ref, product)
    console.log(`✅ 登録完了: ${product.title}`)
  }

  console.log('🎉 登録処理が完了しました。')
}

const keyword = process.argv[2]
if (!keyword) {
  console.error('❌ キーワードを指定してください。例: npm run import "レオパ"')
  process.exit(1)
}

importRakutenProducts(keyword)
