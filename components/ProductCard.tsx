// components/ProductCard.tsx
import Image from 'next/image'

type Product = {
  name: string
  image: string
  price: string // ← number → string に変更
  link: string
  description: string
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="border rounded-xl p-4 flex gap-4 hover:shadow-md transition"
    >
      <div className="w-24 h-24 relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-sm text-green-600 font-bold">{product.price}</p>
      </div>
    </a>
  )
}
