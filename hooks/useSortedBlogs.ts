import { useMemo } from "react";
import { Blog } from "@/types/blog";

export type BlogSortOption = "viewsDesc" | "latest";

export const useSortedBlogs = (
  blogs: Blog[],
  sort: BlogSortOption = "latest"
) => {
  const sorted = useMemo(() => {
    const cloned = [...blogs];
    switch (sort) {
      case "viewsDesc":
        return cloned.sort((a, b) => b.views - a.views);
      case "latest":
      default:
        return cloned.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [blogs, sort]);

  return sorted;
};
