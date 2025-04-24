import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) {
    return NextResponse.redirect('https://www.rakuten.co.jp') // Fallback
  }

  try {
    const ref = adminDb.doc(`products/${slug}`)
    const snapshot = await ref.get()

    if (!snapshot.exists) {
      return NextResponse.redirect('https://www.rakuten.co.jp')
    }

    const product = snapshot.data()

    // ✅ clickCount を +1
    await ref.update({
      clickCount: FieldValue.increment(1),
    })

    // ✅ rakutenLink にリダイレクト
    const url = product?.rakutenLink || 'https://www.rakuten.co.jp'
    return NextResponse.redirect(url)
  } catch (error) {
    console.error('clickCount update error:', error)
    return NextResponse.redirect('https://www.rakuten.co.jp')
  }
}
