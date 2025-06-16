import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

// Firebase 初期化
const decodedKey = Buffer.from(process.env.FB_PRIVATE_KEY_BASE64!, "base64").toString("utf8");
const serviceAccount = JSON.parse(decodedKey);
initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

interface RakutenItem {
  itemCode: string;
  itemName: string;
  price: number;
  affiliateUrl: string;
  imageUrl: string;
  shopName: string;
  description: string;
  capacity?: number;
  weight?: number;
  outputPower?: number;
  outputPorts?: number;
  hasTypeC?: boolean;
  createdAt: FirebaseFirestore.Timestamp;
}

export async function fetchRakutenItems(): Promise<void> {
  const endpoint = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";
  const params = new URLSearchParams({
    applicationId: process.env.RAKUTEN_APP_ID!,
    affiliateId: process.env.RAKUTEN_AFFILIATE_ID!,
    keyword: "モバイルバッテリー anker",
    genreId: "100026",
    hits: "30",
    sort: "+affiliateRate",
    format: "json"
  });

  try {
    const response = await fetch(`${endpoint}?${params}`);
    const data = await response.json();

    if (!data.Items || !Array.isArray(data.Items)) {
      console.error("❌ 楽天APIから商品が取得できませんでした");
      return;
    }

    const batch = db.batch();

    for (const itemWrapper of data.Items) {
      const item = itemWrapper.Item;

      const docRef = db.collection("rakutenItems").doc(item.itemCode);
      const rakutenItem: RakutenItem = {
        itemCode: item.itemCode,
        itemName: item.itemName,
        price: item.itemPrice,
        affiliateUrl: item.affiliateUrl,
        imageUrl: item.mediumImageUrls?.[0]?.imageUrl ?? "",
        shopName: item.shopName,
        description: item.itemCaption,
        createdAt: new Date() as unknown as FirebaseFirestore.Timestamp
      };

      batch.set(docRef, rakutenItem, { merge: true });
    }

    await batch.commit();
    console.log("✅ 楽天商品データを保存しました");
  } catch (err) {
    console.error("❌ fetchRakutenItems 実行中にエラーが発生しました:", err);
  }
}

// CLI 実行対応
if (require.main === module) {
  fetchRakutenItems().catch(console.error);
}
