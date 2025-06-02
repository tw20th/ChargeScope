// functions/src/scripts/migrateProductsToRakutenItems.ts

import { db } from "../firebaseAdmin";

async function migrateProducts() {
  const fromRef = db.collection("products");
  const toRef = db.collection("rakutenItems");

  const snapshot = await fromRef.get();
  console.log(`🚚 移行対象: ${snapshot.size} 件`);

  for (const doc of snapshot.docs) {
    const data = doc.data();

    await toRef.doc(doc.id).set({
      itemCode: data.itemCode || doc.id,
      itemName: data.itemName || data.title || "",
      itemPrice: data.itemPrice || data.price || 0,
      itemUrl: data.itemUrl || data.link || "",
      imageUrl: data.imageUrl || data.image || "",
      description: data.description || "",
      categoryId: data.categoryId || "",
      fetchDate: data.fetchDate || new Date()
    });

    console.log(`✅ コピー完了: ${doc.id}`);
  }

  console.log("🎉 全件コピー完了！");
}

migrateProducts().catch(err => {
  console.error("❌ エラー:", err);
});
