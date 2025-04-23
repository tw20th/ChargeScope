// components/blog/BlogCard.tsx

import Link from 'next/link'
import { Post } from '@/lib/posts'

export const BlogCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border rounded-lg p-4 h-full shadow-sm hover:shadow-md transition bg-white"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {post.description}
          </p>
        </div>

        <div className="mt-auto">
          <time className="text-xs text-gray-400 block mb-2">{post.date}</time>

          {/* タグ */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
