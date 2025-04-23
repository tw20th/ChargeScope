// lib/firebase-admin.ts

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../serviceAccountKey.json'

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any),
  })
}

export const db = getFirestore()
