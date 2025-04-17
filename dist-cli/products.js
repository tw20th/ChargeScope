"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedProducts = exports.getProductBySlug = exports.getAllProductTags = exports.getAllProductCategories = exports.getAllProducts = exports.getProductsByTag = exports.getProductsByCategory = exports.getPaginatedProducts = void 0;
const firebase_1 = require("./firebase");
const firestore_1 = require("firebase/firestore");
// 🔽 商品一覧（ページネーション対応）
const getPaginatedProducts = async (pageSize, cursor, category = 'all', tag) => {
    const baseRef = (0, firestore_1.collection)(firebase_1.db, 'products');
    const filters = [];
    if (category !== 'all') {
        filters.push((0, firestore_1.where)('category', '==', category));
    }
    if (tag) {
        filters.push((0, firestore_1.where)('tags', 'array-contains', tag));
    }
    let q = (0, firestore_1.query)(baseRef, ...filters, (0, firestore_1.orderBy)('date', 'desc'), (0, firestore_1.limit)(pageSize));
    if (cursor) {
        q = (0, firestore_1.query)(q, (0, firestore_1.startAfter)(cursor));
    }
    const snapshot = await (0, firestore_1.getDocs)(q);
    const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
    return { products, lastVisible };
};
exports.getPaginatedProducts = getPaginatedProducts;
// 🔽 カテゴリごとの商品取得
const getProductsByCategory = async (categorySlug) => {
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'products'), (0, firestore_1.where)('category', '==', categorySlug), (0, firestore_1.orderBy)('date', 'desc'));
    const snapshot = await (0, firestore_1.getDocs)(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
exports.getProductsByCategory = getProductsByCategory;
// 🔽 タグによる商品取得
const getProductsByTag = async (tag) => {
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'products'), (0, firestore_1.where)('tags', 'array-contains', tag), (0, firestore_1.orderBy)('date', 'desc'));
    const snapshot = await (0, firestore_1.getDocs)(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
exports.getProductsByTag = getProductsByTag;
// 🔽 全商品取得（オプション：generateStaticParamsなどに）
const getAllProducts = async () => {
    const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'products'), (0, firestore_1.orderBy)('date', 'desc')));
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
exports.getAllProducts = getAllProducts;
const getAllProductCategories = async () => {
    const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'products'));
    const categories = new Set();
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.category) {
            categories.add(data.category);
        }
    });
    return Array.from(categories);
};
exports.getAllProductCategories = getAllProductCategories;
const getAllProductTags = async () => {
    const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'products'));
    const tags = new Set();
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (Array.isArray(data.tags)) {
            data.tags.forEach((tag) => tags.add(tag));
        }
    });
    return Array.from(tags);
};
exports.getAllProductTags = getAllProductTags;
const getProductBySlug = async (slug) => {
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'products'), (0, firestore_1.where)('slug', '==', slug), (0, firestore_1.limit)(1));
    const snapshot = await (0, firestore_1.getDocs)(q);
    if (snapshot.empty)
        return null;
    const doc = snapshot.docs[0];
    return {
        id: doc.id,
        ...doc.data(),
    };
};
exports.getProductBySlug = getProductBySlug;
const getRelatedProducts = async (category, tags, excludeSlug) => {
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'products'), (0, firestore_1.where)('category', '==', category), (0, firestore_1.where)('tags', 'array-contains-any', tags), (0, firestore_1.orderBy)('date', 'desc'), (0, firestore_1.limit)(6));
    const snapshot = await (0, firestore_1.getDocs)(q);
    const all = snapshot.docs.map((doc) => doc.data());
    // 表示中の商品は除外
    return all.filter((p) => p.slug !== excludeSlug);
};
exports.getRelatedProducts = getRelatedProducts;
