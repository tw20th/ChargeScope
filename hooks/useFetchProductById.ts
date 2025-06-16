// lib/hooks/useFetchProductById.ts
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useFetchProductById = (id: string) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(db, "monitoredItems", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProduct({ id, ...docSnap.data() });
      setLoading(false);
    };
    if (id) fetch();
  }, [id]);

  return { product, loading };
};
