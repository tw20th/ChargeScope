// components/blog/Pagination.tsx
export const Pagination = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
      >
        前へ
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
      >
        次へ
      </button>
    </div>
  )
}
