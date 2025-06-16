import { Button } from "@/components/ui/Button";

export const Hero = () => {
  return (
    <section className="bg-background py-16 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-text">
        「在宅ワークでも、快適な座り心地を。」
      </h1>
      <p className="text-text-muted mt-4 max-w-xl mx-auto text-base">
        腰痛に悩まされるあなたへ。ゲーミングチェアで毎日を変えよう。
      </p>
      <div className="mt-6">
        <Button>おすすめ商品を見る</Button>
      </div>
    </section>
  );
};
