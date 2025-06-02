// functions/src/scripts/generatePersonaOnce.ts

import { generatePersona } from "../utils/generatePersona";
import { db } from "../firebaseAdmin";

const category = "爬虫類 ケージ"; // ← 対象カテゴリ名を指定

async function main() {
  try {
    console.log(`🚀 カテゴリ「${category}」のペルソナを生成中...`);

    const personaText = await generatePersona(category);

    console.log("✅ 生成されたペルソナ:");
    console.log(personaText);

    const ref = await db.collection("personas").add({
      category,
      content: personaText,
      createdAt: new Date().toISOString()
    });

    console.log(`✅ Firestoreに保存しました (ID: ${ref.id})`);
  } catch (err) {
    console.error("❌ ペルソナ生成エラー:", err);
  }
}

main();
