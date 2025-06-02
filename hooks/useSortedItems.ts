// hooks/useSortedItems.ts
import { useState, useMemo } from 'react'

export function useSortedItems<T, K extends string>(
  items: T[],
  sortFunctions: Record<K, (a: T, b: T) => number>,
  defaultKey: K
) {
  const [sortKey, setSortKey] = useState<K>(defaultKey)

  const sortedItems = useMemo(() => {
    return [...items].sort(sortFunctions[sortKey])
  }, [items, sortKey, sortFunctions])

  return { sortKey, setSortKey, sortedItems }
}
