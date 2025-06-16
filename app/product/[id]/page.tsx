// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import { fetchProductById } from "@/lib/firestore"; // 仮想ファイルとして用意
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { PriceChart } from "@/components/product/PriceChart";

type Props = { params: { id: string } };

export default async function ProductDetailPage({ params }: Props) {
  const id = params.id;
  const product: Product | null = await fetchProductById(id);
  if (!product) return notFound();

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="mx-auto max-h-64 object-contain"
      />

      <h1 className="text-2xl font-bold">{product.productName}</h1>
      <PriceChart priceHistory={product.priceHistory || []} />

      <div className="flex flex-wrap gap-2">
        {product.tags?.map((tag) => (
          <span key={tag} className="border rounded px-2 py-1 text-xs">
            {tag}
          </span>
        ))}
      </div>

      <RelatedProducts tags={product.tags || []} excludeId={product.id} />
    </div>
  );
}
