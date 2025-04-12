// app/page.tsx
import { Seo } from '@/components/Seo'

export default function Home() {
  return (
    <>
      <Seo title="はちゅナビ - 爬虫類情報ブログ" />
      <main className="flex min-h-screen items-center justify-center bg-green-100 text-2xl font-bold">
        <p>Tailwind OK！</p>
      </main>
    </>
  )
}
