import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useRelatedProducts = (tags: string[], excludeId: string) => {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, "monitoredItems"));
      const all = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      const filtered = all.filter(
        (p) => p.id !== excludeId && p.tags.some((t) => tags.includes(t))
      );

      setRelated(filtered.slice(0, 6));
      setLoading(false);
    };

    fetch();
  }, [tags, excludeId]);

  return { related, loading };
};
