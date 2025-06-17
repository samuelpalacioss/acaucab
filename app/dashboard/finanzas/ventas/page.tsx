import VentasClient from "@/components/ventas/ventas-client";
import { llamarFuncion } from "@/lib/server-actions";
import { VentaResponse, VentaExpandida, transformarVentaResponse } from "@/models/venta";

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

  try {
    // Llamar la función PostgreSQL fn_get_ventas()
    const ventasData: VentaResponse[] = await llamarFuncion<VentaResponse>("fn_get_ventas");

    // Log en el servidor para verificar los datos obtenidos
    console.log("📊 Datos de ventas obtenidos desde PostgreSQL:", {
      total_ventas: ventasData.length,
      primera_venta: ventasData[0] || null,
      timestamp: new Date().toISOString(),
    });

    /**
     * Procesamiento y transformación de datos en el servidor
     * Convertimos VentaResponse[] a VentaExpandida[] para la interfaz
     */
    if (ventasData && ventasData.length > 0) {
      ventasExpandidas = ventasData.map((venta) => transformarVentaResponse(venta));

      // Log de las ventas procesadas en el servidor
      console.log("✅ Ventas procesadas en el servidor:", {
        total_procesadas: ventasExpandidas.length,
        primera_venta_procesada: ventasExpandidas[0] || null,
        estructura_venta: ventasExpandidas[0] ? Object.keys(ventasExpandidas[0]) : [],
        timestamp: new Date().toISOString(),
      });

      /**
       * Validación adicional de datos en el servidor
       * Filtrar ventas que tengan datos válidos
       */
      const ventasValidas = ventasExpandidas.filter((venta) => {
        return venta.id && venta.monto_total > 0 && venta.nombre_cliente && venta.canal_venta;
      });

      console.log("🔍 Validación de datos:", {
        ventas_originales: ventasExpandidas.length,
        ventas_validas: ventasValidas.length,
        ventas_invalidas: ventasExpandidas.length - ventasValidas.length,
      });

      ventasExpandidas = ventasValidas;
    } else {
      console.log("⚠️ No se obtuvieron datos de ventas desde PostgreSQL");
    }
  } catch (error) {
    // Manejo de errores en caso de que falle la consulta
    console.error("❌ Error al obtener datos de ventas:", error);

    // En caso de error, mantenemos el array vacío
    ventasExpandidas = [];
  }

  /**
   * Log final con resumen para el cliente
   */
  console.log("🎯 Datos finales enviados al cliente:", {
    total_ventas_enviadas: ventasExpandidas.length,
    hay_datos: ventasExpandidas.length > 0,
    timestamp: new Date().toISOString(),
  });

  return (
    <main id="ventas-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de ventas y las interacciones del usuario.
        Se pasan los datos ya procesados y validados desde el servidor.
      */}
      <VentasClient ventasExpandidas={ventasExpandidas} />
    </main>
  );
}
