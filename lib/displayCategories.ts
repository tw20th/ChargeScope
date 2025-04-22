// lib/displayCategories.ts

import { displayCategoryLabels } from './displayCategoryLabels'

export type DisplayCategory = {
  id: string
  name: string
}

// 表示用カテゴリ一覧を返す関数（固定）
export const getDisplayCategories = async (): Promise<DisplayCategory[]> => {
  return Object.entries(displayCategoryLabels).map(([id, name]) => ({
    id,
    name,
  }))
}
