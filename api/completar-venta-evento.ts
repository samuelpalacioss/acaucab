/**
 * Completa/finaliza una venta de evento cambiando su status a 'Finalizada'.
 * @param ventaId - ID de la venta de evento.
 * @returns Promise<boolean> - true si el status se actualiza correctamente.
 */
import { llamarFuncionSingle } from "@/lib/server-actions";

export async function CompletarVentaEvento(ventaId: number): Promise<boolean> {
  try {
    const params = {
      p_venta_id: ventaId, // corregido: debe ser p_venta_id
    };
    await llamarFuncionSingle("fn_update_status_venta_evento_a_completado", params);
    console.log(`Venta de evento ${ventaId} marcada como completada.`);
    return true;
  } catch (error) {
    console.error(`Error al completar la venta de evento ${ventaId}:`, error);
    return false;
  }
}
