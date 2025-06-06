// 例：components/sections/FeatureKeywords.tsx

type SectionProps = {
  heading: string;
  description: string;
};

export const FeatureKeywords = ({ heading, description }: SectionProps) => {
  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      {/* 実際のキーワードリストなどはここ */}
    </section>
  );
};
