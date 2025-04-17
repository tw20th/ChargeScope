import { db } from '../firebase'
import {
  collection,
  query,
  orderBy,
  startAfter,
  where,
  limit,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import type { Product } from '../products' // ✅ Product 型をインポート

export async function getPaginatedProducts(
  limitCount: number,
  cursor: QueryDocumentSnapshot<DocumentData> | null,
  displayCategory: string,
  tag?: string
): Promise<{
  products: Product[]
  lastVisible: QueryDocumentSnapshot<DocumentData> | null
}> {
  const constraints = [
    orderBy('date', 'desc'),
    ...(displayCategory !== 'all'
      ? [where('displayCategory', '==', displayCategory)]
      : []),
    ...(tag ? [where('tags', 'array-contains', tag)] : []),
    ...(cursor ? [startAfter(cursor)] : []),
    limit(limitCount),
  ]

  const baseQuery = query(collection(db, 'products'), ...constraints)

  const snapshot = await getDocs(baseQuery)
  const products = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      slug: data.slug,
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
      link: data.link,
      category: data.category,
      displayCategory: data.displayCategory ?? null,
      tags: data.tags ?? [],
      date: data.date,
    } as Product
  })

  return {
    products,
    lastVisible: snapshot.docs[snapshot.docs.length - 1] ?? null,
  }
}
