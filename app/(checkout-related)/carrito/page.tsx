"use client";

import { useState } from "react";
import { CartList } from "@/components/carrito-compras/cart-list";
import { OrderSummary } from "@/components/carrito-compras/order-summary";
import { CarritoItemType } from "@/lib/schemas";

// This would typically come from a context or state management library
const initialItems: CarritoItemType[] = [
  {
    sku: "CERV001",
    nombre_cerveza: "Cerveza Especial",
    presentacion: "355ml",
    precio: 12,
    id_tipo_cerveza: 1,
    tipo_cerveza: "Especial",
    stock_total: 100,
    marca: "Cervecería La Esquina",
    imagen: "/placeholder.svg?height=128&width=128",
    quantity: 1,
  },
  {
    sku: "CERV002",
    nombre_cerveza: "Cerveza Pale",
    presentacion: "355ml",
    precio: 10,
    id_tipo_cerveza: 2,
    tipo_cerveza: "Pale",
    stock_total: 50,
    marca: "Artesana",
    imagen: "/placeholder.svg?height=128&width=128",
    quantity: 1,
  },
];

export default function CarritoCompras() {
  const [cartItems, setCartItems] = useState<CarritoItemType[]>(initialItems);

  const handleRemoveItem = (sku: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
  };

  const handleUpdateQuantity = (sku: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.sku === sku ? { ...item, quantity: newQuantity } : item))
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);
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
