// app/api/blogs/route.ts
import { dbAdmin } from '@/lib/firebaseAdmin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const snapshot = await dbAdmin.collection('blogs').get()
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('ブログ一覧取得エラー:', error)
    return NextResponse.json({ error: '取得失敗' }, { status: 500 })
  }
}
