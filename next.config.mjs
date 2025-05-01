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
        hostname: 'hatyu-navi.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // ✅ これを追加！！
        pathname: '/v0/b/hatyu-navi.firebasestorage.app/o/**',
      },
    ],
  },
}

export default nextConfig
