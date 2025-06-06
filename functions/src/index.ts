// functions/src/index.ts
import { onSchedule } from "firebase-functions/v2/scheduler";
import { fetchRakutenItems } from "./scripts/fetchRakutenItems";

export const fetchRakutenItemsScheduled = onSchedule(
  {
    schedule: "every day 04:00", // JST 13:00 実行（UTC 04:00）
    timeZone: "Asia/Tokyo",
    region: "asia-northeast1"
  },
  async () => {
    await fetchRakutenItems();
  }
);
