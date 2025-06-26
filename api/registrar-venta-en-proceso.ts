import { llamarFuncionSingle } from "@/lib/server-actions";

/**
 * Registra una nueva venta con el estado 'En Proceso'.
 * 
 * @param p_cliente_id - El ID del cliente que realiza la compra.
 * @param p_tienda_fisica_id - El ID de la tienda física (por defecto es 1).
 * @returns number | null - El ID de la venta recién creada o null si hay un error.
 */
export async function registrarVentaEnProceso(p_cliente_id: number, p_tienda_fisica_id: number = 1): Promise<number | null> {
    try {
        // La función SQL retorna un único INTEGER, que es el ID de la nueva venta.
        const ventaId = await llamarFuncionSingle<number>('fn_registrar_venta_en_proceso', { 
            p_cliente_id, 
            p_tienda_fisica_id 
        });

        if (ventaId) {
          console.log(`Venta en proceso registrada con ID: ${ventaId}`);
        }

        return ventaId;

    } catch (error) {
        console.error(`Error al registrar la venta en proceso:`, error);
        throw new Error('Ocurrió un error al intentar registrar la venta.');
    }
} 