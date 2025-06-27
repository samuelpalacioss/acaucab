import { llamarFuncion } from "@/lib/server-actions";
import { CarritoItemType } from "@/lib/schemas";

export async function registrarDetallesVentaEnProceso(
  ventaId: number,
  carrito: CarritoItemType[]
): Promise<boolean> {
  if (!ventaId) {
    console.error("ID de venta inválido.");
    return false;
  }

  try {
    // Primero, limpiar los detalles existentes para esta venta
    await llamarFuncion("fn_limpiar_detalles_venta", { p_venta_id: ventaId });

    // Si el carrito está vacío, no hay nada más que hacer
    if (!carrito || carrito.length === 0) {
      console.log(`No hay items en el carrito para la venta ID: ${ventaId}. Detalles limpiados.`);
      return true;
    }
    
    console.log(
      `Registrando ${carrito.length} tipos de items para la venta ID: ${ventaId}`
    );

    // Luego, registrar los nuevos detalles
    for (const item of carrito) {
      await llamarFuncion(
        "fn_registrar_detalle_presentacion_en_proceso",
        {
          p_venta_id: ventaId,
          p_presentacion_id: item.presentacion_id,
          p_cerveza_id: item.cerveza_id,
          p_cantidad: item.quantity,
        }
      );
      console.log(
        `Detalle registrado para ${item.sku} (cantidad: ${item.quantity})`
      );
    }

    console.log(
      "Todos los detalles de la venta han sido registrados exitosamente."
    );
    return true;
  } catch (error) {
    console.error("Error al registrar los detalles de la venta:", error);
    if (error instanceof Error) {
      throw new Error(
        `Error al registrar detalles de la venta: ${error.message}`
      );
    }
    throw new Error("Ocurrió un error desconocido al registrar los detalles.");
  }
}
