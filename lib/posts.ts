// lib/posts.ts

import { db } from './firebase'
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { where } from 'firebase/firestore'

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  content: string
  image?: string
  imageComment?: string
  category?: string
  tags?: string[]
}

// 🔽 記事の詳細を取得（slug指定）
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const docRef = doc(db, 'posts', slug)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return snap.data() as Post
}
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const q = query(
    collection(db, 'posts'),
    where('tags', 'array-contains', tag),
    orderBy('date', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Post)
}

// 🔽 ページネーション付きの記事一覧を取得
export const getPaginatedPosts = async (
  pageSize: number,
  cursor?: QueryDocumentSnapshot<DocumentData> | null,
  category: string = 'all',
  tag?: string
) => {
  const baseRef = collection(db, 'posts')

  const filters = []

  if (category !== 'all') {
    filters.push(where('category', '==', category))
  }

  if (tag) {
    filters.push(where('tags', 'array-contains', tag))
  }

  let q = query(baseRef, ...filters, orderBy('date', 'desc'), limit(pageSize))

  if (cursor) {
    q = query(q, startAfter(cursor))
  }

  const snapshot = await getDocs(q)
  const posts = snapshot.docs.map((doc) => doc.data() as Post)
  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null

  return { posts, lastVisible }
}

// 🔽 全記事の取得（generateStaticParamsなどで使用可能）
export const getAllPosts = async (): Promise<Post[]> => {
  const snapshot = await getDocs(
    query(collection(db, 'posts'), orderBy('date', 'desc'))
  )
  return snapshot.docs.map((doc) => doc.data() as Post)
}

export const getPostsByCategory = async (
  categorySlug: string
): Promise<Post[]> => {
  const q = query(
    collection(db, 'posts'),
    where('category', '==', categorySlug),
    orderBy('date', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Post)
}

export const getRelatedPosts = async (
  category: string,
  tags: string[] = [],
  excludeSlug: string
): Promise<Post[]> => {
  if (!category && tags.length === 0) return []

  const filters = [where('category', '==', category)]

  if (tags.length > 0) {
    filters.push(where('tags', 'array-contains-any', tags))
  }

  const q = query(
    collection(db, 'posts'),
    ...filters,
    orderBy('date', 'desc'),
    limit(6)
  )

  const snapshot = await getDocs(q)

  console.log('✅ 取得件数（除外前）:', snapshot.docs.length)

  const related = snapshot.docs
    .map((doc) => doc.data() as Post)
    .filter((post) => post.slug !== excludeSlug)

  console.log('✅ 関連記事（除外後）:', related.length)
  console.log('📝 除外した slug:', excludeSlug)
  console.log('🧩 使用カテゴリ:', category)
  console.log('🏷️ 使用タグ:', tags)

  return related
}
