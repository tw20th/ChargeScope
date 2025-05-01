// components/product/CompareProductCard.tsx

'use client'

import { Product } from '@/lib/products'

type Props = {
  product: Product
}

export const CompareProductCard = ({ product }: Props) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col space-y-2 hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-2"
      />
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-green-600 font-semibold text-xl">
        ¥{product.price.toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">
        {product.description.length > 100
          ? product.description.slice(0, 100) + '...'
          : product.description}
      </p>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 transition"
      >
        購入する
      </a>
    </div>
  )
}
