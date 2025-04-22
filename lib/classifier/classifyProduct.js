import { genreIdToCategory } from './genreMap.js'
import { keywordToTags } from './tagRules.js'
import { categoryToDisplayCategory } from './categoryToDisplayCategory.js'
import { excludeKeywords } from './excludeKeywords.js'

export function classifyProduct(item) {
  const text = `${item.itemName} ${item.itemCaption}`

  // ❌ NGワードに該当するものは除外
  if (excludeKeywords.some((word) => text.includes(word))) {
    console.log(`❌ 除外: ${item.itemName}`)
    return null
  }

  // タグ抽出
  const tags = []
  for (const keyword in keywordToTags) {
    if (text.includes(keyword)) {
      tags.push(...keywordToTags[keyword])
    }
  }

  // 初期カテゴリ：genreIdベース（あれば）
  let category = 'other'
  if (genreIdToCategory[item.genreId]) {
    category = genreIdToCategory[item.genreId]
  }

  // ✅ キーワードからカテゴリをスコア制で補正
  const categoryHints = [
    {
      category: 'dish',
      keywords: [
        '水入れ',
        '水皿',
        'ウォーターディッシュ',
        'ディッシュ',
        '餌皿',
        'エサ皿',
        '食器',
        'ボウル',
      ],
    },
    {
      category: 'thermometer',
      keywords: ['温度計', '湿度計', '温湿度計', '温度管理', '保温'],
    },
    {
      category: 'substrate',
      keywords: [
        '床材',
        'ソイル',
        'マット',
        'ウッドチップ',
        'ヤシガラ',
        'パウダー',
      ],
    },
    {
      category: 'light',
      keywords: ['照明', 'ライト', '紫外線', 'UVB', 'ランプ', '蛍光灯'],
    },
    {
      category: 'cage',
      keywords: ['ケージ', '飼育ケース', 'タンク', '水槽', 'プラケース'],
    },
    {
      category: 'food',
      keywords: [
        'フード',
        '餌',
        'えさ',
        'ペレット',
        '昆虫',
        'ミルワーム',
        'レトルト',
      ],
    },
    {
      category: 'care',
      keywords: ['ピンセット', 'スプレー', '霧吹き', '加湿器', 'スポイト'],
    },
  ]

  const scores = {}

  for (const hint of categoryHints) {
    for (const keyword of hint.keywords) {
      if (text.includes(keyword)) {
        scores[hint.category] = (scores[hint.category] || 0) + 1
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  if (sorted.length > 0) {
    category = sorted[0][0]
  }

  // 表示カテゴリのマッピング（今回の主眼）
  const displayCategory = categoryToDisplayCategory[category] || 'all'

  return {
    category,
    displayCategory,
    tags: [...new Set(tags)],
  }
}
