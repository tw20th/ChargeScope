// types/item.ts
import { Timestamp } from "firebase/firestore"; // 追加

export type MonitoredItem = {
  id?: string;
  productName: string;
  price: string;
  score: number;
  featureHighlights?: string[];
  tag?: string[];
  fromRakutenItemId?: string;
  priceHistory?: { date: string; price: number }[];
  imageKeyword?: string;
  imageUrl?: string;
  itemUrl?: string;
  category?: string;

  // ✅ Firebase Timestamp 型に修正
  createdAt?: Timestamp;
};
