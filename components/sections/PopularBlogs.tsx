// components/sections/PopularBlogs.tsx
"use client";

import { useBlogs } from "@/hooks/useBlogs";
import { useSortedBlogs } from "@/hooks/useSortedBlogs";
import { BlogCard } from "@/components/blog/BlogCard";
import { motion } from "framer-motion";
import Link from "next/link";

const isNew = (dateStr?: string) => {
  if (!dateStr) return false;
  const created = new Date(dateStr);
  const now = new Date();
  const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 3;
};

export const PopularBlogs = () => {
  const { blogs, loading } = useBlogs();
  const topBlogs = useSortedBlogs(blogs, "viewsDesc").slice(0, 3);

  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">人気ブログ記事</h2>
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">
          すべての記事を見る →
        </Link>
      </div>

      {loading ? (
        <div>読み込み中...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              slug={blog.slug}
              title={blog.title}
              imageUrl={blog.imageUrl}
              tags={blog.tags}
              views={blog.views}
              createdAt={blog.createdAt}
              excerpt={blog.excerpt}
              isNew={isNew(blog.createdAt)}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
};
