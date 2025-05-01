import { getGuideBySlug } from '@/lib/guides'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

type Props = { params: { slug: string } }

export default async function GuidePage({ params }: Props) {
  const guide = await getGuideBySlug(params.slug)
  if (!guide) return notFound()

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{guide.title}</h1>
      <p className="text-gray-500 mb-2 text-sm">{guide.date}</p>
      <div className="prose max-w-none">
        <ReactMarkdown>{guide.content}</ReactMarkdown>
      </div>
    </main>
  )
}
