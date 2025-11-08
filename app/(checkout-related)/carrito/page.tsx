"use client";

import { useEffect, useState, useCallback } from "react";
import { useVentaStore } from "@/store/venta-store";
import { CartList } from "@/components/carrito-compras/cart-list";
import { OrderSummary } from "@/components/carrito-compras/order-summary";
import { useRouter } from "next/navigation";
import { useTasaStore } from "@/store/tasa-store";
import { useUser } from "@/store/user-store";
import { registrarVentaEnProceso, registrarDetallesVentaEnProceso } from "@/lib/api/ventas";
import { getClienteByUsuarioId } from "@/lib/api/clientes";
import { toast } from "@/hooks/use-toast";

const logCartState = (action: string) => {
  const state = useVentaStore.getState();
  console.group(`🛒 CART STORE - ${action}`);
  console.log(
    "👤 Cliente:",
    state.cliente?.nombre_completo || state.cliente?.denominacion_comercial || "No seleccionado"
  );
  console.log("🆔 ID Cliente:", state.cliente?.id_cliente || "N/A");
  console.log("🛍️ Items en carrito:", state.carrito.length);
  state.carrito.forEach((item, index) => {
    console.log(
      `   ${index + 1}. ${item.nombre_cerveza} x${item.quantity} - ${item.precio.toFixed(2)} Bs`
    );
  });
  console.log("🔢 Venta ID:", state.ventaId);
  console.groupEnd();
};

export default function CarritoCompras() {
  const router = useRouter();
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    cliente,
    ventaId,
    setVentaId,
    setCliente,
  } = useVentaStore();
  const { fetchTasas } = useTasaStore();
  const { isAuthenticated, usuario } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

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

  const fetchClienteData = useCallback(async () => {
    if (isAuthenticated && usuario?.id && !cliente) {
      try {
        const clienteData = await getClienteByUsuarioId(usuario.id);
        if (clienteData) {
          setCliente(clienteData);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos del cliente.",
          variant: "destructive",
        });
      }
    }
  }, [isAuthenticated, usuario?.id, cliente, setCliente]);

  useEffect(() => {
    fetchClienteData();
  }, [fetchClienteData]);

  const calculateSubtotal = () => {
    return carrito.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return carrito.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!cliente?.id_cliente) {
      toast({
        title: "Error",
        description: "No se ha podido identificar al cliente. Por favor, inicie sesión.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    logCartState("INICIANDO CHECKOUT");

    try {
      let currentVentaId = ventaId;

      if (!currentVentaId) {
        if (!usuario?.id) throw new Error("Usuario no autenticado.");
        const newVentaId = await registrarVentaEnProceso(usuario.id, "usuario", {
          p_tienda_web_id: 1, // Assuming web store ID is 1
        });
        if (newVentaId) {
          setVentaId(newVentaId);
          currentVentaId = newVentaId;
          logCartState("VENTA EN PROCESO REGISTRADA");
        } else {
          throw new Error("No se pudo iniciar la venta. Por favor, intente de nuevo.");
        }
      }

      if (currentVentaId) {
        await registrarDetallesVentaEnProceso(currentVentaId, carrito);
        logCartState("DETALLES DE VENTA REGISTRADOS");
        router.push("/checkout");
      }
    } catch (error: any) {
      console.error("Error during checkout process:", error);
      toast({
        title: "Error en el Checkout",
        description: error.message || "Ocurrió un error inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
            isCartEmpty={carrito.length === 0}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}
