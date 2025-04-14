// sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hatyu-navi.vercel.app', // ← ご自身の本番URLに変更してください！
  generateRobotsTxt: true, // robots.txt も生成されます
  sitemapSize: 7000, // 1ファイルあたりの最大URL数
  changefreq: 'weekly', // サイトマップの更新頻度（任意）
  priority: 0.7, // ページの優先度（任意）
}
