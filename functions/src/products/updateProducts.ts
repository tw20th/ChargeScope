// functions/src/products/updateProducts.ts

import * as functions from "firebase-functions/v1";
import fetch from "node-fetch";
import { db } from "../lib/firebaseAdmin";

type RakutenResponse = {
  Items: {
    Item: {
      itemName: string;
      itemCaption: string;
      itemPrice: number;
      mediumImageUrls?: { imageUrl: string }[];
    };
  }[];
};

// 個別商品を更新する関数
export const updateRakutenProduct = async (
  productId: string,
  appId: string
) => {
  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId=${appId}&itemCode=${productId}`;
  const res = await fetch(url);
  const json = (await res.json()) as RakutenResponse;

  const item = json.Items?.[0]?.Item;
  if (!item) {
    console.warn(`❗ 商品が見つかりません: ${productId}`);
    return;
  }

  const productRef = db.collection("products").doc(productId);
  await productRef.update({
    title: item.itemName,
    description: item.itemCaption,
    price: item.itemPrice,
    image: item.mediumImageUrls?.[0]?.imageUrl ?? "",
    updatedAt: new Date(),
  });

  console.log(`✅ 商品更新: ${productId}`);
};

// ☀️ 新バージョン: 古い順に1000件更新する関数
export const updateRakutenProducts = functions
  .runWith({ secrets: ["RAKUTEN_APP_ID"] })
  .https.onRequest(async (req, res) => {
    const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID;
    if (!RAKUTEN_APP_ID) {
      res.status(500).send("RAKUTEN_APP_ID is not set");
      return;
    }

    // ⭐ updatedAtが最も古い商品を1000件だけ取得
    const snapshot = await db
      .collection("products")
      .orderBy("updatedAt", "asc")
      .limit(1000)
      .get();

    const updatePromises = snapshot.docs.map((doc) => {
      const productId = doc.id;
      return updateRakutenProduct(productId, RAKUTEN_APP_ID);
    });

    await Promise.all(updatePromises);

    res.send(`✅ ${updatePromises.length}件の商品を更新しました！`);
  });
