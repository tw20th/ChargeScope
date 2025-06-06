// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";

type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export const Hero = ({ title, subtitle, ctaLabel, ctaHref }: HeroProps) => {
  return (
    <motion.section
      className="text-center py-10 bg-gray-100 rounded-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{subtitle}</p>

      <form
        action="/search"
        method="GET"
        className="flex justify-center gap-2 mb-4 flex-wrap"
      >
        <input
          type="text"
          name="q"
          placeholder="例：10000mAh 軽量 PD対応"
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
        href={ctaHref}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
      >
        {ctaLabel}
      </a>
    </motion.section>
  );
};
