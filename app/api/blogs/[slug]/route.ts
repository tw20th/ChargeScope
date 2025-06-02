// app/api/blogs/[slug]/route.ts
import { dbAdmin } from '@/lib/firebaseAdmin'
import { NextResponse } from 'next/server'

type Props = {
  params: {
    slug: string
  }
}

export async function GET(_: Request, { params }: Props) {
  try {
    const snapshot = await dbAdmin
      .collection('blogs')
      .where('slug', '==', params.slug)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return NextResponse.json(
        { error: '記事が見つかりません' },
        { status: 404 }
      )
    }

    const blog = snapshot.docs[0].data()
    return NextResponse.json({ id: snapshot.docs[0].id, ...blog })
  } catch (err) {
    console.error('ブログ取得エラー:', err)
    return NextResponse.json({ error: '取得失敗' }, { status: 500 })
  }
}
