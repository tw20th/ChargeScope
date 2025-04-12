// app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {post.image && (
        <div className="aspect-video relative rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content || ''}</ReactMarkdown>
      </div>
    </main>
  )
}
