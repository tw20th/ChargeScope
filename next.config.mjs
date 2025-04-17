// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail.image.rakuten.co.jp', // ✅ ← 修正済み！
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
