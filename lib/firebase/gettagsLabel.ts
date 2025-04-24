import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const getTagLabel = async (id: string): Promise<string> => {
  const ref = doc(db, 'tags', id)
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data().name as string) : id
}
