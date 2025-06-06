import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { OpenAI } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

// Firebase 初期化
const decodedKey = Buffer.from(process.env.FB_PRIVATE_KEY_BASE64!, "base64").toString("utf8");
const serviceAccount = JSON.parse(decodedKey);
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

// OpenAI 初期化
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeArticles() {
  const snapshot = await db.collection("blogs").get();
  let successCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const slug = doc.id;
    const content = data.content;

    if (!content || typeof content !== "string") {
      console.warn(`⚠️ スキップ: ${slug} → content が存在しないか文字列ではありません`);
      continue;
    }

    const prompt = `
以下はモバイルバッテリーに関するブログ記事です。構成を確認し、次の3点を出力してください：
1. スコア（100点満点で、内容の構成・読者理解のしやすさ・SEO観点で評価）
2. 改善用の新しいタイトル案
3. 改善用の新しい見出し構成案（3つ程度）

# 記事本文
${content}
`;

    try {
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      });

      const result = res.choices[0]?.message?.content?.trim();
      if (!result) {
        console.warn(`⚠️ スキップ: ${slug} → OpenAI応答が空です`);
        continue;
      }

      console.log(`🔎 OpenAI応答:\n${result}`);

      const titleMatch = result.match(/タイトル案[:：]\s*(.+)/);
      const scoreMatch = result.match(/(\d{2,3})点/);

      const suggestedTitle = titleMatch?.[1]?.trim() ?? null;
      const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

      // outline行を改めて抽出
      const suggestedOutline = result
        .split("\n")
        .filter(line => /^[-・]/.test(line.trim()))
        .map(line =>
          line
            .trim()
            .replace(/^[-・\d.\s]+/, "")
            .trim()
        )
        .filter(line => line.length > 4);

      if (!score || !suggestedTitle || suggestedOutline.length === 0) {
        console.warn(
          `⚠️ パース失敗: ${slug} → score=${score}, title=${suggestedTitle}, outline=${suggestedOutline.length}`
        );
        continue;
      }

      await db
        .collection("blogs")
        .doc(slug)
        .update({
          analysisHistory: FieldValue.arrayUnion({
            score,
            suggestedTitle,
            suggestedOutline,
            createdAt: new Date()
          })
        });

      console.log(`✅ ${slug} 分析保存`);
      successCount++;
    } catch (err) {
      console.error(`❌ OpenAIエラー: ${slug}`, err);
    }
  }

  console.log(`🎉 分析完了：${successCount} 件保存`);
}

// CLI 実行用
if (require.main === module) {
  analyzeArticles().catch(console.error);
}
