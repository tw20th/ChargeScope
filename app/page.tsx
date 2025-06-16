// app/page.tsx

import { ProductList } from "@/components/sections/ProductList";
import { BlogList } from "@/components/sections/BlogList";
import { FeatureKeywordList } from "@/components/sections/FeatureKeywordList";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";
import { Blog } from "@/types/blog";

export default async function HomePage() {
  const productsSnapshot = await getDocs(collection(db, "monitoredItems"));
  const blogsSnapshot = await getDocs(collection(db, "blogs"));

  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];

  const blogs = blogsSnapshot.docs.map((doc) => ({
    slug: doc.id,
    ...doc.data(),
  })) as Blog[];

  return (
    <div className="space-y-12">
      <FeatureKeywordList keywords={["軽量", "急速充電", "飛行機OK"]} />
      <ProductList title="注目のモバイルバッテリー" products={products} />
      <BlogList title="最新の記事" blogs={blogs} />
    </div>
  );
}
