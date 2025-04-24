'use client'

import Head from 'next/head'

type SeoProps = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' // ← 追加！
  noIndex?: boolean
}

export const Seo = ({
  title = 'はちゅナビ | 爬虫類の飼育・用品比較サイト',
  description = '初心者から上級者まで使える、爬虫類の飼育方法やおすすめグッズを紹介する総合情報サイトです。',
  image = '/ogp.png',
  url = 'https://hatyu-navi.example.com',
  type = 'website',
  noIndex = false,
}: SeoProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'BlogPosting' : 'WebSite',
    headline: title,
    description,
    image,
    url,
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex' : 'index, follow'} />
      <link rel="canonical" href={url} />

      {/* OGP */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  )
}
