// lib/rakuten.js
import fetch from 'node-fetch'
import { classifyProduct } from './classifier/classifyProduct.js'

// 🔥 ペットジャンルID（ペット・ペットグッズ）
const PET_GENRE_ID = '101213'

export async function fetchRakutenItems(keyword) {
  const appId = process.env.RAKUTEN_API_KEY

  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&format=json&genreId=${PET_GENRE_ID}&keyword=${encodeURIComponent(
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
  const classified = classifyProduct(item)

  if (!classified) {
    return null
  }

  const { category, displayCategory, tags } = classified
  const now = new Date()

  const amazonLink = `https://www.amazon.co.jp/s?k=${encodeURIComponent(
    item.itemName
  )}`
  const rakutenAffiliateId = '444dd366.3063ed7d.444dd367.61b93d9b'
  const rakutenLink = item.itemUrl.includes('?')
    ? `${item.itemUrl}&scid=${rakutenAffiliateId}`
    : `${item.itemUrl}?scid=${rakutenAffiliateId}`

  return {
    id: item.itemCode,
    slug: item.itemCode.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase(),
    title: item.itemName,
    description: item.itemCaption || '',
    price: item.itemPrice,
    image: item.mediumImageUrls?.[0]?.imageUrl || '',
    link: item.itemUrl,
    rakutenLink,
    amazonLink,
    yahooLink: '',
    category,
    displayCategory, // 🔥 これも返しておこう！（今後使える！）
    tags: [...new Set(tags)],
    clickCount: 0,
    viewCount: 0,
    date: now.toISOString(),
    createdAt: now,
    updatedAt: now,
  }
}
