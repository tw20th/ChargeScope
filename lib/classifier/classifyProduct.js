import { genreIdToCategory } from './genreMap.js'
import { keywordToTags } from './tagRules.js'
import { keywordToDisplayCategory } from './displayCategoryRules.js'

export function classifyProduct(item) {
  const text = `${item.itemName} ${item.itemCaption}`

  let category = 'other'
  let displayCategory = null
  const tags = []

  // タグの抽出
  for (const keyword in keywordToTags) {
    if (text.includes(keyword)) {
      tags.push(...keywordToTags[keyword])
    }
  }

  // 表示用カテゴリーの抽出（最初に一致したものを採用）
  for (const keyword in keywordToDisplayCategory) {
    if (text.includes(keyword)) {
      displayCategory = keywordToDisplayCategory[keyword]
      break
    }
  }

  // 通常のカテゴリ（genreIdベース）
  if (genreIdToCategory[item.genreId]) {
    category = genreIdToCategory[item.genreId]
  }

  return {
    category,
    displayCategory,
    tags: [...new Set(tags)], // 重複排除
  }
}
