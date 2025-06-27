"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { OrdenesCompraClient } from "@/components/ordenes-compra/ordenes-compra-client";

export default function OrdenesCompraPage() {
  return (
    <ProtectedRoute requiredPermissions={["leer_orden_de_compra", 'leer_orden_de_compra_proveedor']} redirectTo="/unauthorized">
      <OrdenesCompraClient />
    </ProtectedRoute>
  );
}
