"use client";

export type BlogSortOption = "latest" | "viewsDesc";

type BlogSortSelectProps = {
  value: BlogSortOption;
  onChange: (value: BlogSortOption) => void;
};

export const BlogSortSelect = ({ value, onChange }: BlogSortSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">並び替え:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as BlogSortOption)}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value="latest">新着順</option>
        <option value="viewsDesc">人気順</option>
      </select>
    </div>
  );
};
