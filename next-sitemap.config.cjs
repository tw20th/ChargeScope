// next-sitemap.config.cjs
module.exports = {
  siteUrl: 'https://hatyu-navi.vercel.app', // ← 本番ドメインに変更推奨！
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly', // ← 任意：検索エンジンに「週一更新してるよ」と伝える
  priority: 0.7, // ← 任意：ページの重要度（0.0〜1.0）
}
