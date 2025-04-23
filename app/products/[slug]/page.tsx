import { getProductBySlug, getRelatedProducts } from '@/lib/products'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/product/ProductDetailClient'

type Props = {
  params: { slug: string }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)
  if (!product) return notFound()

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.tags ?? [],
    product.slug
  )

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  )
}
