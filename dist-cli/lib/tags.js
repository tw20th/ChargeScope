"use strict";
// lib/tags.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = void 0;
const firebase_1 = require("./firebase");
const firestore_1 = require("firebase/firestore");
const getTags = async () => {
    const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'tags'));
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
exports.getTags = getTags;
