// lib/firebase-admin.ts
import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const decodedKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY_BASE64!,
  'base64'
).toString('utf-8')

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedKey,
}

export const adminApp = !getApps().length
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApp()

export const adminDb = getFirestore(adminApp)
