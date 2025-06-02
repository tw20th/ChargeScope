"use client";

import { Suspense } from "react";
import { SearchPageContent } from "./SearchPageContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4">読み込み中...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
