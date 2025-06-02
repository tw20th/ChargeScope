"use client";

type SortOption = "scoreDesc" | "priceAsc" | "priceDesc";

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">並び替え:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value="scoreDesc">スコアが高い順</option>
        <option value="priceAsc">価格が安い順</option>
        <option value="priceDesc">価格が高い順</option>
      </select>
    </div>
  );
};
