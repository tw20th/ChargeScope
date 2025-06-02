import fs from "fs";
import path from "path";

const rulePath = path.resolve(__dirname, "../../filters/itemFilterRules.json");
const rules = JSON.parse(fs.readFileSync(rulePath, "utf-8"));

export function isItemEligible(item: { itemName: string; price: number }): boolean {
  const name = item.itemName?.toLowerCase() || "";
  const price = Number(item.price);

  if (isNaN(price)) {
    console.log("❌ 除外: 価格が数値ではない", item.itemName, price);
    return false;
  }

  if (rules.excludeKeywords.some((kw: string) => name.includes(kw.toLowerCase()))) {
    console.log("❌ 除外: 除外ワード含む", item.itemName);
    return false;
  }

  if (!rules.preferredBrands.some((brand: string) => name.includes(brand.toLowerCase()))) {
    console.log("❌ 除外: ブランド不一致", item.itemName);
    return false;
  }

  if (price < rules.minPrice || price > rules.maxPrice) {
    console.log("❌ 除外: 価格帯外", item.itemName, price);
    return false;
  }

  return true;
}
