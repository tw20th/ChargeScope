"use strict";
// lib/productCategories.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCategories = void 0;
exports.productCategories = [
    {
        slug: 'heater',
        name: 'ヒーター・保温器具',
        description: '爬虫類におすすめのヒーターや保温器具を比較できます。',
        products: [
            {
                id: 'product-1',
                slug: 'gex-heater-8w',
                title: 'ジェックス 保温ヒーター 8W',
                description: '初心者にも扱いやすいコンパクトタイプ。',
                price: '¥1,580',
                image: 'https://example.com/heater.jpg',
                link: 'https://example.com/shop/heater-8w',
                category: 'heater',
                date: '2025-04-01',
                tags: ['初心者', '保温'], // ✅ 追加！
            },
            {
                id: 'product-2',
                slug: 'sudo-panel-14w',
                title: 'スドー パネルヒーター 14W',
                description: 'ケージ下に設置しやすい薄型パネル。',
                price: '¥2,180',
                image: 'https://example.com/panel.jpg',
                link: 'https://example.com/shop/panel-14w',
                category: 'heater',
                date: '2025-04-02',
                tags: ['保温'],
            },
        ],
    },
];
