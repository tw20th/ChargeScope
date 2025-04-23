// components/blog/SearchBar.tsx
'use client'

type Props = {
  value?: string
  onChange?: (val: string) => void
}

export const SearchBar = ({ value = '', onChange = () => {} }: Props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="キーワードで検索..."
      className="w-full p-2 border rounded mb-4"
    />
  )
}
