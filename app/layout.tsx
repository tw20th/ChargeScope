// app/layout.tsx
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/layout/SEO";

export const metadata = {
  title: "PickMyGadget｜モバイルバッテリー比較サイト",
  description: "出張・旅行に最適なモバイルバッテリーを比較・ランキング表示！",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-800">
        <SEO />
        <Header />
        <main className="min-h-screen px-4 md:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
