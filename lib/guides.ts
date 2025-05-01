// lib/guides.ts

import { db } from './firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  QueryDocumentSnapshot,
  startAfter,
  limit,
  DocumentData,
} from 'firebase/firestore'

export type Guide = {
  slug: string
  title: string
  description: string
  excerpt: string
  date: string
  updatedAt?: string
  createdAt?: string
  content: string
  tags?: string[]
  author?: string
  reviewed?: boolean
  readingTime?: number
  status?: 'draft' | 'published'
}

// 🔧 フォーマット関数
const formatGuide = (doc: DocumentData): Guide => {
  const data = doc.data()
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    excerpt: data.excerpt,
    date: data.date,
    updatedAt:
      typeof data.updatedAt === 'string'
        ? data.updatedAt
        : data.updatedAt?.toDate().toISOString() ?? null,
    createdAt:
      typeof data.createdAt === 'string'
        ? data.createdAt
        : data.createdAt?.toDate().toISOString() ?? null,
    content: data.content,
    tags: data.tags,
    author: data.author,
    reviewed: data.reviewed,
    readingTime: data.readingTime,
    status: data.status,
  }
}

// 🔽 すべてのガイドを取得
export const getAllGuides = async (): Promise<Guide[]> => {
  const snapshot = await getDocs(
    query(collection(db, 'guides'), orderBy('date', 'desc'))
  )
  return snapshot.docs.map(formatGuide)
}

// 🔽 スラッグでガイドを取得
export const getGuideBySlug = async (slug: string): Promise<Guide | null> => {
  const ref = doc(db, 'guides', slug)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return formatGuide(snap)
}

// 🔽 タグでフィルター
export const getGuidesByTag = async (tag: string): Promise<Guide[]> => {
  const q = query(
    collection(db, 'guides'),
    where('tags', 'array-contains', tag),
    orderBy('date', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(formatGuide)
}

// 🔽 ページネーション対応
export const getPaginatedGuides = async (
  pageSize: number,
  cursor?: QueryDocumentSnapshot<DocumentData> | null
) => {
  let q = query(collection(db, 'guides'), orderBy('date', 'desc'))

  if (cursor) {
    q = query(q, startAfter(cursor))
  }

  q = query(q, limit(pageSize))

  const snapshot = await getDocs(q)
  const guides = snapshot.docs.map(formatGuide)
  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null

  return { guides, lastVisible }
}
