"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, AlertTriangle } from "lucide-react"
import type { CarritoItemType } from "@/lib/schemas"
import type { EventProvider, EventProduct } from "./event-detail"

// Extend EventProduct for UI needs
interface UIEventProduct extends EventProduct {
  proveedor?: string
  proveedorId1?: number
  proveedorId2?: string
  stock_disponible?: number
  nombre_cerveza?: string
}

interface ProductListEventoProps {
  products: UIEventProduct[]
  onAddToCart: (product: UIEventProduct) => void
  searchQuery: string
  selectedProvider: string | null
  convertirADolar: (amount: number) => number | null
  cart: CarritoItemType[]
}

export default function ProductListEvento({
  products,
  onAddToCart,
  searchQuery,
  selectedProvider,
  convertirADolar,
  cart,
}: ProductListEventoProps) {
  const getCartQuantity = (sku: string) => {
    const item = cart.find((item) => item.sku === sku)
    return item ? item.quantity : 0
  }

  const canAddMore = (product: UIEventProduct) => {
    return product.stock_disponible === undefined || getCartQuantity(product.sku) < product.stock_disponible
  }

  const isOutOfStock = (product: UIEventProduct) => {
    return product.stock_disponible !== undefined && product.stock_disponible <= 0
  }

  const getStockBadgeColor = (stock?: number) => {
    if (stock === undefined) return "default"
    if (stock === 0) return "destructive"
    if (stock <= 5) return "secondary"
    return "default"
  }

  const getStockBadgeText = (stock?: number) => {
    if (stock === undefined) return ""
    if (stock === 0) return "Agotado"
    if (stock <= 5) return `Quedan ${stock}`
    return `Stock: ${stock}`
  }

  // Group products by provider when showing all providers
  const groupedProducts =
    selectedProvider === "Todos" || selectedProvider === "Recientes"
      ? products.reduce(
          (acc, product) => {
            const providerKey = `${product.proveedorId1}-${product.proveedorId2}`
            if (!acc[providerKey]) {
              acc[providerKey] = {
                providerName: product.proveedor || "",
                products: [],
              }
            }
            acc[providerKey].products.push(product)
            return acc
          },
          {} as Record<string, { providerName: string; products: UIEventProduct[] }>,
        )
      : null

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
        <p className="text-gray-500">
          {searchQuery
            ? `No hay productos que coincidan con "${searchQuery}"`
            : "No hay productos disponibles en este momento"}
        </p>
      </div>
    )
  }

  const ProductCard = ({ product }: { product: UIEventProduct }) => {
    const cartQuantity = getCartQuantity(product.sku)
    const outOfStock = isOutOfStock(product)
    const canAdd = canAddMore(product)

    return (
      <Card key={product.sku} className={`transition-all hover:shadow-md ${outOfStock ? "opacity-60" : ""}`}>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 truncate">{product.nombre_cerveza || product.nombre}</h3>
          <p className="text-xs text-blue-600 font-medium mt-1">{product.proveedor || ""}</p>
          <Badge variant={getStockBadgeColor(product.stock_disponible)} className="text-xs">
            {getStockBadgeText(product.stock_disponible)}
          </Badge>

          <div className="flex justify-between items-center mt-4">
            <div className="text-right ml-4">
              <p className="font-semibold text-gray-900">Bs. {product.precio.toFixed(2)}</p>
              {convertirADolar(product.precio) && (
                <p className="text-sm text-gray-500">${convertirADolar(product.precio)?.toFixed(2)}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {cartQuantity > 0 && (
                <Badge variant="outline" className="text-xs">
                  En carrito: {cartQuantity}
                </Badge>
              )}

              {outOfStock ? (
                <Button size="sm" disabled className="bg-gray-100">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Agotado
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => onAddToCart(product)}
                  disabled={!canAdd}
                  className={!canAdd ? "bg-gray-100" : ""}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {!canAdd ? "Límite alcanzado" : "Agregar"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render grouped by provider
  if (groupedProducts && selectedProvider !== "Recientes") {
    return (
      <div className="space-y-6">
        {Object.entries(groupedProducts).map(([providerKey, { providerName, products: providerProducts }]) => (
          <div key={providerKey}>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-gray-800">{providerName}</h4>
              <Badge variant="outline" className="text-xs">
                {providerProducts.length} productos
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {providerProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Render as simple grid (for single provider or recent products)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  )
}
