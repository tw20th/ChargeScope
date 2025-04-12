// hooks/usePosts.ts
'use client'

import { useEffect, useState } from 'react'
import { getAllPosts, Post } from '@/lib/posts'

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllPosts()
      setPosts(data)
    }
    fetch()
  }, [])

  return posts
}
