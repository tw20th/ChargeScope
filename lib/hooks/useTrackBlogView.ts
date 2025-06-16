"use client";
import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

export const useTrackBlogView = (slug: string) => {
  useEffect(() => {
    const key = `viewed-${slug}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, "true");
      const ref = doc(db, "blogs", slug);
      updateDoc(ref, { views: increment(1) }).catch(console.error);
    }
  }, [slug]);
};
