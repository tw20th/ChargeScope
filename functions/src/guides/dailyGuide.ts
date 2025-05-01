import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { generateBeginnerGuide } from "./generateBeginnerGuide";

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

export const dailyGuide = functions
  .runWith({ secrets: ["OPENAI_API_KEY"] })
  .https.onRequest(async (req, res) => {
    try {
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
      if (!OPENAI_API_KEY) {
        throw new Error("APIキーが設定されていません");
      }

      const guide = await generateBeginnerGuide(OPENAI_API_KEY);
      await db.collection("guides").doc(guide.slug).set(guide);

      console.log(`✅ ガイド投稿完了: ${guide.slug}`);
      res.status(200).send(`✅ ガイド投稿完了: ${guide.slug}`);
    } catch (error) {
      console.error("❗ ガイド投稿エラー:", error);
      res.status(500).send("❗ ガイド投稿エラー");
    }
  });
