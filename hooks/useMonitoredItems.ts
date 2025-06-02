import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { MonitoredItem } from "@/types/item";

export const useMonitoredItems = () => {
  const [items, setItems] = useState<MonitoredItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, "monitoredItems"));
      const fetchedItems: MonitoredItem[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as MonitoredItem),
        id: doc.id,
      }));
      setItems(fetchedItems);
      setLoading(false);
    };

    fetchItems();
  }, []);

  return { items, loading };
};
