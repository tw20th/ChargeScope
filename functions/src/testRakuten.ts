import { fetchRakutenItems } from "./utils/fetchRakutenItems";

fetchRakutenItems("ゲーミングチェア").then(() => {
  console.log("✅ 完了");
  process.exit();
});
