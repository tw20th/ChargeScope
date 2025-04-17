"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRakutenItemToProduct = exports.fetchRakutenItems = void 0;
const appId = process.env.RAKUTEN_API_KEY;
const fetchRakutenItems = async (keyword) => {
    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&format=json&keyword=${encodeURIComponent(keyword)}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('楽天APIの取得に失敗しました');
    }
    const data = await res.json();
    return data.Items.map((itemWrapper) => itemWrapper.Item);
};
exports.fetchRakutenItems = fetchRakutenItems;
const mapRakutenItemToProduct = (item) => ({
    id: item.itemCode,
    slug: item.itemCode.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase(),
    title: item.itemName,
    description: item.itemCaption || '',
    price: item.itemPrice,
    image: item.mediumImageUrls?.[0]?.imageUrl || '',
    link: item.itemUrl,
    category: item.genreId || 'other',
    date: new Date().toISOString(),
    tags: [],
});
exports.mapRakutenItemToProduct = mapRakutenItemToProduct;
