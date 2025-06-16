import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "@/types/product";

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const ref = doc(db, "monitoredItems", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id, ...snapshot.data() } as Product;
};
