"use client";

import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { ProductList } from "@/components/product/ProductList";
import { motion } from "framer-motion";

export const FeaturedProducts = ({
  heading = "注目のモバイルバッテリー",
  description = "今人気のモバイルバッテリーをピックアップ！",
}: {
  heading?: string;
  description?: string;
}) => {
  const { items, loading } = useMonitoredItems();

  // ✅ スコアがなくても createdAt が新しい順で fallback する
  const sortedItems = [...items]
    .sort((a, b) => {
      if (typeof a.score === "number" && typeof b.score === "number") {
        return b.score - a.score;
      }
      return 0;
    })
    .slice(0, 3);
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="text-gray-600 text-sm">{description}</p>

      {loading ? (
        <div>読み込み中...</div>
      ) : sortedItems.length === 0 ? (
        <p className="text-gray-500 text-sm">
          表示できる商品がまだありません。
        </p>
      ) : (
        <ProductList products={sortedItems} title="人気のアイテム" showMedals />
      )}
    </motion.section>
  );
};
