import { llamarFuncion } from "@/lib/server-actions";
import { CarritoItemType } from "@/lib/schemas";

export async function registrarDetallesVentaEnProceso(
  ventaId: number,
  carrito: CarritoItemType[]
): Promise<boolean> {
  if (!ventaId || !carrito || carrito.length === 0) {
    console.error("ID de venta o carrito inválidos.");
    return false;
  }

  console.log(
    `Registrando ${carrito.length} tipos de items para la venta ID: ${ventaId}`
  );

  try {
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
