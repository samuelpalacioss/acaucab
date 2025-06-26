import { TasaType } from "@/lib/schemas"
import { llamarFuncionSingle } from "@/lib/server-actions"

export async function getUltimaTasaByMoneda(p_moneda_nombre: string): Promise<TasaType | null> {
    try {
        const response = await llamarFuncionSingle('fn_get_ultima_tasa_by_moneda', { p_moneda_nombre })
        return response
    } catch (error) {
        console.error(`Error al obtener la última tasa de cambio:`, error)
        throw new Error('Ocurrió un error al intentar obtener la última tasa de cambio.')
    }
} 