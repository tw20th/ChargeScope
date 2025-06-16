// tailwind.config.ts
import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // 基本の背景
        text: {
          DEFAULT: "#111111", // 本文テキスト
          muted: "#666666", // 補足テキスト
        },
        accent: {
          DEFAULT: "#00cc66", // アクセントカラー（緑）
          light: "#e0f7ec", // アクセントの淡色
        },
        card: "#f9f9f9", // カード背景
        border: "#e5e7eb", // 境界線（灰色）
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "Inter", "sans-serif"], // フォント統一
      },
      borderRadius: {
        DEFAULT: "0.75rem", // rounded-xl 相当
      },
    },
  },
  plugins: [],
};

export default config;
