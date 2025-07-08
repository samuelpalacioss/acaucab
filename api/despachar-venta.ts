import { llamarFuncionSingle } from "@/lib/server-actions";

/**
 * Llama a la función de base de datos para marcar una venta como 'Despachando'.
 *
 * @param ventaId - El ID de la venta a despachar.
 * @returns - Una promesa que resuelve a `true` si la actualización fue exitosa.
 */
export async function DespacharVenta(ventaId: number): Promise<boolean> {
  try {
    const params = {
      p_venta_id: ventaId,
    };
    await llamarFuncionSingle("fn_update_status_venta_a_despachando", params);

    console.log(`Venta ${ventaId} marcada como despachando.`);
    return true;
  } catch (error) {
    console.error(`Error al despachar la venta ${ventaId}:`, error);
    return false;
  }
} 