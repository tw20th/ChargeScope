"use strict";
// lib/posts.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedPosts = exports.getPostsByCategory = exports.getAllPosts = exports.getPaginatedPosts = exports.getPostsByTag = exports.getPostBySlug = void 0;
const firebase_1 = require("./firebase");
const firestore_1 = require("firebase/firestore");
const firestore_2 = require("firebase/firestore");
// 🔽 記事の詳細を取得（slug指定）
const getPostBySlug = async (slug) => {
    const docRef = (0, firestore_1.doc)(firebase_1.db, 'posts', slug);
    const snap = await (0, firestore_1.getDoc)(docRef);
    if (!snap.exists())
        return null;
    return snap.data();
};
exports.getPostBySlug = getPostBySlug;
const getPostsByTag = async (tag) => {
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'posts'), (0, firestore_2.where)('tags', 'array-contains', tag), (0, firestore_1.orderBy)('date', 'desc'));
    const snapshot = await (0, firestore_1.getDocs)(q);
    return snapshot.docs.map((doc) => doc.data());
};
exports.getPostsByTag = getPostsByTag;
// 🔽 ページネーション付きの記事一覧を取得
const getPaginatedPosts = async (pageSize, cursor, category = 'all', tag) => {
    const baseRef = (0, firestore_1.collection)(firebase_1.db, 'posts');
    const filters = [];
    if (category !== 'all') {
        filters.push((0, firestore_2.where)('category', '==', category));
    }
    if (tag) {
        filters.push((0, firestore_2.where)('tags', 'array-contains', tag));
    }
    let q = (0, firestore_1.query)(baseRef, ...filters, (0, firestore_1.orderBy)('date', 'desc'), (0, firestore_1.limit)(pageSize));
    if (cursor) {
        q = (0, firestore_1.query)(q, (0, firestore_1.startAfter)(cursor));
    }
    const snapshot = await (0, firestore_1.getDocs)(q);
    const posts = snapshot.docs.map((doc) => doc.data());
    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
    return { posts, lastVisible };
};
exports.getPaginatedPosts = getPaginatedPosts;
// 🔽 全記事の取得（generateStaticParamsなどで使用可能）
const getAllPosts = async () => {
    const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'posts'), (0, firestore_1.orderBy)('date', 'desc')));
    return snapshot.docs.map((doc) => doc.data());
};
exports.getAllPosts = getAllPosts;
const getPostsByCategory = async (categorySlug) => {
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'posts'), (0, firestore_2.where)('category', '==', categorySlug), (0, firestore_1.orderBy)('date', 'desc'));
    const snapshot = await (0, firestore_1.getDocs)(q);
    return snapshot.docs.map((doc) => doc.data());
};
exports.getPostsByCategory = getPostsByCategory;
const getRelatedPosts = async (category, tags = [], excludeSlug) => {
    if (!category && tags.length === 0)
        return [];
    const filters = [(0, firestore_2.where)('category', '==', category)];
    if (tags.length > 0) {
        filters.push((0, firestore_2.where)('tags', 'array-contains-any', tags));
    }
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'posts'), ...filters, (0, firestore_1.orderBy)('date', 'desc'), (0, firestore_1.limit)(6));
    const snapshot = await (0, firestore_1.getDocs)(q);
    console.log('✅ 取得件数（除外前）:', snapshot.docs.length);
    const related = snapshot.docs
        .map((doc) => doc.data())
        .filter((post) => post.slug !== excludeSlug);
    console.log('✅ 関連記事（除外後）:', related.length);
    console.log('📝 除外した slug:', excludeSlug);
    console.log('🧩 使用カテゴリ:', category);
    console.log('🏷️ 使用タグ:', tags);
    return related;
};
exports.getRelatedPosts = getRelatedPosts;
