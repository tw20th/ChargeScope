// /lib/rakuten.js

import fetch from 'node-fetch'
import { classifyProduct } from './classifier/classifyProduct.js'

export async function fetchRakutenItems(keyword) {
  const appId = process.env.RAKUTEN_API_KEY
  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&format=json&keyword=${encodeURIComponent(
    keyword
  )}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('楽天APIの取得に失敗しました')
  }

  const data = await res.json()
  return data.Items.map((itemWrapper) => itemWrapper.Item)
}

export function mapRakutenItemToProduct(item) {
  // ✅ ここで分類を行う
  const { category, tags } = classifyProduct(item)

  const product = {
    id: item.itemCode,
    slug: item.itemCode.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase(),
    title: item.itemName,
    description: item.itemCaption || '',
    price: item.itemPrice,
    image: item.mediumImageUrls?.[0]?.imageUrl || '',
    link: item.itemUrl,
    category,
    tags,
    date: new Date().toISOString(),
  }

  // ✅ デバッグ確認用
  console.log('📦 登録内容:', product)

  return product
}
