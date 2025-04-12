// hooks/useAdmin.ts
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, getIdTokenResult } from 'firebase/auth'
import { app } from '@/lib/firebase' // すでに firebase.ts で初期化してるならそれを使う

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth(app)

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await getIdTokenResult(user)
        const adminClaim = idTokenResult.claims.admin
        setIsAdmin(!!adminClaim)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { isAdmin, loading }
}
