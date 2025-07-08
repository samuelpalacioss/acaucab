import { llamarFuncionSingle } from "@/lib/server-actions";

/**
 * Registra una nueva venta de evento con el estado 'En Proceso'.
 * @param eventoId - El ID del evento.
 * @param clienteId - El ID del cliente.
 * @param tipoCliente - El tipo de cliente ('Natural' o 'Juridico').
 * @returns number | null - El ID de la venta recién creada o null si hay un error.
 */
export async function registrarVentaEventoEnProceso(
  eventoId: number,
  clienteId: number,
  tipoCliente: 'Natural' | 'Juridico'
): Promise<number | null> {
  try {
    const params = {
      p_evento_id: eventoId,
      p_cliente_id: clienteId,
      p_tipo_cliente: tipoCliente,
    };
    const result = await llamarFuncionSingle<{ id_venta: number }>(
      'fn_registrar_venta_evento_en_proceso',
      params
    );
    const ventaId = result?.id_venta ?? null;
    if (ventaId) {
      console.log(`Venta de evento registrada con ID: ${ventaId}`);
    }
    return ventaId;
  } catch (error) {
    console.error(`Error al registrar la venta de evento:`, error);
    throw new Error('Ocurrió un error al intentar registrar la venta de evento.');
  }
}