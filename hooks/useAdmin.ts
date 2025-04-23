import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, getIdTokenResult } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebase' // ✅ これを使う！

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth(firebaseApp) // ✅ 修正！

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
