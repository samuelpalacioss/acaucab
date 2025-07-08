// Registra los detalles de una venta en proceso para un evento
// Debes implementar la llamada real a la función SQL correspondiente
import { llamarFuncion } from "@/lib/server-actions";
import type { CarritoItemType } from "@/lib/schemas";

export async function registrarDetallesVentaEventoEnProceso(ventaId: number, carrito: CarritoItemType[]): Promise<boolean> {
  if (!ventaId) {
    console.error("ID de venta de evento inválido.");
    return false;
  }
  try {
    // Limpiar detalles existentes para esta venta de evento
    await llamarFuncion("fn_limpiar_detalles_venta_evento", { p_venta_id: ventaId });

    if (!carrito || carrito.length === 0) {
      console.log(`No hay items en el carrito para la venta de evento ID: ${ventaId}. Detalles limpiados.`);
      return true;
    }

    console.log(`Registrando ${carrito.length} tipos de items para la venta de evento ID: ${ventaId}`);

    // Registrar cada item individualmente
    for (const item of carrito) {
      await llamarFuncion(
        "fn_registrar_detalle_presentacion_evento_en_proceso",
        {
          p_presentacion_id: item.presentacion_id,
          p_cerveza_id: item.cerveza_id,
          p_venta_id: ventaId,
          p_cantidad: item.quantity,
          p_evento_id: (item as any).evento_id ?? ventaId, // Usar evento_id real si está presente
          p_proveedorid1: (item as any).proveedorId1 ?? null,
          p_proveedorid2: (item as any).proveedorId2 ?? null,
        }
      );
      console.log(`Detalle registrado para ${item.sku} (cantidad: ${item.quantity})`);
    }

    console.log("Todos los detalles de la venta de evento han sido registrados exitosamente.");
    return true;
  } catch (error) {
    console.error("Error al registrar los detalles de la venta de evento:", error);
    if (error instanceof Error) {
      throw new Error(`Error al registrar detalles de la venta de evento: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al registrar los detalles de la venta de evento.");
  }
}
