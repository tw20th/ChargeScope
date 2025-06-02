// functions/scripts/migratePostsToBlogs.ts
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { ServiceAccount } from "firebase-admin";
import * as dotenv from "dotenv";
import serviceAccountJson from "../../service-account-key.json";

dotenv.config();

const serviceAccount = serviceAccountJson as ServiceAccount;

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migratePostsToBlogs() {
  const snapshot = await db.collection("posts").get();
  console.log(`🔍 posts コレクションのドキュメント数: ${snapshot.size}`);

  for (const doc of snapshot.docs) {
    const data = doc.data();

    // 必要に応じてフィールドを変換・整形
    const newDoc = {
      title: data.title || "タイトルなし",
      content: data.content || "",
      createdAt: data.createdAt || new Date().toISOString(),
      category: data.category || "未分類"
      // 例: 他にも必要なら追加
    };

    await db.collection("blogs").doc(doc.id).set(newDoc);
    console.log(`✅ 移行完了: ${doc.id}`);
  }

  console.log("🎉 全ての移行が完了しました！");
}

migratePostsToBlogs().catch(err => {
  console.error("❌ エラー:", err);
});
