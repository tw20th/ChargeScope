// components/Seo.tsx
'use client'

import Head from 'next/head'

type SeoProps = {
  title?: string
  description?: string
  image?: string
  url?: string
}

export const Seo = ({
  title = 'はちゅナビ | 爬虫類の飼育・用品比較サイト',
  description = '初心者から上級者まで使える、爬虫類の飼育方法やおすすめグッズを紹介する総合情報サイトです。',
  image = '/ogp.png', // public/ogp.png に画像を入れておくと便利
  url = 'https://hatyu-navi.example.com', // あとで正式なURLに置き換え
}: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
