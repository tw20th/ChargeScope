'use client'

type SortKey = 'ratingHigh' | 'priceLow' | 'priceHigh'

type Props = {
  value: SortKey
  onChange: (value: SortKey) => void
}

export default function SortSelect({ value, onChange }: Props) {
  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">並び替え:</label>
      <select
        className="border p-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
      >
        <option value="ratingHigh">評価が高い順</option>
        <option value="priceLow">料金が安い順</option>
        <option value="priceHigh">料金が高い順</option>
      </select>
    </div>
  )
}
