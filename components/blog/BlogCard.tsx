import Link from 'next/link'
import Image from 'next/image' // ✅ これを追加！
import { Post } from '@/lib/posts'
import { TagBadge } from './TagBadge'
import { CategoryLabel } from './CategoryLabel'

export const BlogCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
    >
      <div className="flex flex-col h-full">
        {/* ✅ アイキャッチ画像（上部） */}
        <Image
          src={
            post.image && !post.image.includes('your-image-url.com')
              ? post.image
              : 'https://firebasestorage.googleapis.com/v0/b/hatyu-navi.firebasestorage.app/o/gecko-cute.jpg?alt=media&token=1d5f62aa-9982-47a5-91eb-950716bb6259'
          }
          alt={post.title}
          width={800}
          height={400}
          className="object-cover w-full h-48 rounded-lg"
        />

        <div className="p-4 flex flex-col justify-between flex-1">
          {post.category && (
            <div className="mb-1">
              <CategoryLabel category={post.category} />
            </div>
          )}

          <h2 className="text-lg font-semibold mb-2 line-clamp-2">
            {post.title}
          </h2>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {post.description}
          </p>

          <div className="mt-auto">
            <time className="text-xs text-gray-400 block mb-2">
              {post.date}
            </time>

            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
