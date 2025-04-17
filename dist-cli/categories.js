"use strict";
// lib/categories.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const firebase_1 = require("./firebase");
const firestore_1 = require("firebase/firestore");
// 🔽 Firestore からカテゴリ一覧を取得
const getCategories = async () => {
    const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'categories'));
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
exports.getCategories = getCategories;
