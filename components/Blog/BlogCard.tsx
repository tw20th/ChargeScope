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
    </Link>
  )
}
