// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Seo } from '@/components/Seo'

export const metadata = {
  title: 'はちゅナビ',
  description: '爬虫類の飼い方・グッズ比較なら『はちゅナビ』',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* 全ページ共通のSEO情報 */}
        <Seo />
      </head>
      <body>{children}</body>
    </html>
  )
}
