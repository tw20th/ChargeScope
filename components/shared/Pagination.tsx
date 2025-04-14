// components/shared/Pagination.tsx
import Link from 'next/link'

type Props = {
  currentPage: number
  totalCount: number
  perPage: number
  basePath: string
}

export const Pagination = ({
  currentPage,
  totalCount,
  perPage,
  basePath,
}: Props) => {
  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1
        return (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {page}
          </Link>
        )
      })}
    </div>
  )
}
