"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { FeatureKeywords } from "@/components/sections/FeatureKeywords";
import { PopularBlogs } from "@/components/sections/PopularBlogs";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";

export default function HomePage() {
  return (
    <motion.main
      className="p-4 space-y-12 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ヒーローセクション：コンセプト・検索導線 */}
      <Hero
        title="最適なモバイルバッテリーがすぐ見つかる"
        subtitle="容量・サイズ・充電速度から、あなたにぴったりの1台を比較・発見できます"
        ctaLabel="人気ランキングを見る"
        ctaHref="/ranking"
      />

      {/* 特徴キーワード：featureHighlightsから自動集計 */}
      <FeatureKeywords
        heading="特徴から探す"
        description="軽量・大容量・PD対応など、注目の機能タグから比較しましょう"
      />

      {/* 人気ブログ：モバイルバッテリー関連のみ抽出 */}
      <PopularBlogs
        heading="選び方ガイド・レビュー記事"
        description="どれを選べばいいか迷ったら、レビュー記事もチェック！"
      />

      {/* 注目の商品：monitoredItemsの人気順など */}
      <FeaturedProducts
        heading="注目のモバイルバッテリー"
        description="今人気のモバイルバッテリーをピックアップ！"
      />
    </motion.main>
  );
}
