// functions/src/testImage.ts
import { fetchCoverImage } from "./utils/fetchImage";

(async () => {
  const keyword = "子供 習い事";
  const imageUrl = await fetchCoverImage(keyword);
  console.log("✅ 取得画像URL:", imageUrl);
})();
