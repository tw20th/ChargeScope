// lib/posts.ts
import { db } from './firebase'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  content?: string
  image?: string
}

export const getAllPosts = async (): Promise<Post[]> => {
  const postsCol = collection(db, 'posts')
  const q = query(postsCol, orderBy('date', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => doc.data() as Post)
}

export const getPostBySlug = async (
  slug: string
): Promise<Post | undefined> => {
  const ref = doc(db, 'posts', slug)
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data() as Post) : undefined
}
