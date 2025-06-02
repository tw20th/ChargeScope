// scripts/cleanRakutenItems.ts

import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../service-account-key.json"; // ✅ 修正済みパス

initializeApp({ credential: cert(serviceAccount as ServiceAccount) });
const db = getFirestore();

const preferredBrands = [
  "GEX",
  "ジェックス",
  "スドー",
  "マルカン",
  "エキゾテラ",
  "SANKO",
  "キョーリン",
  "REPTI ZOO"
];

const COLLECTION_NAME = "rakutenItems";

const main = async () => {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  console.log(`🔍 ${snapshot.size} items loaded from ${COLLECTION_NAME}`);

  let updatedCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();

    const itemPrice = Number(data.itemPrice);
    if (isNaN(itemPrice)) {
      console.warn(`⚠️ Skipped [${doc.id}] - itemPrice is not a valid number:`, data.itemPrice);
      continue;
    }

    if (!data.itemName || !data.description) {
      console.warn(`⚠️ Skipped [${doc.id}] - Missing itemName or description`);
      continue;
    }

    const combinedText = `${data.itemName} ${data.description}`;
    const matchedBrand = preferredBrands.find(brand => combinedText.includes(brand)) || "unknown";

    const updatePayload: Record<string, unknown> = {
      itemPrice,
      brand: matchedBrand
    };

    await doc.ref.update(updatePayload);
    console.log(`✅ Updated [${doc.id}] - brand: ${matchedBrand}, price: ${itemPrice}`);
    updatedCount++;
  }

  console.log(`🎉 Completed. Total updated documents: ${updatedCount}`);
};

main().catch(e => {
  console.error("🔥 Error in cleanRakutenItems:", e);
  process.exit(1);
});
