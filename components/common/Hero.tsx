'use client'

import { Button } from '@/components/ui/button'

export const Hero = () => {
  return (
    <section className="bg-green-100 text-center py-16 px-4">
      <h1 className="text-3xl font-bold">
        初心者でもわかる 爬虫類の選び方・価格比較
      </h1>
      <p className="mt-4 text-gray-700">安心して飼育をスタートしましょう！</p>
      <div className="mt-8 flex justify-center gap-4">
        <Button href="/price-comparison" variant="primary">
          価格比較を見る
        </Button>
        <Button href="/beginner-guide" variant="secondary">
          初心者ガイドを見る
        </Button>
      </div>
    </section>
  )
}
