import { db } from "../src/firebaseAdmin";
import { isItemEligible } from "../src/utils/applyItemFilter";
import { updatePriceHistory } from "../src/utils/updatePriceHistory";
import { extractTagsFromFeatures } from "../src/utils/extractTags";
import { fetchCoverImage } from "../src/utils/fetchImage";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OpenAI APIキーが設定されていません");

const openai = new OpenAI({ apiKey });

type RakutenItem = {
  id: string;
  itemName: string;
  price: number;
  productKeyword?: string;
  imageUrl?: string;
};

// ✅ カテゴリー推定関数（featureHighlightsから分類）
function inferCategory(featureHighlights: string[]): string {
  const text = featureHighlights.join(" ").toLowerCase();

  if (text.includes("ケージ")) return "ケージ";
  if (text.includes("ライト") || text.includes("照明")) return "ライト";
  if (text.includes("ヒーター") || text.includes("保温")) return "ヒーター";
  if (text.includes("床材") || text.includes("シート")) return "床材";
  if (text.includes("温度計") || text.includes("湿度")) return "温湿度計";

  return "その他";
}

// ✅ 商品名から特徴を抽出する処理（爬虫類用品向け）
async function extractFeatureHighlightsFromName(name: string): Promise<string[]> {
  const prompt = `
以下の「爬虫類用品」の商品名から、ユーザーが注目しそうな特徴を5つ箇条書きで抽出してください。
- 出力形式: ["特徴1", "特徴2", "特徴3", "特徴4", "特徴5"]
- 短く簡潔に
- 抽象的すぎず具体的な特徴を
- 英語ではなく日本語で

商品名: ${name}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5
  });

  const content = res.choices[0].message.content || "";
  const match = content.match(/\[.*?\]/s);
  if (!match) return [];

  try {
    const list = JSON.parse(match[0]);
    return Array.isArray(list) ? list.map(str => String(str)) : [];
  } catch {
    return [];
  }
}

// ✅ メイン処理
export async function scheduledSelectMonitored() {
  console.log("🟢 selectMonitored 処理開始");

  const snapshot = await db.collection("rakutenItems").get();
  const now = new Date();

  const items: RakutenItem[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      itemName: data.itemName,
      price: Number(data.price),
      productKeyword: data.productKeyword,
      imageUrl: data.imageUrl
    };
  });

  console.log(`📦 rakutenItems 取得件数: ${items.length}`);
  const selected = items.filter(isItemEligible);
  console.log(`✅ フィルター通過件数: ${selected.length}`);

  for (const item of selected) {
    try {
      console.log(`📌 処理中: ${item.itemName}`);

      const featureHighlights = await extractFeatureHighlightsFromName(item.itemName);

      let tags: string[] = [];
      try {
        const extracted = await extractTagsFromFeatures(featureHighlights);
        tags = Array.isArray(extracted) && extracted.length > 0 ? extracted : featureHighlights;
      } catch (err) {
        console.warn("⚠️ タグ抽出に失敗、特徴をタグとして代用:", err);
        tags = featureHighlights;
      }

      const imageKeyword = item.productKeyword || "爬虫類 ケージ";
      const category = inferCategory(featureHighlights);

      const rakutenDoc = await db.collection("rakutenItems").doc(item.id).get();
      let imageUrl = rakutenDoc.data()?.imageUrl || "";

      if (!imageUrl) {
        console.log("📷 画像なし → Unsplashから取得:", imageKeyword);
        imageUrl = await fetchCoverImage(imageKeyword);
      }

      const monitoredRef = await db.collection("monitoredItems").add({
        productName: item.itemName,
        price: item.price,
        features: "爬虫類飼育におすすめのアイテム",
        imageKeyword,
        fromRakutenItemId: item.id,
        imageUrl,
        score: 0,
        tags, // ← 修正ポイント
        featureHighlights,
        category,
        createdAt: now.toISOString()
      });

      console.log(`✅ 登録成功: ${item.itemName}`);
      await updatePriceHistory(monitoredRef.id, item.price);
    } catch (err) {
      console.error(`❌ エラー: ${item.itemName}`, err);
    }
  }

  console.log(`🏁 完了: ${selected.length} 件を monitoredItems に登録`);
}
