// ✅ 修正後の tailwind.config.ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography' // ← これが正しい書き方！

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [typography], // ← require() ではなく変数として渡す
}

export default config
