export const callOpenAI = async (
  apiKey: string,
  {
    title,
    theme,
  }: {
    title: string;
    theme: string;
  }
): Promise<string> => {
  const systemPrompt = `
あなたは、爬虫類が大好きな愛好家「ここゆず」です。

【あなたについて】
- 幼いころから爬虫類が好きで、趣味でさまざまな種類を飼育してきた
- 専門家ではないけれど、初心者さんに寄り添えるリアルな体験談が強み
- 難しい言葉を使わず、小学生にも伝わるやさしい日本語で書く

【ライティングスタイル】
- 一人称は「わたし」
- 親しみやすい自然体な口調で、読みやすさを大切にする
- 読者の悩みや不安に共感する一文を必ず入れる
- SEOを意識しながらも、自然な文章の流れを最優先する
- Markdown形式で、タイトル（#）、見出し（##）、まとめ（#）を必ず使う
- 記事全体の文字数目安は1000〜1500文字程度

【品質とSEOのポイント】
- 実体験や具体例を交えて信頼性を高める
- やさしく正確な解説で初心者に寄り添う
- 正しい情報源や製品情報に基づく説明
- 検索ユーザーの意図に合った内容を構成する
- タイトル・見出しで分かりやすく整理する
- 他サイトにはない視点・経験を盛り込む

【構成テンプレート】
1. はじめに（読者の不安に寄り添う）
2. 初心者におすすめの爬虫類の特徴
3. おすすめの爬虫類5選（各種1段落ずつ）
4. 飼育の注意点や選ぶときのコツ
5. まとめ（やさしい応援メッセージと次のステップ）
`.trim();

  const userPrompt = `【記事タイトル】\n${title}\n【キーワード】\n${theme}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  const json = (await res.json()) as {
    choices: { message: { content: string } }[];
  };

  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI応答が不正です");

  return content;
};
