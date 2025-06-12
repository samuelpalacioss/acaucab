"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductList from "./product-list";
import CategoryFilter from "./category-filter";
import Cart from "./cart";
import { CartItemType } from "@/components/carrito-compras/cart-list";
import { beers } from "@/app/(marketing)/productos/page";

// Utility function to get unique categories
function getUniqueCategories(products: CartItemType[]): string[] {
  const categories = products
    .map((product) => product.category)
    .filter((category): category is string => category !== undefined);
  return [...new Set(categories)];
}

export default function CheckoutCajero() {
  const [products] = useState<CartItemType[]>(
    beers.map((beer) => ({
      id: beer.id.toString(),
      name: beer.name,
      price: beer.price,
      quantity: 1,
      brand: beer.brand,
      imageSrc: beer.image,
      size: beer.capacity,
      category: beer.category,
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Todas");
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<CartItemType[]>([]);
  const [transactionId, setTransactionId] = useState("");
  const [recentlyUsed, setRecentlyUsed] = useState<CartItemType[]>([]);

  const categories = getUniqueCategories(products);

  // Convert products to CartItemType for display
  const displayProducts: CartItemType[] = products.map((product) => ({
    id: product.id.toString(),
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
    const originalProduct = products.find((p) => p.id.toString() === product.id);
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

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    if (cart.length === 0) return;

    // Generate a transaction ID
    const newTransactionId = `TXN-${Date.now().toString().slice(-6)}`;
    setTransactionId(newTransactionId);
    setReceiptData([...cart]);
    setShowReceipt(true);
    clearCart();
  };

  const closeReceipt = () => {
    setShowReceipt(false);
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
                placeholder="Search products..."
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

          {!selectedCategory && searchQuery === "" && (
            <h3 className="font-medium text-gray-700 mb-2">
              {recentlyUsed.length > 0 ? "Recently Used Products" : "Popular Products"}
            </h3>
          )}

          <ProductList
            products={getFilteredProducts()}
            onAddToCart={addToCart}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      <div className="lg:col-span-1">
        <Cart
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onCheckout={checkout}
        />
      </div>
    </div>
  );
}
