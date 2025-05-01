'use client'

import { useAdminProducts } from '@/hooks/useAdminProducts'
import { AdminProductList } from '@/components/admin/AdminProductList'
import { Loader2 } from 'lucide-react'

export default function AdminProductsPage() {
  const { products, loading, deleteProduct } = useAdminProducts()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">商品管理</h1>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <AdminProductList products={products} onDelete={deleteProduct} />
      )}
    </div>
  )
}
