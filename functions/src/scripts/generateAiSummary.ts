// functions/src/scripts/generateAiSummary.ts
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { OpenAI } from "openai"; // ✅ v4以降はこちら
import * as dotenv from "dotenv";

dotenv.config();

// 🔐 Firebase 初期化
const decodedKey = Buffer.from(process.env.FB_PRIVATE_KEY_BASE64!, "base64").toString("utf8");
const serviceAccount = JSON.parse(decodedKey);

const app = initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore(app);

// ✅ OpenAI v4 構文（OpenAI クラス使用）
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateAiSummaries() {
  const snapshot = await db.collection("monitoredItems").get();
  const batch = db.batch();
  let count = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const productName = data.productName ?? data.itemName;
    const highlights = (data.featureHighlights ?? []).join("、");

    if (!productName || !highlights) {
      console.log(`スキップ: ${productName} / ${highlights}`);
      continue;
    }

    const prompt = `
あなたは優秀なマーケティングライターです。
以下の特徴を持つ「${productName}」という商品について、ユーザーの悩みを解決する視点で、わかりやすく簡潔に要約してください（全角100文字以内）。

特徴: ${highlights}
`;

    try {
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      });

      const summary = res.choices[0]?.message?.content?.trim();
      if (summary) {
        batch.update(doc.ref, { aiSummary: summary });
        count++;
      }
    } catch (err) {
      console.error(`❌ ${productName} の要約に失敗`, err);
    }
  }

  await batch.commit();
  console.log(`✅ ${count} 件の aiSummary を保存しました`);
}

// CLI 実行用
if (require.main === module) {
  generateAiSummaries().catch(console.error);
}
