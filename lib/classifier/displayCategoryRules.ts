// lib/classifier/displayCategoryRules.ts

export const keywordToDisplayCategory: Record<string, string> = {
  // 🔥 特集
  セール: 'sale',

  // 🏠 飼育環境
  ケージ: 'cage',
  ゲージ: 'cage',

  // 💡 照明
  ライト: 'light',
  紫外線灯: 'light',
  照明: 'light',

  // 🍽 餌
  餌: 'food',
  フード: 'food',
  ドライ: 'food',
  ゲル: 'food',
  ウェット: 'food',

  // 🪵 床材
  床材: 'substrate',
  ソイル: 'substrate',
  チップ: 'substrate',

  // 🌡 温度計
  温度計: 'thermometer',
  サーモスタット: 'thermometer',

  // 💧 水入れ
  水入れ: 'waterbowl',
  水容器: 'waterbowl',
}
