import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { Blog } from "@/types/blog";
import { collection, getDocs } from "firebase/firestore";

export const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, "blogs"));
      const data = snapshot.docs.map((doc) => ({
        slug: doc.id,
        ...doc.data(),
      })) as Blog[];
      setBlogs(data);
    };

    fetch();
  }, []);

  return blogs;
};
