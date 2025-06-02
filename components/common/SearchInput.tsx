"use client";

type SearchInputProps = {
  keyword: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchInput = ({
  keyword,
  onChange,
  placeholder = "キーワードで検索",
}: SearchInputProps) => {
  return (
    <input
      type="text"
      value={keyword}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full md:w-80 px-4 py-2 border rounded-md text-sm"
    />
  );
};
