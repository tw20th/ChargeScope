export type PricePoint = {
  date: string; // ISO形式: "2025-06-07"
  price: number;
};

export type Product = {
  id: string;
  productName: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
  // 以下を追加して正式対応してもOK
  score?: number;
  views?: number;
  priceHistory?: { date: string; price: number }[];
  tags: string[]; // ← 必須にする
};
