import { ProductCard } from "@/components/cards/ProductCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { Pagination } from "@/components/ui/Pagination";
import { type MonitoredItem } from "@/types/monitoredItem"; // ✅ 型をMonitoredItemに統一

type Props = {
  products: MonitoredItem[]; // ✅ 修正
  isLoading?: boolean;
};

export const ProductList = ({ products, isLoading }: Props) => {
  return (
    <section className="bg-background py-12 px-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} aspect="square" />
            ))
          : products.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}{" "}
        {/* ✅ keyもidに */}
      </div>
      {!isLoading && (
        <div className="mt-8 flex justify-center">
          <Pagination />
        </div>
      )}
    </section>
  );
};
