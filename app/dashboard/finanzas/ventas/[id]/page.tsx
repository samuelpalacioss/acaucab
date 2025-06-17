import VentaDetalleClient from "@/components/ventas/venta-detalle-client";
/**
 * Página de detalle de venta (Server Component)
 *
 * Este componente servidor maneja los parámetros de la URL y
 * puede realizar operaciones del servidor antes de pasar los
 * datos al componente cliente.
 */
export default async function VentaDetallePage({ params }: { params: { id: string } }) {
  return (
    <main id="venta-detalle-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        del detalle de venta y las interacciones del usuario 
      */}
      <VentaDetalleClient saleId={params.id} />
    </main>
  );
}
