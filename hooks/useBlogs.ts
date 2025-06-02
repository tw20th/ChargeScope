import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { Blog } from "@/types/blog";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const snapshot = await getDocs(collection(db, "blogs"));
      const result: Blog[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Blog),
        id: doc.id,
      }));
      setBlogs(result);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return { blogs, loading };
};
