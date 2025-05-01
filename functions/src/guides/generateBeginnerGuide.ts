import { Guide } from "../shared/types";
import { v4 as uuid } from "uuid";
import { callOpenAI } from "../shared/openaiClient";

export const generateBeginnerGuide = async (apiKey: string): Promise<Guide> => {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  const content = await callOpenAI(apiKey, {
    title: "【初心者必見】飼いやすいおすすめ爬虫類5選！初めてでも安心",
    theme: "初心者 爬虫類 おすすめ",
  });

  const titleMatch = content.match(/^#\s+(.*)$/m);
  const title = titleMatch ? titleMatch[1] : "初心者ガイド";

  return {
    slug: `guide-${uuid().slice(0, 8)}`,
    title,
    description: content.slice(0, 100),
    excerpt: content.slice(0, 60),
    date: dateStr,
    updatedAt: dateStr,
    createdAt: dateStr,
    content,
    author: "ここゆず",
    reviewed: true,
    status: "published",
    readingTime: Math.ceil(content.length / 400),
  };
};
