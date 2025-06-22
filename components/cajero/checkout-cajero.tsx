"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductList from "./product-list";
import CategoryFilter from "./category-filter";
import Cart from "./cart";
import { getPresentacionesDisponibles } from "@/api/get-presentaciones-disponibles";
import { CarritoItemType, PresentacionType } from "@/lib/schemas";

// Utility function to get unique categories
function getUniqueCategories(products: CarritoItemType[]): string[] {
  const categories = products
    .map((product) => product.tipo_cerveza)
    .filter((category): category is string => category !== undefined);
  return [...new Set(categories)];
}

interface CheckoutCajeroProps {
  onCheckout: () => void;
  cart: CarritoItemType[];
  onUpdateQuantity: (sku: string, quantity: number) => void;
  onRemoveItem: (sku: string) => void;
  onClearCart: () => void;
}

export default function CheckoutCajero({
  onCheckout,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CheckoutCajeroProps) {
  const [products, setProducts] = useState<CarritoItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Todas");
  const [recentlyUsed, setRecentlyUsed] = useState<CarritoItemType[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        // Default tienda id 1 en el procedure de la bd
        const presentaciones = await getPresentacionesDisponibles();

        const mappedProducts: CarritoItemType[] = presentaciones.map((p: PresentacionType) => ({
          ...p,
          quantity: 1, // Default quantity for the list
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Handle error state if needed
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = getUniqueCategories(products);

  // Get filtered products based on search and category
  const getFilteredProducts = () => {
    let filtered = products;

    if (selectedCategory === "Recientes") {
      return recentlyUsed;
    }

    if (selectedCategory && selectedCategory !== "Todas") {
      filtered = filtered.filter((product) => product.tipo_cerveza === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.nombre_cerveza.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const addToCart = (product: CarritoItemType) => {
    // Add to recently used if not already there
    const originalProduct = products.find((p) => p.sku === product.sku);
    if (originalProduct) {
      setRecentlyUsed((prev) => {
        const exists = prev.some((p) => p.sku === originalProduct.sku);
        if (!exists) {
          const newRecent = [originalProduct, ...prev].slice(0, 6);
          return newRecent;
        }
        return prev;
      });
    }

    const existingItem = cart.find((item) => item.sku === product.sku);
    if (existingItem) {
      onUpdateQuantity(product.sku, existingItem.quantity + 1);
    } else {
      onUpdateQuantity(product.sku, 1);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              recentlyUsed={recentlyUsed}
            />
          </div>

          {isLoading ? (
            <div className="text-center p-8">Cargando productos...</div>
          ) : (
            <>
              {!selectedCategory && searchQuery === "" && (
                <h3 className="font-medium text-gray-700 mb-2">
                  {recentlyUsed.length > 0
                    ? "Productos Usados Recientemente"
                    : "Productos Populares"}
                </h3>
              )}

              <ProductList
                products={getFilteredProducts()}
                onAddToCart={addToCart}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            </>
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Cart
          items={cart}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onClearCart={onClearCart}
          onCheckout={onCheckout}
        />
      </div>
    </div>
  );
}
