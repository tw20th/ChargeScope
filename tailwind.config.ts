// tailwind.config.ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#FCD34D', // レオパの黄色
        accent: '#F472B6', // 薄いピンク（アクセント）
        bgSoft: '#FDF2F8', // 全体背景：ほんのりピンク
        darkBrown: '#4B3621', // 深めの茶色（文字・枠）
      },
    },
  },
  plugins: [typography, lineClamp],
}

export default config
