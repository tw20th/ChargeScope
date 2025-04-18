// components/Blog/BlogCard.tsx

import Link from 'next/link'
import { Post } from '@/lib/posts'

export const BlogCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border p-4 rounded-lg hover:bg-gray-50 transition"
    >
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-600">{post.description}</p>
      <time className="text-sm text-gray-400">{post.date}</time>

      {/* 🔽 タグがあれば表示 */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
