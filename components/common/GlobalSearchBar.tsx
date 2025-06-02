"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const GlobalSearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索キーワード"
        className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
      >
        検索
      </button>
    </form>
  );
};
