// next.config.mjs

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail.image.rakuten.co.jp',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hatyu-navi.vercel.app', // ✅ fallback画像をVercelから配信するなら追加
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
