import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import {v4 as uuid} from "uuid";
import {generatePromptByWeekday} from "../utils/generatePromptByWeekday";

admin.initializeApp();
const db = admin.firestore();

const generatePost = async (apiKey: string) => {
  const today = new Date();
  const weekday = today.getDay(); // ← ✅ 曜日（0〜6）を取得

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
あなたは、爬虫類のブログを8年間書き続けている専門ライター「ゆず」です。

- 一人称は「わたし」
- 文章はやさしく、ていねいな口調
- 初心者の方に寄り添うように、わかりやすく説明する
- SEOを意識しつつ、自然な日本語を心がける
- Markdown形式で、タイトル・導入・H2見出し・まとめを含めて書く

これからユーザーが提示するテーマに合わせて、ブログ記事を書いてください。
          `.trim(),
        },
        {
          role: "user",
          content: generatePromptByWeekday(weekday), // ← ✅ 曜日を渡す
        },
      ],
    }),
  });

  const json = (await res.json()) as {
    choices: { message: { content: string } }[]
  };

  return {
    title: "レオパの保温管理：初心者向けガイド", // ← 必要なら動的に
    slug: `auto-${uuid().slice(0, 8)}`,
    description: "初心者向けにレオパの温度管理ポイントを紹介します。",
    image: "https://source.unsplash.com/800x400/?leopard-gecko",
    content: json.choices[0].message.content,
    date: new Date().toISOString().split("T")[0],
  };
};

export const dailyPost = functions
  .runWith({secrets: ["OPENAI_API_KEY"]})
  .pubsub.schedule("0 22 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const post = await generatePost(OPENAI_API_KEY);
    await db.collection("posts").doc(post.slug).set(post);
    console.log(`✅ 自動投稿完了: ${post.slug}`);
  });
