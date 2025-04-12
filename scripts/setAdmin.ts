import * as admin from 'firebase-admin'

admin.initializeApp()

const uid = '管理者ユーザーのUIDをここに' // ← Auth の UID を確認してセット

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ 管理者権限を付与しました: ${uid}`)
  })
  .catch((error) => {
    console.error('❌ エラー:', error)
  })
