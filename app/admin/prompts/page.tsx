import { AnalysisTable } from "@/components/admin/AnalysisTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Blog } from "@/types/blog";

export default async function AdminPromptsPage() {
  const snapshot = await getDocs(collection(db, "blogs"));
  const blogs: Blog[] = snapshot.docs.map((doc) => ({
    slug: doc.id,
    ...doc.data(),
  })) as Blog[];
  const target = blogs[0];

  return (
    <main className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-xl font-bold mb-4">分析履歴一覧</h1>
      <h2 className="text-md font-semibold">{target.title}</h2>
      <AnalysisTable
        slug={target.slug}
        history={target.analysisHistory || []}
      />
    </main>
  );
}
