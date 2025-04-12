// functions/src/utils/generatePromptByWeekday.ts
export function generatePromptByWeekday(weekday: number): string {
  const prompts: { [key: number]: { theme: string; keywords: string[] } } = {
    0: {
      // Sunday
      theme: "初心者からよくある質問とその回答",
      keywords: ["レオパ", "初心者", "飼育", "疑問"],
    },
    1: {
      theme: "レオパ飼育の基礎ガイド",
      keywords: ["レオパ", "飼い方", "飼育", "初心者"],
    },
    2: {
      theme: "温度と湿度の正しい管理方法",
      keywords: ["レオパ", "温度管理", "湿度", "ケージ"],
    },
    3: {
      theme: "レオパの食事と給餌方法",
      keywords: ["レオパ", "餌", "与え方", "食事"],
    },
    4: {
      theme: "病気の兆候とそのケア",
      keywords: ["レオパ", "病気", "脱皮", "対処法"],
    },
    5: {
      theme: "レオパのケージレイアウトと設備",
      keywords: ["レオパ", "ケージ", "設備", "レイアウト"],
    },
    6: {
      theme: "ゆずの飼育エッセイや体験談",
      keywords: ["レオパ", "体験談", "コラム", "失敗談"],
    },
  };

  const data = prompts[weekday];
  const keywordsText = data.keywords.map((k) => `「${k}」`).join("、");

  return `
以下の条件でMarkdown形式のブログ記事を生成してください。

■ キャラクター：「ゆず」という8年飼育歴のある女性。優しく丁寧な語り口。
■ テーマ：「${data.theme}」
■ キーワード：${keywordsText}
■ 文字数：400文字程度
■ 構成：タイトル・導入・H2見出し・まとめ
やさしい日本語で、自然なSEOを意識して書いてください。
  `;
}
