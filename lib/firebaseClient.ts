// lib/firebaseClient.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2vWQPTv8sjf9f2kJ9ZGJ-mz-m7Ra7nvM", // chargescope 用の値
  authDomain: "chargescope-3144e.firebaseapp.com",
  projectId: "chargescope-3144e",
  storageBucket: "chargescope-3144e.firebasestorage.app",
  messagingSenderId: "496466680056",
  appId: "1:496466680056:web:a296cff95237946dbe830d",
  measurementId: "G-GPGZE111XG",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
