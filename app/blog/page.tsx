// app/blog/page.tsx
import { BlogList } from "@/components/sections/BlogList";
import { useFetchBlogs } from "@/hooks/useFetchBlogs"; // 必要であれば追加

export default function BlogPage() {
  const blogs = useFetchBlogs(); // ← hooks 側で型付き定義しておくこと

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
      <BlogList blogs={blogs} title="記事一覧" />
    </div>
  );
}
