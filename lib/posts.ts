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
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore'

export type Post = {
  slug: string
  title: string
  description: string
  excerpt?: string
  date: string
  updatedAt?: string | null
  createdAt?: string | null
  content: string
  image?: string
  imageComment?: string
  category?: string
  categoryDisplayName?: string
  tags?: string[]
  author?: string
  reviewed?: boolean
  relatedIds?: string[]
  readingTime?: number
  status?: 'draft' | 'published'
  metaKeywords?: string[]
  lang?: 'ja' | 'en'
  views?: number
  isFeatured?: boolean
}

// 🔧 Firestore Timestampを文字列に変換する共通関数
const formatPost = (doc: DocumentData): Post => {
  const data = doc.data()
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    excerpt: data.excerpt,
    date: data.date,
    updatedAt: data.updatedAt?.toDate().toISOString() ?? null,
    createdAt: data.createdAt?.toDate().toISOString() ?? null,
    content: data.content,
    image: data.image,
    imageComment: data.imageComment,
    category: data.category,
    categoryDisplayName: data.categoryDisplayName,
    tags: data.tags,
    author: data.author,
    reviewed: data.reviewed,
    relatedIds: data.relatedIds,
    readingTime: data.readingTime,
    status: data.status,
    metaKeywords: data.metaKeywords,
    lang: data.lang,
    views: data.views,
    isFeatured: data.isFeatured,
  }
}

// 🔽 記事の詳細を取得
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const docRef = doc(db, 'posts', slug)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return formatPost(snap)
}

// 🔽 タグで記事取得
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const q = query(
    collection(db, 'posts'),
    where('tags', 'array-contains', tag),
    orderBy('date', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(formatPost)
}

// 🔽 ページネーション付き取得
export const getPaginatedPosts = async (
  pageSize: number,
  cursor?: QueryDocumentSnapshot<DocumentData> | null,
  category: string = 'all',
  tag?: string,
  sortType: 'new' | 'popular' | 'featured' = 'new'
) => {
  const baseRef = collection(db, 'posts')
  const filters = []

  if (category !== 'all') {
    filters.push(where('category', '==', category))
  }

  if (tag) {
    filters.push(where('tags', 'array-contains', tag))
  }

  let q = query(baseRef, ...filters)

  if (sortType === 'popular') {
    q = query(q, orderBy('views', 'desc'))
  } else if (sortType === 'featured') {
    filters.push(where('isFeatured', '==', true))
    q = query(baseRef, ...filters, orderBy('date', 'desc'))
  } else {
    q = query(q, orderBy('date', 'desc'))
  }

  if (cursor) {
    q = query(q, startAfter(cursor))
  }

  const snapshot = await getDocs(q)
  const posts = snapshot.docs.map(formatPost)
  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null

  return { posts, lastVisible }
}

// 🔽 全記事取得
export const getAllPosts = async (): Promise<Post[]> => {
  const snapshot = await getDocs(
    query(collection(db, 'posts'), orderBy('date', 'desc'))
  )
  return snapshot.docs.map(formatPost)
}

// 🔽 カテゴリ別
export const getPostsByCategory = async (
  categorySlug: string
): Promise<Post[]> => {
  const q = query(
    collection(db, 'posts'),
    where('category', '==', categorySlug),
    orderBy('date', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(formatPost)
}

// 🔽 関連記事
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

  return snapshot.docs
    .map(formatPost)
    .filter((post) => post.slug !== excludeSlug)
}
