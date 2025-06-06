// scripts/importMonitoredItems.ts
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin";
import serviceAccountJson from "../serviceAccountKey.json" assert { type: "json" };

const serviceAccount = serviceAccountJson as ServiceAccount;

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

const sampleItem = {
  productName: "Anker PowerCore 10000",
  price: "2980",
  score: 87,
  featureHighlights: ["軽量", "急速充電", "PD対応"],
  tag: ["10000mAh", "Anker", "USB-C"],
  fromRakutenItemId: "1000001",
  priceHistory: [
    { date: "2025-06-01", price: 2980 },
    { date: "2025-06-02", price: 2850 },
  ],
  imageKeyword: "モバイルバッテリー 軽量",
  imageUrl: "https://example.com/image.jpg",
  itemUrl: "https://example.com/item",
  category: "モバイルバッテリー",
};

(async () => {
  await db.collection("monitoredItems").add(sampleItem);
  console.log("✅ monitoredItems に登録されました");
})();
console.log("✅ monitoredItems に登録されました");
