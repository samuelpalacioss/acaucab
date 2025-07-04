import { llamarFuncionSingle } from "@/lib/server-actions";

/**
 * Registra una nueva venta con el estado 'En Proceso'.
 * 
 * @param id - El ID del cliente o del usuario.
 * @param type - Especifica si el ID corresponde a un 'cliente' o a un 'usuario'.
 * @param {object} [options] - Opciones para especificar la tienda.
 * @param {number} [options.p_tienda_fisica_id=1] - El ID de la tienda física.
 * @param {number} [options.p_tienda_web_id] - El ID de la tienda web.
 * @returns number | null - El ID de la venta recién creada o null si hay un error.
 */
export async function registrarVentaEnProceso(
  id: number,
  type: 'cliente' | 'usuario',
  options: { p_tienda_fisica_id?: number; p_tienda_web_id?: number } = {}
): Promise<number | null> {
    try {
        const params: {
            p_usuario_id: number | null;
            p_cliente_id: number | null;
            p_tienda_fisica_id: number | null;
            p_tienda_web_id: number | null;
        } = {
            p_usuario_id: null,
            p_cliente_id: null,
            p_tienda_fisica_id: null,
            p_tienda_web_id: null,
        };

        if (type === 'usuario' && options.p_tienda_web_id) {
            params.p_usuario_id = id;
            params.p_tienda_web_id = options.p_tienda_web_id;
        } else if (type === 'cliente') {
            params.p_cliente_id = id;
            params.p_tienda_fisica_id = options.p_tienda_fisica_id || 1;
        } else {
            throw new Error("Parámetros inválidos para registrar la venta. Se requiere tipo 'usuario' para tienda web o 'cliente' para tienda física.");
        }

        const result = await llamarFuncionSingle<{ id_venta: number }>('fn_registrar_venta_en_proceso', params);

        const ventaId = result?.id_venta ?? null;

        if (ventaId) {
          console.log(`Venta en proceso registrada con ID: ${ventaId} para ${type === 'usuario' ? 'tienda web' : 'tienda física'}`);
        }

        return ventaId;

    } catch (error) {
        console.error(`Error al registrar la venta en proceso:`, error);
        throw new Error('Ocurrió un error al intentar registrar la venta.');
    }
} 