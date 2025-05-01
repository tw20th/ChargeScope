'use client'

import { useState, useEffect } from 'react'
import { Hero } from '@/components/common/Hero'
import { PopularProducts } from '@/components/product/PopularProducts'
import { ProductListWithCategory } from '@/components/product/ProductListWithCategory'
import { CategorySelector } from '@/components/product/CategorySelector' // ✅ 追加
import { BlogCard } from '@/components/blog/BlogCard'
import { getAllPosts, Post } from '@/lib/posts'
import { Seo } from '@/components/Seo'
import { BeginnerGuide } from '@/components/guide/BeginnerGuide'
import { BlogList } from '@/components/blog/BlogList' // ✅ ここ！

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedCategory, setSelectedCategory] = useState('cage') // ✅ 追加

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getAllPosts()
      setPosts(result)
    }
    fetchPosts()
  }, [])

  return (
    <>
      <Seo
        title="はちゅナビ | 爬虫類の飼育・用品比較サイト"
        description="初心者から上級者まで使える、爬虫類の飼育方法やおすすめグッズを紹介する総合情報サイトです。"
        image="https://hatyu-navi.vercel.app/ogp.png"
        url="https://hatyu-navi.vercel.app/"
        type="website"
      />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {/* 🦎 ファーストビュー */}
        <Hero />

        {/* 🔥 カテゴリーボタンだけ独立 */}
        <section>
          <CategorySelector
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* 🛍 人気の価格比較セクション */}
        <PopularProducts />

        {/* 🛍 商品一覧（カテゴリ・検索キーワード対応） */}
        <section>
          <ProductListWithCategory
            searchKeyword={searchKeyword}
            selectedCategory={selectedCategory} // ✅ 渡す
          />
        </section>

        {/* 🐣 初心者向け飼育ガイドセクション */}
        <BeginnerGuide />

        {/* 📝 ブログ記事一覧 */}
        <BlogList posts={posts} />
      </main>
    </>
  )
}
