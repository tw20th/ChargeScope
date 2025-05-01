// scripts/updateAllProducts.ts

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../serviceAccountKey.json'

// Firebase Admin SDK初期化
initializeApp({
  credential: cert(serviceAccount as any),
})

const db = getFirestore()

const run = async () => {
  try {
    const productsRef = db.collection('products')
    const snapshot = await productsRef.get()

    if (snapshot.empty) {
      console.log('⚠️ 商品データがありません！')
      return
    }

    console.log(`🔍 ${snapshot.size} 件の商品を一括更新します...`)

    let batch = db.batch()
    let operationCount = 0

    for (const doc of snapshot.docs) {
      const ref = productsRef.doc(doc.id)

      batch.update(ref, {
        isPopular: false, // ⬆️ デフォルトfalse設定
        popularityRank: null, // ⬆️ デフォルトnull設定
      })

      operationCount++

      // Firestoreのバッチ上限500件でコミット！
      if (operationCount === 500) {
        await batch.commit()
        console.log('✅ 500件をコミット！')
        batch = db.batch()
        operationCount = 0
      }
    }

    if (operationCount > 0) {
      await batch.commit()
      console.log(`✅ 最後の${operationCount}件をコミット！`)
    }

    console.log('🎉 全商品の一括更新が終了しました！')
  } catch (error) {
    console.error('⚠️ 更新中にエラー発生！', error)
  }
}

run()
