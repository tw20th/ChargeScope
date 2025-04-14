// hooks/usePagination.ts
import { useEffect, useState, useCallback } from 'react'

export const usePagination = (perPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(perPage)

  const fetchPosts = useCallback(() => {
    const start = (currentPage - 1) * perPage
    const end = start + perPage
    setStartIndex(start)
    setEndIndex(end)
  }, [currentPage, perPage])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]) // ✅ 依存に追加！

  return {
    currentPage,
    setCurrentPage,
    startIndex,
    endIndex,
  }
}
