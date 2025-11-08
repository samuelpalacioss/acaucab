import ProtectedRoute from "@/components/auth/protected-route";
import InventarioDetalleClient from "@/components/inventario/inventario-detalle-client";
import { obtenerInventario, obtenerOrdenesReposicion } from "@/lib/server-actions";

// Force dynamic rendering since this page uses cookies
export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
  /** Obtener datos del inventario desde la base de datos */
  const inventoryData = await obtenerInventario();

  /** Obtener datos de las órdenes de reposición desde la base de datos */
  const ordenesReposicion = await obtenerOrdenesReposicion();

  return (
    <ProtectedRoute requiredPermissions={["leer_inventario"]} redirectTo="/unauthorized">
      <InventarioDetalleClient inventoryData={inventoryData} ordenesReposicion={ordenesReposicion} />
    </ProtectedRoute>
  );
}
