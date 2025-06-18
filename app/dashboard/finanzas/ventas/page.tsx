import VentasClient from "@/components/ventas/ventas-client";
import { llamarFuncion } from "@/lib/server-actions";
import { Status } from "@/models/status";
import { VentaResponse, VentaExpandida, transformarVentaResponse } from "@/models/venta";
import { getBCV } from "@/lib/bcv";

/**
 * Página de ventas (Server Component)
 *
 * Este componente servidor actúa como el punto de entrada para
 * la gestión de ventas. Aquí se realizan las operaciones del
 * servidor para obtener los datos de ventas desde PostgreSQL,
 * procesarlos, validarlos y transformarlos antes de pasarlos
 * al componente cliente.
 */
export default async function VentasPage() {
  /**
   * Llamada a la función PostgreSQL para obtener las ventas
   * Utiliza la función server action llamarFuncion para ejecutar fn_get_ventas()
   */
  let ventasExpandidas: VentaExpandida[] = [];
  let status: Status[] = [];
  let bcv: any = null;

  try {
    // Llamar la función PostgreSQL fn_get_ventas()
    const ventasData: VentaResponse[] = await llamarFuncion<VentaResponse>("fn_get_ventas");
    const statusData: Status[] = await llamarFuncion<Status>("fn_get_status");
    bcv = await getBCV();
    console.log(bcv);
    /**
     * Procesamiento y transformación de datos en el servidor
     * Convertimos VentaResponse[] a VentaExpandida[] para la interfaz
     */
    if (ventasData && ventasData.length > 0) {
      ventasExpandidas = ventasData.map((venta) => transformarVentaResponse(venta));

      /**
       * Validación adicional de datos en el servidor
       * Filtrar ventas que tengan datos válidos
       */
      const ventasValidas = ventasExpandidas.filter((venta) => {
        return venta.id && venta.monto_total > 0 && venta.nombre_cliente && venta.canal_venta;
      });

      ventasExpandidas = ventasValidas;
      status = statusData;
    }
  } catch (error: any) {
    // Manejo básico de errores - log para debugging en desarrollo
    console.error("❌ Error al obtener datos de ventas:", error.message);
    console.error("❌ Error al obtener datos de status:", error.message);

    // En caso de error, mantener array vacío
    ventasExpandidas = [];
    status = [];
  }


  return (
    <main id="ventas-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de ventas y las interacciones del usuario.
        Se pasan los datos ya procesados y validados desde el servidor.
      */}
      <VentasClient ventasExpandidas={ventasExpandidas} status={status} />
    </main>
  );
}
