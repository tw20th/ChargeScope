// components/sections/Hero.tsx
"use client";

import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";

export const Hero = () => {
  const heroTitle =
    siteConfig.heroTitle ||
    siteConfig.title.replace(" |", "").replace(siteConfig.siteName, "").trim();
  const heroSubtitle = siteConfig.heroSubtitle || siteConfig.description;

  return (
    <motion.section
      className="text-center py-10 bg-gray-100 rounded-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{heroTitle}</h1>
      <p className="text-gray-600 mb-4">{heroSubtitle}</p>

      <form
        action="/search"
        method="GET"
        className="flex justify-center gap-2 mb-4 flex-wrap"
      >
        <input
          type="text"
          name="q"
          placeholder="検索キーワード"
          className="w-64 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          検索
        </button>
      </form>

      <a
        href="/ranking"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
      >
        人気ランキングを見る
      </a>
    </motion.section>
  );
};
