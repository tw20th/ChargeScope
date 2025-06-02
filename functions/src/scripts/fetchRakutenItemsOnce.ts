// functions/src/scripts/fetchRakutenItemsOnce.ts

import { fetchRakutenItems } from "../utils/fetchRakutenItems";
import * as dotenv from "dotenv";
dotenv.config();

// 🔍 任意の検索キーワードをここで指定（例：爬虫類関連）
const keyword = "爬虫類 ケージ"; // ← ここを変更して実行ごとに商品を取得

async function main() {
  try {
    console.log(`🚀 楽天APIから「${keyword}」で商品を取得中...`);
    await fetchRakutenItems(keyword);
    console.log("✅ 取得完了");
  } catch (err) {
    console.error("❌ エラー:", err);
  }
}

main();
