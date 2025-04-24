import { useEffect, useState, useCallback } from 'react'
import { getPaginatedPosts, Post } from '@/lib/posts'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

// ✅ 並び順にも対応するよう引数を追加！
export const usePaginatedPosts = (
  pageSize = 5,
  category: string = 'all',
  sortType: 'new' | 'popular' | 'featured' = 'new'
) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [cursor, setCursor] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [history, setHistory] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  )

  const fetchPosts = useCallback(
    async (next = false) => {
      const { posts, lastVisible } = await getPaginatedPosts(
        pageSize,
        next ? cursor : null,
        category,
        undefined, // 🔍 タグでのフィルターは未使用のため null or undefined
        sortType
      )
      setPosts(posts)

      if (next && cursor) {
        setHistory((prev) => [...prev, cursor])
      }
      setCursor(lastVisible)
    },
    [pageSize, cursor, category, sortType] // ✅ sortTypeも依存に追加！
  )

  const loadNext = () => fetchPosts(true)

  const loadPrev = () => {
    const prevCursor = history.at(-2) || null
    setHistory((prev) => prev.slice(0, -1))
    setCursor(prevCursor)
    fetchPosts()
  }

  // ✅ category や sortType が変わったら履歴リセット
  useEffect(() => {
    setHistory([])
    setCursor(null)
    fetchPosts()
  }, [fetchPosts]) // fetchPosts が全ての依存を持っているのでOK

  return {
    posts,
    loadNext,
    loadPrev,
    hasNext: !!cursor,
    hasPrev: history.length > 1,
  }
}
