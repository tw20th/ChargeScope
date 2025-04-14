// app/page.tsx

export const dynamic = 'force-dynamic'
console.log('🧪 TopPage レンダリングされてるよ！')

export default function HomePage() {
  console.log('📦 HomePage 関数コンポーネント実行！')

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">🐸 はちゅナビへようこそ！</h1>
      <p className="mt-4">このページが表示されれば、ルーティングもOK！</p>
    </main>
  )
}
