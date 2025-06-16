// functions/src/lib/firebase.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

dotenv.config();

if (!getApps().length) {
  const decodedKey = Buffer.from(process.env.FB_PRIVATE_KEY_BASE64!, "base64").toString("utf8");
  const serviceAccount = JSON.parse(decodedKey);
  initializeApp({ credential: cert(serviceAccount) });
}

export const db = getFirestore();
