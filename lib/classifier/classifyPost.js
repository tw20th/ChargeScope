import { keywordToTags } from './tagRules.js'
import { tagToDisplayCategory } from './tagToDisplayCategory.js'

/**
 * テキストからタグとカテゴリを自動抽出する
 * @param {string} text - 対象の本文やタイトル
 * @returns {{ tags: string[], category: string }}
 */
export function classifyPost(text) {
  const rawTags = []

  // タグ抽出：キーワードにマッチするものをすべて追加
  for (const keyword in keywordToTags) {
    if (text.includes(keyword)) {
      rawTags.push(...keywordToTags[keyword])
    }
  }

  // ✅ 重複削除 & 上限制限（例：5個まで）
  const MAX_TAGS = 5
  const tags = [...new Set(rawTags)].slice(0, MAX_TAGS)

  // ✅ カテゴリスコア付け
  const scoreMap = {}

  for (const tag of tags) {
    const cat = tagToDisplayCategory[tag]
    if (cat) {
      scoreMap[cat] = (scoreMap[cat] || 0) + 1
    }
  }

  const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1])
  const category = sorted.length > 0 ? sorted[0][0] : 'other'

  return { tags, category }
}
