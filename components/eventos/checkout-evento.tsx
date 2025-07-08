"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProductListEvento from "./product-list-evento"
import ProviderFilter from "@/components/eventos/provider-filter"
import Cart from "../cajero/cart"
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

interface CheckoutEventoProps {
  onCheckout: () => void
  cart: CarritoItemType[]
  onUpdateQuantity: (sku: string, quantity: number) => void
  onRemoveItem: (sku: string) => void
  onClearCart: () => void
  providers: EventProvider[]
  productosEvento: UIEventProduct[]
  convertirADolar: (amount: number) => number | null
  eventInfo: any
}

// Utility function to get unique providers
function getUniqueProviders(products: UIEventProduct[]): { id: string; name: string }[] {
  const providers = products.map((product) => ({
    id: `${product.proveedorId1}-${product.proveedorId2}`,
    name: product.proveedor || product.nombre,
  }))

  const uniqueProviders = providers.filter(
    (provider, index, self) => index === self.findIndex((p) => p.id === provider.id),
  )

  return uniqueProviders
}

export default function CheckoutEvento({
  onCheckout,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  providers,
  productosEvento,
  convertirADolar,
  eventInfo,
}: CheckoutEventoProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<string | null>("Todos")
  const [recentlyUsed, setRecentlyUsed] = useState<UIEventProduct[]>([])

  const providerOptions = getUniqueProviders(productosEvento)

  // Get filtered products based on search and provider
  const getFilteredProducts = () => {
    let filtered = productosEvento

    if (selectedProvider === "Recientes") {
      return recentlyUsed
    }

    if (selectedProvider && selectedProvider !== "Todos") {
      filtered = filtered.filter((product) => `${product.proveedorId1}-${product.proveedorId2}` === selectedProvider)
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) => (product.nombre_cerveza || product.nombre).toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filtered
  }

  const addToCart = (product: UIEventProduct) => {
    console.log("🛒 Adding event product to cart:", product)
    console.log("🛒 Current cart state:", cart)

    // Add to recently used if not already there
    setRecentlyUsed((prev) => {
      const exists = prev.some((p) => p.sku === product.sku)
      if (!exists) {
        const newRecent = [product, ...prev].slice(0, 6)
        return newRecent
      }
      return prev
    })

    // Check if product already exists in cart
    const existingItem = cart.find((item) => item.sku === product.sku)
    console.log("🛒 Existing item in cart:", existingItem)

    if (existingItem) {
      // If exists, increment quantity (respecting stock limits)
      const newQuantity = existingItem.quantity + 1
      if (product.stock_disponible === undefined || newQuantity <= product.stock_disponible) {
        console.log("🛒 Updating existing item quantity:", newQuantity)
        onUpdateQuantity(product.sku, newQuantity)
      } else {
        console.log("🛒 Cannot add more - stock limit reached")
      }
    } else {
      // If doesn't exist, add with quantity 1
      if (product.stock_disponible === undefined || product.stock_disponible > 0) {
        console.log("🛒 Adding new item with quantity 1 for SKU:", product.sku)
        onUpdateQuantity(product.sku, 1)
      } else {
        console.log("🛒 Cannot add - product out of stock")
      }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          {/* Event Info Header */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="font-semibold text-blue-900">{eventInfo?.nombre || "Evento"}</h2>
            <div className="text-sm text-blue-700 mt-1">
              <span>
                📅{" "}
                {eventInfo?.fechaHoraInicio
                  ? new Date(eventInfo.fechaHoraInicio).toLocaleDateString()
                  : "Fecha no disponible"}
              </span>
              <span className="ml-4">📍 {eventInfo?.direccion || "Ubicación no disponible"}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos del evento"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ProviderFilter
              providers={providerOptions}
              selectedProvider={selectedProvider}
              onSelectProvider={setSelectedProvider}
              recentlyUsed={recentlyUsed}
            />
          </div>

          {!selectedProvider && searchQuery === "" && (
            <h3 className="font-medium text-gray-700 mb-2">
              {recentlyUsed.length > 0 ? "Productos Usados Recientemente" : "Productos del Evento"}
            </h3>
          )}

          <ProductListEvento
            products={getFilteredProducts()}
            onAddToCart={addToCart}
            searchQuery={searchQuery}
            selectedProvider={selectedProvider}
            convertirADolar={convertirADolar}
            cart={cart}
          />
        </div>
      </div>

      <div className="lg:col-span-1">
        <Cart
          items={cart}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onClearCart={onClearCart}
          onCheckout={onCheckout}
          convertirADolar={convertirADolar}
        />
      </div>
    </div>
  )
}
