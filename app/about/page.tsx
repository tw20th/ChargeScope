// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-darkBrown">このサイトについて</h1>

      <section className="space-y-4 text-gray-700">
        <p>
          <strong>「はちゅナビ」</strong>{' '}
          は、爬虫類グッズの比較・発見・情報発信をテーマにした
          ブログ＆商品レビューサイトです。
        </p>
        <p>
          飼育初心者の方から中級者まで、安心して使える情報を提供できるよう心がけています。
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-darkBrown">主な内容</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>爬虫類飼育に役立つグッズの比較</li>
          <li>おすすめ商品の紹介（楽天APIなどを利用）</li>
          <li>飼育ノウハウや初心者向けガイド記事</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-darkBrown">
          使用している技術
        </h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Next.js (App Router)</li>
          <li>TypeScript / Tailwind CSS</li>
          <li>Firebase (Firestore, Hosting)</li>
          <li>楽天商品API</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-darkBrown">お問い合わせ</h2>
        <p>
          ご質問・ご要望がありましたら、
          <a
            href="tw20thcenturyboy@gmail.com"
            className="text-accent underline hover:opacity-80"
          >
            tw20thcenturyboy@gmail.com
          </a>{' '}
          までご連絡ください。
        </p>
      </section>
    </main>
  )
}
