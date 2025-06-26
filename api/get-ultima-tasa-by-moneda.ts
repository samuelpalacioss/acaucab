import { TasaType } from "@/lib/schemas"
import { llamarFuncionSingle } from "@/lib/server-actions"

/**
 * Obtiene la última tasa de cambio activa para una moneda específica.
 * @param moneda - El código de la moneda (ej. 'USD', 'EUR').
 * @returns - Una promesa que resuelve al objeto de la tasa o null si no se encuentra.
 */
export async function getUltimaTasaByMoneda(p_moneda: string): Promise<TasaType | null> {
    try {
        const response = await llamarFuncionSingle('fn_get_ultima_tasa_by_moneda', { p_moneda })
        return response
    } catch (error) {
        console.error(`Error al obtener la última tasa de cambio:`, error)
        throw new Error('Ocurrió un error al intentar obtener la última tasa de cambio.')
    }
} 