import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { TagBadge } from "@/components/ui/TagBadge";
import { type MonitoredItem } from "@/types/monitoredItem";

export const ProductCard = ({
  imageUrl,
  productName,
  priceHistory,
  tags,
}: MonitoredItem) => {
  const latestPrice = priceHistory.at(-1)?.price ?? 0;

  return (
    <Card className="overflow-hidden">
      <Image
        src={imageUrl}
        alt={productName}
        width={400}
        height={400}
        className="w-full aspect-square object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-text font-semibold text-lg">{productName}</h3>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
        <div className="text-right text-text text-sm">
          ¥{latestPrice.toLocaleString()}
        </div>
      </div>
    </Card>
  );
};
