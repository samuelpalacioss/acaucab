import { llamarFuncionSingle } from "@/lib/server-actions";
import { CarritoItemEventoType } from "@/lib/schemas";

/**
 * Finaliza los detalles de una venta de evento actualizando el precio unitario de cada item.
 * Esto se hace cuando la venta de evento pasa de 'en proceso' a 'finalizada'.
 * La actualización de cada detalle activará el trigger en la DB que recalcula
 * el monto total de la venta de evento.
 *
 * @param ventaId - El ID de la venta de evento a finalizar.
 * @param carrito - El array de items del carrito con los precios finales y datos de proveedor/evento.
 * @returns - Una promesa que resuelve a `true` si todo se actualiza correctamente.
 */
export async function finalizarDetallesVentaEvento(
  ventaId: number,
  carrito: CarritoItemEventoType[]
): Promise<boolean> {
  try {
    for (const item of carrito) {
      const params = {
        p_fk_venta_evento: ventaId,
        p_fk_presentacion: item.presentacion_id,
        p_fk_cerveza: item.cerveza_id,
        p_precio_unitario: item.precio,
        p_proveedor_id1: item.proveedorId1,
        p_proveedor_id2: item.proveedorId2,
        p_evento_id: item.evento_id,
      };
      await llamarFuncionSingle("fn_actualizar_precio_detalle_venta_evento", params);
    }

    console.log(`Detalles de la venta de evento ${ventaId} finalizados correctamente.`);
    return true;
  } catch (error) {
    console.error(`Error al finalizar los detalles de la venta de evento ${ventaId}:`, error);
    return false;
  }
}
