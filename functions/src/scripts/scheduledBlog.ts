// functions/src/scripts/scheduledBlog.ts
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { OpenAI } from "openai";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
import slugify from "slugify";

dotenv.config();

// Firebase 初期化
const app = initializeApp({
  credential: cert(
    JSON.parse(Buffer.from(process.env.FB_PRIVATE_KEY_BASE64!, "base64").toString("utf8"))
  )
});
const db = getFirestore(app);

// OpenAI 初期化
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Unsplash 設定
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!;

export async function generateBlogFromItems() {
  const snapshot = await db.collection("monitoredItems").get();
  const blogsRef = db.collection("blogs");

  let count = 0;

  for (const doc of snapshot.docs) {
    const item = doc.data();
    const productName = item.productName ?? item.itemName;
    const aiSummary = item.aiSummary;
    const featureHighlights = (item.featureHighlights ?? []).join("、");
    const tags = item.tags ?? [];

    if (!productName || !aiSummary || !featureHighlights) {
      console.log(`スキップ: ${productName}`);
      continue;
    }

    const slug = slugify(productName, { lower: true, strict: true });

    // 画像取得
    const imageRes = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        productName
      )}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const imageJson = await imageRes.json();
    const imageUrl = imageJson?.urls?.regular ?? "";

    // ブログ生成プロンプト
    const prompt = `
あなたはSEOライターです。以下の特徴を持つ商品「${productName}」について、ユーザーの悩みや使用シーンに寄り添ったSEO向けブログ記事を800文字で書いてください。

特徴: ${featureHighlights}
要約: ${aiSummary}
`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      });

      const content = completion.choices[0].message?.content?.trim();
      if (!content) continue;

      await blogsRef.doc(slug).set({
        slug,
        title: `${productName} の特徴とは？`,
        content,
        image: imageUrl,
        tags,
        relatedItemId: item.itemCode,
        createdAt: Timestamp.now()
      });

      console.log(`✅ ${productName} → ブログ生成完了`);
      count++;
    } catch (e) {
      console.error(`❌ ${productName} の生成失敗`, e);
    }
  }

  console.log(`✅ 合計 ${count} 件のブログ記事を保存しました`);
}

if (require.main === module) {
  generateBlogFromItems().catch(console.error);
}
