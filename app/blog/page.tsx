'use client'

import { useState, useMemo } from 'react'
import { usePaginatedPosts } from '@/hooks/usePaginatedPosts'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { SearchBar } from '@/components/blog/SearchBar'
import { BlogCard } from '@/components/blog/BlogCard'
import { Pagination } from '@/components/blog/Pagination'
import { Post } from '@/lib/posts'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const { posts, loadNext, loadPrev, hasNext, hasPrev } = usePaginatedPosts(
    10,
    selectedCategory
  )

  // 🔍 キーワード + タグ フィルター（フロント）
  const filteredPosts = useMemo(() => {
    let result = posts

    if (searchKeyword) {
      result = result.filter(
        (post: Post) =>
          post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          post.description?.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    }

    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag))
    }

    return result
  }, [searchKeyword, selectedTag, posts])

  // ✅ タグ出現回数を集計し、人気順で並び替え
  const tagCounts: { [tag: string]: number } = {}
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const allTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1]) // 人気順にソート
    .map(([tag]) => tag)

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">新着ブログ記事</h1>

      <SearchBar value={searchKeyword} onChange={setSearchKeyword} />

      <CategoryFilter
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat)
          setSelectedTag(null) // ✅ カテゴリ変更時はタグ選択リセット
        }}
      />

      {/* 🔽 人気順タグフィルター */}
      <div className="flex gap-2 mt-2 flex-wrap">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full border ${
            selectedTag === null ? 'bg-blue-600 text-white' : 'text-blue-600'
          }`}
        >
          すべてのタグ
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full border ${
              selectedTag === tag
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            #{tag}{' '}
            <span className="text-xs text-gray-400 ml-1">
              ({tagCounts[tag]})
            </span>
          </button>
        ))}
      </div>

      {/* 記事一覧 */}
      <div className="space-y-4 mt-4">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-gray-500 mt-4">
          該当する記事が見つかりませんでした。
        </p>
      )}

      {filteredPosts.length > 0 && (
        <Pagination
          onNext={loadNext}
          onPrev={loadPrev}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      )}
    </main>
  )
}
