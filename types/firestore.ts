export type PriceHistoryEntry = {
  date: string;
  price: number;
};

export type RakutenItem = {
  itemCode: string;
  itemName: string;
  price: number;
  affiliateUrl: string;
  capacity?: number;
  weight?: number;
  outputPower?: number;
};

export type MonitoredItem = {
  id: string;
  productName: string;
  imageUrl: string; // ✅ 追加
  priceHistory: PriceHistoryEntry[];
  aiSummary: string;
  featureHighlights: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

// Product は MonitoredItem と同義
export type Product = MonitoredItem;

export type Blog = {
  slug: string;
  title: string;
  content: string;
  tags: string[];
  relatedProductIds: string[];
  score?: number;
  views?: number;
  analysisHistory?: {
    score: number;
    title: string;
    updatedAt: string;
  }[];
};
