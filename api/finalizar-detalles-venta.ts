import { llamarFuncionSingle } from "@/lib/server-actions";
import { CarritoItemType } from "@/lib/schemas";

/**
 * Finaliza los detalles de una venta actualizando el precio unitario de cada item.
 * Esto se hace cuando la venta pasa de 'en proceso' a 'finalizada'.
 * La actualización de cada detalle activará el trigger en la DB que recalcula
 * el monto total de la venta.
 *
 * @param ventaId - El ID de la venta a finalizar.
 * @param carrito - El array de items del carrito con los precios finales.
 * @returns - Una promesa que resuelve a `true` si todo se actualiza correctamente.
 */
export async function finalizarDetallesVenta(
  ventaId: number,
  carrito: CarritoItemType[]
): Promise<boolean> {
  try {
    for (const item of carrito) {
      const params = {
        p_fk_venta: ventaId,
        p_fk_presentacion: item.presentacion_id,
        p_precio_unitario: item.precio,
      };
      await llamarFuncionSingle("fn_actualizar_precio_detalle_venta", params);
    }

    console.log(`Detalles de la venta ${ventaId} finalizados correctamente.`);
    return true;
  } catch (error) {
    console.error(`Error al finalizar los detalles de la venta ${ventaId}:`, error);
    return false;
  }
} 