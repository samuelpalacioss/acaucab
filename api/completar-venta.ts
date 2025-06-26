import { llamarFuncionSingle } from "@/lib/server-actions";

/**
 * Llama a la función de base de datos para marcar una venta como 'Finalizada'.
 *
 * @param ventaId - El ID de la venta a finalizar.
 * @returns - Una promesa que resuelve a `true` si la actualización fue exitosa.
 */
export async function CompletarVenta(ventaId: number): Promise<boolean> {
  try {
    const params = {
      p_venta_id: ventaId,
    };
    await llamarFuncionSingle("fn_update_status_venta_a_completado", params);

    console.log(`Venta ${ventaId} marcada como completada.`);
    return true;
  } catch (error) {
    console.error(`Error al completar la venta ${ventaId}:`, error);
    return false;
  }
} 