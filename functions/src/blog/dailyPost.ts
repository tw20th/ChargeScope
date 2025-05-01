// functions/src/blog/dailyPost.ts

import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { v4 as uuid } from "uuid";
import { generatePromptByWeekday } from "../utils/generatePromptByWeekday";
import { autoLinkCategories } from "../utils/autoLinkCategories";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { classifyPost } = require("../../lib/classifier/classifyPost.js");

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

const getUnusedImageAsset = async () => {
  const snapshot = await db
    .collection("imageAssets")
    .where("used", "==", false)
    .get();
  const docs = snapshot.docs;
  if (docs.length === 0) return null;

  const randomDoc = docs[Math.floor(Math.random() * docs.length)];
  const data = randomDoc.data();

  await randomDoc.ref.update({ used: true });

  return {
    url: data.url,
    comment: data.comment,
  };
};

const extractDescriptionFromContent = (
  content: string,
  maxLength = 100
): string => {
  const withoutTitle = content.replace(/^#\s+.*$/m, "").trim();
  const sentences = withoutTitle.split(/。|\n/).filter(Boolean);
  const description = sentences.slice(0, 2).join("。") + "。";
  return description.length > maxLength
    ? description.slice(0, maxLength) + "..."
    : description;
};

const generateExcerpt = (content: string, maxLength = 60): string => {
  const withoutTitle = content.replace(/^#\s+.*$/m, "").trim();
  const firstSentence = withoutTitle.split(/。|\n/).filter(Boolean)[0] || "";
  return firstSentence.length > maxLength
    ? firstSentence.slice(0, maxLength) + "..."
    : firstSentence + "。";
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
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
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
      - Markdown形式で、タイトル（#）、セクション見出し（##）、まとめ（#）を必ず使う
      - 記事全体の文字数目安は1000〜1500文字程度
      
      【記事の構成テンプレート】
      1. はじめに
         - 親しみやすい挨拶
         - 自分の体験を交えて、読者の悩みに共感する
         - この記事でわかること（ゴール）を簡単に伝える
      
      2. テーマの基本情報
         - 初心者にもわかるようにやさしく解説する
      
      3. 具体的な方法・手順
         - 「結論 → 理由 → 具体例」の順でわかりやすく説明する
         - 便利な商品や道具を自然な流れで紹介する（押し売り禁止）
      
      4. 注意点・失敗例
         - 自分の経験を交えながら、失敗を防ぐアドバイスをする
      
      5. まとめ
         - 読者を肯定し、励ますメッセージを添える
         - 「ここまで読んだあなたならきっと大丈夫！」と応援する一言を入れる
      
      【キーワード意識について】
      - メインテーマに関連するキーワードを2〜3個考え、自然に本文中に取り入れる
      - キーワードは不自然な詰め込みを避け、読みやすさを最優先する
      - タイトル、h2見出し、本文にバランスよく自然に散りばめる
      
      【次に誘導する記事提案】
      - この記事を読んだ読者が次に知りたくなりそうなテーマを2〜3個考える
      - そのテーマに沿った「次に読むおすすめ記事タイトル」を提案する
      - 本文の最後に「次に読むならこれ！」として自然な流れでリンク案内を入れる
      
      【禁止事項】
      - 押し売り表現
      - 無理なキーワード詰め込み
      - 不自然な表現、過剰な誇張
      
      これらのルールに沿って、次に提示されるテーマについて、自然体でやさしいブログ記事を作成してください。
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
    choices: { message: { content: string } }[];
  };

  const content = json.choices[0].message.content;
  const titleMatch = content.match(/^#\s+(.*)$/m);
  const title = titleMatch ? titleMatch[1] : "はちゅブログ記事";

  const description = extractDescriptionFromContent(content);
  const excerpt = generateExcerpt(content);
  const readingTime = estimateReadingTime(content);

  // ここを安全に書き換えました！
  const result = classifyPost(content);
  const tags = result?.tags ?? [];
  const category = result?.category ?? "uncategorized";

  const imageAsset = await getUnusedImageAsset();

  const productSnap = await db
    .collection("products")
    .where("category", "==", category)
    .limit(2)
    .get();
  const relatedIds = productSnap.docs.map((doc) => doc.id);

  const signature = `
---

この記事を書いた人 🦎  
**爬虫類が大好きな愛好家「ここゆず」**  
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

export const dailyPost = functions
  .runWith({ secrets: ["OPENAI_API_KEY"] })
  .https.onRequest(async (req, res) => {
    try {
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
      if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");

      const post = await generatePost(OPENAI_API_KEY);
      await db.collection("posts").doc(post.slug).set(post);

      console.log(`✅ 自動投稿完了: ${post.slug}`);
      res.status(200).send(`✅ 自動投稿完了: ${post.slug}`);
    } catch (error) {
      console.error("❗自動投稿エラー:", error);
      res.status(500).send("❗ 自動投稿エラー");
    }
  });
