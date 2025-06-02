// functions/src/utils/postBlog.ts
import { db } from "../firebaseAdmin";

type BlogParams = {
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  productId: string;
};

export async function postBlog(params: BlogParams) {
  const result = await db.collection("blogs").add({
    ...params,
    createdAt: new Date().toISOString(),
    views: 0
  });

  return result;
}
