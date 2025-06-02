import {
  initializeApp,
  cert,
  getApps,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  project_id: process.env.FB_PROJECT_ID,
  client_email: process.env.FB_CLIENT_EMAIL,
  private_key: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, "\n"),
} as ServiceAccount;

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const dbAdmin = getFirestore();
