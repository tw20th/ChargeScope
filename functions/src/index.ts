import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import {v4 as uuid} from "uuid";
import {generatePromptByWeekday} from "../utils/generatePromptByWeekday";
import {autoLinkCategories} from "../utils/autoLinkCategories";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {classifyPost} = require("../lib/classifier/classifyPost.js");

admin.initializeApp();

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

  await randomDoc.ref.update({used: true});

  return {
    url: data.url,
    comment: data.comment,
  };
};

// ✅ Markdown本文から冒頭の文をdescriptionとして抽出
const extractDescriptionFromContent = (
  content: string,
  maxLength = 100
): string => {
  const withoutTitle = content.replace(/^#\s+.*$/m, "").trim();
  const sentences = withoutTitle.split(/。|\n/).filter(Boolean);
  const description = sentences.slice(0, 2).join("。") + "。";
  return description.length > maxLength ?
    description.slice(0, maxLength) + "..." :
    description;
};

const generateExcerpt = (content: string, maxLength = 60): string => {
  const withoutTitle = content.replace(/^#\s+.*$/m, "").trim();
  const firstSentence = withoutTitle.split(/。|\n/).filter(Boolean)[0] || "";
  return firstSentence.length > maxLength ?
    firstSentence.slice(0, maxLength) + "..." :
    firstSentence + "。";
};

const estimateReadingTime = (text: string): number => {
  const words = text.replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(words / 400));
};

const generatePost = async (apiKey: string) => {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
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
  const titleMatch = content.match(/^#\s+(.*)$/m);
  const title = titleMatch ? titleMatch[1] : "はちゅブログ記事";

  const description = extractDescriptionFromContent(content);
  const excerpt = generateExcerpt(content);
  const readingTime = estimateReadingTime(content);
  const {tags, category} = classifyPost(content);
  const imageAsset = await getUnusedImageAsset();

  // ✅ 商品をカテゴリで取得
  const productSnap = await db
    .collection("products")
    .where("category", "==", category)
    .limit(2)
    .get();

  const relatedIds = productSnap.docs.map((doc) => doc.id);

  const signature = `
---

この記事を書いた人 🦎  
**ゆず（爬虫類ブログ歴8年）**  
「爬虫類との暮らしをもっと楽しく」をテーマに、毎日お届け中！

💬 ご質問・リクエストがあれば、気軽にコメントくださいね。
  `.trim();

  return {
    slug: `auto-${uuid().slice(0, 8)}`,
    title,
    description,
    excerpt,
    date: dateStr,
    updatedAt: dateStr,
    content: `${autoLinkCategories(content)}\n\n${signature}`,
    image: imageAsset?.url || null,
    imageComment: imageAsset?.comment || null,
    category,
    tags,
    relatedIds,
    author: "ゆず",
    reviewed: true,
    readingTime,
    status: "published",
    lang: "ja",
    views: 0,
    isFeatured: false,
  };
};

// ✅ 毎日22時に自動投稿する Cloud Function
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
