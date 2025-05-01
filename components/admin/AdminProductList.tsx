import { AdminProduct } from '@/hooks/useAdminProducts'
import { AdminProductCard } from './AdminProductCard'

type Props = {
  products: AdminProduct[]
  onDelete: (id: string) => void
}

export const AdminProductList = ({ products, onDelete }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <AdminProductCard
          id={product.id}
          title={product.title}
          image={product.image} // ⭐️ ←これ追加！！
          price={product.price}
          category={product.category}
          tags={product.tags || []}
          date={product.date}
          rakutenLink={product.rakutenLink}
          amazonLink={product.amazonLink}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  )
}
