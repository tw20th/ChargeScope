// components/sections/HeroSection.tsx
type HeroSectionProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export const HeroSection = ({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: HeroSectionProps) => {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-6">{subtitle}</p>
      <a
        href={ctaHref}
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {ctaLabel}
      </a>
    </section>
  );
};
