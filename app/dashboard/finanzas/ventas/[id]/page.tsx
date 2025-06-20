import { getVentaById } from "@/api/get-venta-by-id";
import VentaDetalleClient from "@/components/ventas/venta-detalle-client";
import { notFound } from "next/navigation";
/**
 * Página de detalle de venta (Server Component)
 *
 * Este componente servidor maneja los parámetros de la URL y
 * puede realizar operaciones del servidor antes de pasar los
 * datos al componente cliente.
 */
export default async function VentaDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  const venta = await getVentaById(id);

  if (!venta) {
    notFound();
  }

  return (
    <main id="venta-detalle-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        del detalle de venta y las interacciones del usuario 
      */}
      <VentaDetalleClient venta={venta} />
    </main>
  );
}
