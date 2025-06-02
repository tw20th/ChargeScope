"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { FeatureKeywords } from "@/components/sections/FeatureKeywords";
import { PopularBlogs } from "@/components/sections/PopularBlogs";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";

export default function HomePage() {
  return (
    <motion.main
      className="p-4 space-y-10 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <FeatureKeywords />
      <PopularBlogs />
      <FeaturedProducts />
    </motion.main>
  );
}
