import Image from 'next/image'

type Props = {
  id: string
  title: string
  image: string
  price?: number
  category?: string
  tags?: string[]
  date?: string
  rakutenLink?: string
  amazonLink?: string
  onDelete: (id: string) => void
}

export const AdminProductCard = ({
  id,
  title,
  image,
  price,
  category,
  tags,
  date,
  rakutenLink,
  amazonLink,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      {image ? (
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-md font-semibold line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500">{category || 'カテゴリーなし'}</p>
        <p className="text-lg font-bold mt-2">
          {price ? `¥${price.toLocaleString()}` : '価格未設定'}
        </p>
        <p className="text-xs text-gray-400">
          {date ? new Date(date).toLocaleDateString() : '日付不明'}
        </p>

        <div className="mt-auto">
          <button
            onClick={() => onDelete(id)}
            className="text-red-500 text-sm mt-2"
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  )
}
