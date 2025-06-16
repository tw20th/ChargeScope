// functions/src/scripts/filterAndSaveItems.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "path";

dotenv.config();

// 🔐 base64形式のサービスアカウントキーを復元
const decodedKey = Buffer.from(process.env.FB_PRIVATE_KEY_BASE64!, "base64").toString("utf8");
const serviceAccount = JSON.parse(decodedKey);

// ✅ 既存アプリがある場合は再初期化しない
const app =
  getApps().length === 0 ? initializeApp({ credential: cert(serviceAccount) }) : getApps()[0];
const db = getFirestore(app);

// ルールの型定義
type RuleCondition = {
  field: string;
  operator: string;
  value: number | boolean;
};

type FilterRule = {
  label: string;
  conditions: RuleCondition[];
  tags: string[];
};

type RakutenItem = {
  itemCode: string;
  itemName: string;
  price: number;
  capacity?: number;
  weight?: number;
  outputPower?: number;
  outputPorts?: number;
  hasTypeC?: boolean;
  affiliateUrl: string;
  imageUrl: string;
  shopName: string;
  description: string;
  createdAt: FirebaseFirestore.Timestamp;
};

// 🔍 条件マッチ判定
function evaluateCondition(item: Record<string, unknown>, condition: RuleCondition): boolean {
  const value = item[condition.field];
  if (typeof value !== typeof condition.value) return false;

  const op = condition.operator;
  const condValue = condition.value;

  if (typeof value === "number" && typeof condValue === "number") {
    if (op === ">=") return value >= condValue;
    if (op === "<=") return value <= condValue;
    if (op === ">") return value > condValue;
    if (op === "<") return value < condValue;
    if (op === "==") return value === condValue;
  }

  if (typeof value === "boolean" && typeof condValue === "boolean") {
    if (op === "==") return value === condValue;
  }

  return false;
}

// 🧠 タグ・特徴抽出
function applyFilterRules(
  item: RakutenItem,
  rules: FilterRule[]
): { tags: string[]; highlights: string[] } {
  const tags: string[] = [];
  const highlights: string[] = [];

  for (const rule of rules) {
    const filledItem: Record<string, unknown> = {
      weight: item.weight ?? 0,
      capacity: item.capacity ?? 0,
      outputPower: item.outputPower ?? 0,
      outputPorts: item.outputPorts ?? 0,
      hasTypeC: item.hasTypeC ?? false,
      ...item
    };

    const matched = rule.conditions.every(cond => evaluateCondition(filledItem, cond));
    if (matched) {
      tags.push(...rule.tags);
      highlights.push(rule.label);
    }
  }

  return { tags: Array.from(new Set(tags)), highlights };
}

// 🔁 フィルター＆保存メイン処理
export async function filterAndSaveItems(): Promise<void> {
  const rulesPath = path.join(__dirname, "../config/itemFilterRules.json");
  const rules: FilterRule[] = JSON.parse(fs.readFileSync(rulesPath, "utf8"));

  const snapshot = await db.collection("rakutenItems").get();
  const batch = db.batch();

  for (const doc of snapshot.docs) {
    const item = doc.data() as RakutenItem;

    const { tags, highlights } = applyFilterRules(item, rules);

    const monitoredItem = {
      ...item,
      tags,
      featureHighlights: highlights,
      priceHistory: [{ price: item.price, timestamp: item.createdAt }]
    };

    const targetRef = db.collection("monitoredItems").doc(item.itemCode);
    batch.set(targetRef, monitoredItem, { merge: true });
  }

  await batch.commit();
  console.log("✅ monitoredItems に保存完了しました。");
}

// 📦 CLI 実行用
if (require.main === module) {
  filterAndSaveItems().catch(err => {
    console.error("❌ エラーが発生しました:", err);
  });
}
