// components/product/RelatedProducts.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'

type Props = {
  products: Product[]
}

export const RelatedProducts = ({ products }: Props) => {
  if (!products.length) return null

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">関連商品</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="block border p-2 rounded hover:shadow-sm"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={200}
              className="object-contain w-full h-auto rounded mb-2"
            />
            <p className="text-sm">{product.title}</p>
            <p className="text-blue-600 font-semibold text-sm">
              ¥{product.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
