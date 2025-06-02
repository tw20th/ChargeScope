// functions/src/utils/updatePriceHistory.ts

import { db } from "../firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * monitoredItems の指定ドキュメントに priceHistory を追加保存する
 * @param {string} id Firestore ドキュメントID（monitoredItems）
 * @param {number} currentPrice 現在の価格（数値）
 */
export async function updatePriceHistory(id: string, currentPrice: number) {
  const date = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  await db
    .collection("monitoredItems")
    .doc(id)
    .update({
      price: currentPrice,
      priceHistory: FieldValue.arrayUnion({
        date,
        price: currentPrice
      })
    });

  console.log(`📈 priceHistory 追加: ${id} - ${date} - ${currentPrice}円`);
}
