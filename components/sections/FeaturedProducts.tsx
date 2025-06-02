// components/sections/FeaturedProducts.tsx
"use client";

import { useMonitoredItems } from "@/hooks/useMonitoredItems";
import { ProductList } from "@/components/product/ProductList";
import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";

export const FeaturedProducts = () => {
  const { items, loading } = useMonitoredItems();

  const topItems = [...items]
    .filter((item) => typeof item.score === "number")
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4">
        注目の{siteConfig.productCategory}
      </h2>

      {loading ? (
        <div>読み込み中...</div>
      ) : (
        <ProductList products={topItems} title="注目の商品" showMedals />
      )}
    </motion.section>
  );
};
