// functions/src/utils/getMonitoredItem.ts
import { db } from "../firebaseAdmin";

export type MonitoredItem = {
  productName: string;
  price: string;
  features: string;
  imageKeyword: string;
  fromRakutenItemId?: string;
  score?: number;
  tag?: string[]; // ← 追加
  featureHighlights?: string[]; // ← 追加
  id: string;
};

export async function getMonitoredItemRandom(): Promise<MonitoredItem> {
  const snapshot = await db.collection("monitoredItems").get();

  if (snapshot.empty) throw new Error("monitoredItems が空です");

  const docs = snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      productName: data.productName,
      price: data.price,
      features: data.features,
      imageKeyword: data.imageKeyword,
      fromRakutenItemId: data.fromRakutenItemId,
      score: data.score ?? 0,
      tag: Array.isArray(data.tag) ? data.tag : [], // ← 安全に変換
      featureHighlights: Array.isArray(data.featureHighlights) ? data.featureHighlights : []
    } as MonitoredItem;
  });

  const random = docs[Math.floor(Math.random() * docs.length)];
  return random;
}
