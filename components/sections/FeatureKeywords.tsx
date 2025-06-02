// components/sections/FeatureKeywords.tsx
"use client";

import { motion } from "framer-motion";
import { FeatureKeywordList } from "@/components/common/FeatureKeywordList";

export const FeatureKeywords = () => {
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h2 className="text-2xl font-bold mb-4">特徴で絞り込む</h2>
      <FeatureKeywordList />
    </motion.section>
  );
};
