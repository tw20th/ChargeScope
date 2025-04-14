import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import {v4 as uuid} from "uuid";
import {generatePromptByWeekday} from "../utils/generatePromptByWeekday";
import {autoLinkCategories} from "../utils/autoLinkCategories";

admin.initializeApp();
const db = admin.firestore();

// ✅ 未使用の画像を1枚ランダム取得する関数
const getUnusedImageAsset = async () => {
  const snapshot = await db
    .collection("imageAssets")
    .where("used", "==", false)
    .get();

  const docs = snapshot.docs;
  if (docs.length === 0) return null;

  const randomDoc = docs[Math.floor(Math.random() * docs.length)];
  const data = randomDoc.data();

  // 使用済みに更新
  await randomDoc.ref.update({used: true});

  return {
    url: data.url,
    comment: data.comment,
  };
};

const generatePost = async (apiKey: string) => {
  const today = new Date();
  const weekday = today.getDay();

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
          content: generatePromptByWeekday(weekday),
        },
      ],
    }),
  });

  const json = (await res.json()) as {
    choices: { message: { content: string } }[]
  };

  const content = json.choices[0].message.content;

  // ✅ Markdownのタイトル（"# タイトル"）を抽出
  const titleMatch = content.match(/^#\s+(.*)$/m);
  const title = titleMatch ? titleMatch[1] : "はちゅブログ記事";

  const imageAsset = await getUnusedImageAsset();

  return {
    title,
    slug: `auto-${uuid().slice(0, 8)}`,
    description: "初心者向けにレオパの温度管理ポイントを紹介します。",
    content: autoLinkCategories(content),
    image: imageAsset?.url || null,
    imageComment: imageAsset?.comment || null,
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
