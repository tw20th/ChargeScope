import { getAllGuides } from '@/lib/guides'

export default async function GuidesPage() {
  const guides = await getAllGuides()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">初心者ガイド一覧</h1>
      <ul className="space-y-4">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <a
              href={`/guides/${guide.slug}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <h2 className="text-lg font-semibold text-green-800">
                {guide.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{guide.description}</p>
            </a>
            <p className="text-gray-600 text-sm">{guide.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
