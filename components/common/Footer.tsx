// components/common/Footer.tsx
import { siteConfig } from "@/config/siteConfig";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-6 px-4 mt-10 border-t">
      <div className="max-w-7xl mx-auto space-y-2 text-center">
        <p>{siteConfig.footerNote}</p>
        <p>{siteConfig.copyright}</p>
      </div>
    </footer>
  );
};
