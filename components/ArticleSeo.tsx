// components/ArticleSeo.tsx
'use client'

import Head from 'next/head'

type ArticleSeoProps = {
  title: string
  description: string
  url: string
  image?: string
  publishedTime?: string
}

export const ArticleSeo = ({
  title,
  description,
  url,
  image = '/ogp.png',
  publishedTime,
}: ArticleSeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      <meta name="twitter:card" content="summary_large_image" />

      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description,
            image,
            url,
            datePublished: publishedTime,
          }),
        }}
      />
    </Head>
  )
}
