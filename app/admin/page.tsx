'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import ReactMarkdown from 'react-markdown'

// ✨ SSR回避のために dynamic import
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})
import 'react-markdown-editor-lite/lib/index.css'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [markdown, setMarkdown] = useState('')

  const handleSave = async () => {
    if (!slug) return alert('slug を入力してください')

    await setDoc(doc(db, 'posts', slug), {
      slug,
      title,
      description,
      image,
      date: new Date().toISOString().split('T')[0],
      content: markdown,
    })

    alert('投稿が保存されました！')
    setMarkdown('')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">ブログ投稿フォーム</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="slug（例：leopard-gecko-care）"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="説明（description）"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="アイキャッチ画像URL（任意）"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <div className="border rounded">
        <MdEditor
          style={{ height: '400px' }}
          value={markdown}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>} // ← 修正！
          onChange={({ text }) => setMarkdown(text)}
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        投稿する
      </button>
    </div>
  )
}
