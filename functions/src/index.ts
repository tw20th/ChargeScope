// ✅ Firebase Functions v1 を明示的に使用
import * as functions from "firebase-functions";

// 各処理ロジックのインポート
import { fetchRakutenItems } from "./lib/fetchRakutenItems";
import { filterAndSaveItems } from "./lib/filterAndSaveItems";
import { generateAiSummaries } from "./lib/generateAiSummary";
import { generateBlogFromItems } from "./lib/scheduledBlog";
import { analyzeArticles } from "./lib/analyzeArticle";

// ✅ fetchRakutenItems：毎日 04:00 実行
export const fetchRakutenItemsScheduled = functions.pubsub
  .schedule("every day 04:00")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    await fetchRakutenItems();
  });

// ✅ filterAndSaveItems：毎日 04:10 実行
export const filterAndSaveItemsScheduled = functions.pubsub
  .schedule("every day 04:10")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    await filterAndSaveItems();
  });

// ✅ generateAiSummaries：毎日 04:20 実行
export const generateAiSummariesScheduled = functions.pubsub
  .schedule("every day 04:20")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    await generateAiSummaries();
  });

// ✅ generateBlogFromItems：毎日 04:30 実行
export const generateBlogFromItemsScheduled = functions.pubsub
  .schedule("every day 04:30")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    await generateBlogFromItems();
  });

// ✅ analyzeArticles：毎日 04:45 実行
export const analyzeArticlesScheduled = functions.pubsub
  .schedule("every day 04:45")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    await analyzeArticles();
  });
