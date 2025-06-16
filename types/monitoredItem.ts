export type MonitoredItem = {
  id: string;
  productName: string;
  imageUrl: string;
  priceHistory: { date: string; price: number }[];
  outputPower?: number;
  capacity?: number;
  weight?: number;
  tags: string[]; // ← これを追加！
  // 必要なら他のフィールドも
};
