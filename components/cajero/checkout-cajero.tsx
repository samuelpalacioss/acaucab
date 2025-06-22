"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductList from "./product-list";
import CategoryFilter from "./category-filter";
import Cart from "./cart";
import { CartItemType } from "@/components/carrito-compras/cart-list";
import { getPresentacionesDisponibles } from "@/api/get-presentaciones-disponibles";
import { PresentacionType } from "@/lib/schemas";

// Utility function to get unique categories
function getUniqueCategories(products: CartItemType[]): string[] {
  const categories = products
    .map((product) => product.category)
    .filter((category): category is string => category !== undefined);
  return [...new Set(categories)];
}

interface CheckoutCajeroProps {
  onCheckout: () => void;
  cart: CartItemType[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

export default function CheckoutCajero({
  onCheckout,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CheckoutCajeroProps) {
  const [products, setProducts] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Todas");
  const [recentlyUsed, setRecentlyUsed] = useState<CartItemType[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        // Default tienda id 1 en el procedure de la bd
        const presentaciones = await getPresentacionesDisponibles();

        const mappedProducts = presentaciones.map((p: PresentacionType) => ({
          // The component expects a number for the ID.
          // This assumes your SKUs are strings that can be converted to numbers.
          // If SKU is not numeric, this will result in NaN, which can cause issues.
          sku: p.sku,
          name: p.nombre_presentacion_cerveza,
          price: p.precio,
          quantity: 1, // Default quantity for the list
          brand: p.marca,
          imageSrc: "/placeholder.svg", // Placeholder image
          size: "N/A", // Placeholder size
          category: p.tipo_cerveza,
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

  // Convert products to CartItemType for display
  const displayProducts: CartItemType[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    brand: product.brand,
    imageSrc: product.imageSrc,
    size: product.size,
    category: product.category,
  }));

  // Get filtered products based on search and category
  const getFilteredProducts = () => {
    let filtered = displayProducts;

    if (selectedCategory === "Recientes") {
      return recentlyUsed;
    }

    if (selectedCategory && selectedCategory !== "Todas") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const addToCart = (product: CartItemType) => {
    // Add to recently used if not already there
    const originalProduct = products.find((p) => p.id === product.id);
    if (originalProduct) {
      setRecentlyUsed((prev) => {
        const exists = prev.some((p) => p.id === originalProduct.id);
        if (!exists) {
          const newRecent = [originalProduct, ...prev].slice(0, 6);
          return newRecent;
        }
        return prev;
      });
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      onUpdateQuantity(product.id, existingItem.quantity + 1);
    } else {
      onUpdateQuantity(product.id, 1);
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
