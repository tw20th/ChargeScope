// components/common/SEO.tsx
import Head from "next/head";
import { siteConfig } from "@/config/siteConfig";

type Props = {
  title?: string;
  description?: string;
  ogImage?: string;
  url?: string;
};

export const SEO = ({
  title = siteConfig.title,
  description = siteConfig.description,
  ogImage = "/ogp.png",
  url = `https://your-domain.com`,
}: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
