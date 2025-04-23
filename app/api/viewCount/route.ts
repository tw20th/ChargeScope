// app/api/viewCount/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: Request) {
  const { slug } = await req.json()
  if (!slug)
    return NextResponse.json({ error: 'No slug provided' }, { status: 400 })

  try {
    const ref = db.doc(`products/${slug}`)
    await ref.update({
      viewCount: FieldValue.increment(1),
    })
    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Error updating viewCount:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
