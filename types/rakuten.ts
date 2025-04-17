// types/rakuten.ts

export type RakutenItem = {
  itemCode: string
  itemName: string
  itemCaption: string
  itemPrice: number
  itemUrl: string
  genreId?: string
  mediumImageUrls: { imageUrl: string }[]
}

export type RakutenAPIResponse = {
  Items: { Item: RakutenItem }[]
}
