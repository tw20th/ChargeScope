// app/api/schools/route.ts
import { dbAdmin } from '@/lib/firebaseAdmin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const snapshot = await dbAdmin.collection('schools').get()
    const schools = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return NextResponse.json(schools)
  } catch (error) {
    console.error('Firestore取得エラー:', error) // ← ここ追加
    return NextResponse.json(
      { error: 'データ取得に失敗しました' },
      { status: 500 }
    )
  }
}
