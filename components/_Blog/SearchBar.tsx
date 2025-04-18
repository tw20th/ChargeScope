// components/blog/SearchBar.tsx
'use client'

export const SearchBar = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => {
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
