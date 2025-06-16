// app/blog/[slug]/page.tsx
"use client";
import { useTrackBlogView } from "@/lib/hooks/useTrackBlogView"; // インポートのみ

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  useTrackBlogView(slug);

  return <div>...</div>;
}
