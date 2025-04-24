'use client'

import { useState, useEffect } from 'react'
import { ProductListWithCategory } from '@/components/product/ProductListWithCategory'
import { BlogCard } from '@/components/blog/BlogCard'
import { getAllPosts, Post } from '@/lib/posts'
import { Seo } from '@/components/Seo'

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getAllPosts()
      setPosts(result)
    }
    fetchPosts()
  }, [])

  return (
    <>
      {/* ✅ SEOメタタグをトップページにも設定 */}
      <Seo
        title="はちゅナビ | 爬虫類の飼育・用品比較サイト"
        description="初心者から上級者まで使える、爬虫類の飼育方法やおすすめグッズを紹介する総合情報サイトです。"
        image="https://hatyu-navi.vercel.app/ogp.png"
        url="https://hatyu-navi.vercel.app/"
        type="website"
      />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {/* 🐸 ヒーローセクション（検索バー） */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold">🐸 はちゅナビへようこそ！</h1>
          <p className="text-gray-600">爬虫類グッズの比較・発見・ブログも！</p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="キーワードで検索..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full px-4 py-2 border rounded shadow-sm"
            />
          </div>
        </section>

        {/* 🛍 商品一覧（検索・カテゴリ連携） */}
        <section>
          <ProductListWithCategory searchKeyword={searchKeyword} />
        </section>

        {/* 📝 ブログ記事一覧 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">最新のブログ記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
