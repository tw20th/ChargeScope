// lib/tags.ts

import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

export type Tag = {
  id: string
  name: string
  type: 'product' | 'blog' | 'both'
}

export const getTags = async (): Promise<Tag[]> => {
  const snapshot = await getDocs(collection(db, 'tags'))
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Tag, 'id'>),
  }))
}
