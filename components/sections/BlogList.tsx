import { BlogCard } from "@/components/cards/BlogCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { Pagination } from "@/components/ui/Pagination";
import { type BlogCardProps } from "@/types/blog";

type Props = {
  blogs: BlogCardProps[];
  isLoading?: boolean;
};

export const BlogList = ({ blogs, isLoading }: Props) => {
  return (
    <section className="bg-background py-12 px-4">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} aspect="video" />
            ))
          : blogs.map((blog) => <BlogCard key={blog.title} {...blog} />)}
      </div>
      {!isLoading && (
        <div className="mt-8 flex justify-center">
          <Pagination />
        </div>
      )}
    </section>
  );
};
