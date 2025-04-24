// utils/generatePromptByWeekday.ts

export const generatePromptByWeekday = (weekday: number): string => {
  const themeMap: Record<number, string[]> = {
    0: ["レオパの飼育ポイント", "レオパのケージレイアウト"],
    1: ["フトアゴの食事管理", "フトアゴに最適な温度環境"],
    2: ["初心者向け飼育スターター", "爬虫類グッズのメンテナンス"],
    3: ["ケージのおしゃれインテリア", "ライトの選び方"],
    4: ["エサの与え方", "餌の保存方法"],
    5: ["多頭飼いの注意点", "性格の違いまとめ"],
    6: ["健康チェックの方法", "脱皮時のサポート"],
  };

  const themes = themeMap[weekday] || themeMap[0];
  const selectedTheme = themes[Math.floor(Math.random() * themes.length)];

  return `
今日は「${selectedTheme}」というテーマで、初心者の方に向けて、わかりやすくていねいにブログ記事を書いてください。
- 冒頭に簡単なあいさつと導入を入れてください。
- SEOを意識しつつ、やさしい日本語で説明してください。
- Markdown形式で、# タイトル、導入文、## セクション（2つ以上）、# まとめ、の構成でお願いします。
  `.trim();
};
