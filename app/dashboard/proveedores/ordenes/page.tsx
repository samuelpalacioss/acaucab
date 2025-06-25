"use client";

import { OrdenesCompraClient } from "@/components/ordenes-compra/ordenes-compra-client";
import ProtectedRoute from "@/components/auth/protected-route";

export default function OrdenesCompraPage() {
  const handleNewOrder = () => {
    // Aquí va la lógica para crear una nueva orden
    console.log("Creando nueva orden de compra");
  };

  return (
    <ProtectedRoute requiredPermissions={["leer_orden_de_compra_proveedor"]} redirectTo="/unauthorized">
      <OrdenesCompraClient />
    </ProtectedRoute>
  );
}
