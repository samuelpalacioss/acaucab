import { obtenerOrdenDeCompraPorId } from "@/lib/server-actions";
import OrdenCompraDetalleClient from "@/components/ordenes-compra/orden-compra-detalle-client";
import { notFound } from "next/navigation";
import ProtectedRoute from "@/components/auth/protected-route";

/**
 * Página de detalle de orden de compra (Server Component)
 *
 * Este componente servidor maneja los parámetros de la URL y
 * obtiene los datos de la orden de compra específica antes de
 * pasarlos al componente cliente.
 */
export default async function OrdenCompraDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  const orden = await obtenerOrdenDeCompraPorId(id);

  if (!orden) {
    notFound();
  }

  return (
    <ProtectedRoute requiredPermissions={["leer_orden_de_compra", 'leer_orden_de_compra_proveedor']} redirectTo="/unauthorized">
    <main id="orden-compra-detalle-page" className="min-h-screen p-6">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        del detalle de la orden de compra y las interacciones del usuario 
      */}
      <OrdenCompraDetalleClient orden={orden} estadoActual={orden.estado_actual} />
    </main>
    </ProtectedRoute>
  );
}