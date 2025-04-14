// functions/src/utils/autoLinkCategories.ts
import {categoryLinkMap} from "./categoryLinkMap";

export function autoLinkCategories(content: string): string {
  let linkedContent = content;

  Object.entries(categoryLinkMap).forEach(([keyword, url]) => {
    const linkTag = `[${keyword}](${url})`;

    // すでにリンクされていない場合のみ置き換え
    const regex = new RegExp(`(?<!\\[)(${keyword})(?!\\])`, "g");
    linkedContent = linkedContent.replace(regex, linkTag);
  });

  return linkedContent;
}
