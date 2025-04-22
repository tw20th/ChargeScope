"use strict";
// lib/firebase.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = exports.firebaseConfig = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
exports.firebaseConfig = {
    // ✅ ← export を追加
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
exports.app = (0, app_1.initializeApp)(exports.firebaseConfig);
exports.db = (0, firestore_1.getFirestore)(exports.app);
