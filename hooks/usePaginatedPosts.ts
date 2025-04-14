// hooks/usePaginatedPosts.ts
import { useEffect, useState, useCallback } from 'react'
import { getPaginatedPosts, Post } from '@/lib/posts'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

// ✅ カテゴリ対応の引数を追加！
export const usePaginatedPosts = (pageSize = 5, category: string = 'all') => {
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
        category // ✅ ここでカテゴリも渡す！
      )
      setPosts(posts)

      if (next && cursor) {
        setHistory((prev) => [...prev, cursor])
      }
      setCursor(lastVisible)
    },
    [pageSize, cursor, category] // ✅ categoryも依存に追加
  )

  const loadNext = () => fetchPosts(true)

  const loadPrev = () => {
    const prevCursor = history.at(-2) || null
    setHistory((prev) => prev.slice(0, -1))
    setCursor(prevCursor)
    fetchPosts()
  }

  // ✅ カテゴリが変わったら履歴リセットして再取得
  useEffect(() => {
    setHistory([]) // 履歴をリセット
    setCursor(null)
    fetchPosts()
  }, [fetchPosts]) // categoryも依存に含まれているのでOK

  return {
    posts,
    loadNext,
    loadPrev,
    hasNext: !!cursor,
    hasPrev: history.length > 1,
  }
}
