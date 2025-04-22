// lib/classifier/categoryToDisplayCategory.js

export const categoryToDisplayCategory = {
  food: 'food', // 🍽 餌
  cage: 'cage', // 🏠 ケージ
  light: 'light', // 💡 ライト
  heater: 'thermometer', // 🌡 温度計・ヒーター類はまとめて表示
  thermometer: 'thermometer',
  dish: 'dish', // 💧 水入れ
  substrate: 'substrate', // 🌿 床材
  decor: 'substrate', // 同じく床材に統合（インテリア系）
  tool: 'thermometer', // 工具類は温度・湿度管理に統合
  other: 'cage', // デフォルトはケージに寄せる（任意）
}
