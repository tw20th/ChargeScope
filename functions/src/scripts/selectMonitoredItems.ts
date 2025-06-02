import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccountJson from "../../service-account-key.json";

const serviceAccount = serviceAccountJson as ServiceAccount;

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// 絞り込みルール
const config = {
  minPrice: 1000,
  maxPrice: 20000,
  excludeKeywords: [
    "人間用",
    "靴",
    "ぬいぐるみ",
    "スマホケース",
    "キーホルダー",
    "フィギュア",
    "Tシャツ",
    "本",
    "DVD",
    "おもちゃ",
    "車用"
  ],
  preferredBrands: [
    "スドー",
    "GEX",
    "ジェックス",
    "SANKO",
    "マルカン",
    "ニッソー",
    "エキゾテラ",
    "カミハタ",
    "REPTI ZOO",
    "レプティズー",
    "キョーリン",
    "Hikari",
    "ヒカリ",
    "ビバリア",
    "ズーメッド",
    "レプタイル",
    "レオパゲル",
    "レプタイルズ",
    "爬虫類",
    "爬虫類専用",
    "爬虫類ライト",
    "爬虫類飼育",
    "ペット用品"
  ]
};

const main = async () => {
  const snapshot = await db.collection("rakutenItems").get();
  console.log(`🔍 Loaded ${snapshot.size} documents from rakutenItems`);

  let migratedCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();

    // バリデーション
    if (!data.itemName || !data.description || !data.itemPrice) continue;

    const price = Number(data.itemPrice);
    if (isNaN(price) || price < config.minPrice || price > config.maxPrice) continue;

    const text = `${data.itemName} ${data.description}`;
    if (config.excludeKeywords.some(keyword => text.includes(keyword))) continue;

    const matchedBrand = config.preferredBrands.find(b => text.includes(b)) || "unknown";

    const monitoredItem = {
      ...data,
      itemPrice: price,
      brand: matchedBrand,
      migratedAt: new Date()
    };

    await db.collection("monitoredItems").doc(doc.id).set(monitoredItem);
    console.log(`✅ Migrated [${doc.id}]`);
    migratedCount++;
  }

  console.log(`🎉 Migration complete. Total: ${migratedCount}`);
};

main().catch(err => {
  console.error("🔥 Migration failed:", err);
  process.exit(1);
});
