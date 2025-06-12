"use client";

import { useState } from "react";
import { CartList, CartItemType } from "@/components/carrito-compras/cart-list";
import { OrderSummary } from "@/components/carrito-compras/order-summary";

// This would typically come from a context or state management library
const initialItems: CartItemType[] = [
  {
    id: "1",
    name: "Cerveza Especial",
    size: "355ml",
    quantity: 1,
    price: 12,
    brand: "Cervecería La Esquina",
    imageSrc: "/placeholder.svg?height=128&width=128",
    category: "Especial",
  },
  {
    id: "2",
    name: "Cerveza Pale",
    size: "355ml",
    quantity: 1,
    price: 10,
    brand: "Artesana",
    imageSrc: "/placeholder.svg?height=128&width=128",
    category: "Pale",
  },
];

export default function CarritoCompras() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialItems);

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleCheckout = () => {
    alert("Procesando pago...");
    // In a real application, you would navigate to checkout page
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tu carrito</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartList
            items={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            isCheckout={true}
          />
        </div>

        <div>
          <OrderSummary
            subtotal={calculateSubtotal()}
            totalItems={calculateTotalItems()}
            onCheckout={handleCheckout}
            isCheckout={true}
          />
        </div>
      </div>
    </div>
  );
}
