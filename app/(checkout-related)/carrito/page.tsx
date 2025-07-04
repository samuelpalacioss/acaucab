"use client";

import { useEffect } from "react";
import { useVentaStore } from "@/store/venta-store";
import { CartList } from "@/components/carrito-compras/cart-list";
import { OrderSummary } from "@/components/carrito-compras/order-summary";
import { useRouter } from "next/navigation";
import { useTasaStore } from "@/store/tasa-store";

export default function CarritoCompras() {
  const router = useRouter();
  const { carrito, eliminarDelCarrito, actualizarCantidad } = useVentaStore();
  const { fetchTasas } = useTasaStore();

  useEffect(() => {
    // Initial fetch
    fetchTasas();

    // Set up polling every 5 minutes
    const intervalId = setInterval(() => {
      console.log("🔄 Refreshing exchange rates in cart...");
      fetchTasas();
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchTasas]);

  const calculateSubtotal = () => {
    return carrito.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return carrito.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tu carrito</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartList
            items={carrito}
            onRemoveItem={eliminarDelCarrito}
            onUpdateQuantity={actualizarCantidad}
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
