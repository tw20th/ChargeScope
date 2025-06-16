// components/sections/CompareView.tsx
import { type MonitoredItem } from "@/types/monitoredItem";
import Link from "next/link";
import Image from "next/image";

const sampleItems: MonitoredItem[] = [
  {
    id: "1",
    productName: "Anker PowerCore",
    imageUrl: "/images/sample1.jpg",
    priceHistory: [{ date: "2025-06-01", price: 4980 }],
    outputPower: 20,
    capacity: 10000,
    weight: 180,
    tags: ["急速充電", "軽量"],
  },
  {
    id: "2",
    productName: "RAVPower 20000mAh",
    imageUrl: "/images/sample2.jpg",
    priceHistory: [{ date: "2025-06-01", price: 5980 }],
    outputPower: 30,
    capacity: 20000,
    weight: 350,
    tags: ["大容量", "2台同時"],
  },
];

type Props = {
  products: MonitoredItem[];
};

export const CompareView = ({ products }: Props) => {
  const specLabels = {
    price: "価格",
    output: "出力",
    capacity: "容量",
    weight: "重さ",
  };

  return (
    <section className="bg-background p-6 rounded-xl shadow space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product: MonitoredItem) => (
          <div key={product.id} className="text-center space-y-2">
            <Image
              src={product.imageUrl}
              alt={product.productName}
              width={300}
              height={180}
              className="mx-auto rounded-md object-contain"
            />
            <h3 className="text-base font-semibold text-text">
              {product.productName}
            </h3>
            <Link
              href={`/product/${product.id}`}
              className="inline-block text-sm text-primary underline"
            >
              詳細を見る
            </Link>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <table className="w-full text-sm text-text">
          <thead>
            <tr>
              <th className="text-left py-2">{/* 空 */}</th>
              {products.map((p: MonitoredItem) => (
                <th key={p.id} className="text-center py-2">
                  {p.productName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(["price", "output", "capacity", "weight"] as const).map((key) => (
              <tr key={key} className="border-t">
                <td className="py-2 font-medium">{specLabels[key]}</td>
                {products.map((p: MonitoredItem) => (
                  <td key={p.id + key} className="text-center py-2">
                    {key === "price"
                      ? `¥${
                          p.priceHistory.at(-1)?.price.toLocaleString() ?? "-"
                        }`
                      : key === "output"
                      ? `${p.outputPower ?? "-"}W`
                      : key === "capacity"
                      ? `${p.capacity ?? "-"}mAh`
                      : `${p.weight ?? "-"}g`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// 🔍 テスト表示用（本番環境では不要）
export default function SampleCompare() {
  return <CompareView products={sampleItems} />;
}
