// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'

export const metadata = {
  title: 'はちゅナビ',
  description: '爬虫類の飼い方・グッズ比較なら『はちゅナビ』',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-bgSoft text-darkBrown">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
