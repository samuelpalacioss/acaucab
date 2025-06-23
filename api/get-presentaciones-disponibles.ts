import { PresentacionType } from "@/lib/schemas"
import { llamarFuncion } from "@/lib/server-actions"

export async function getPresentacionesDisponibles(p_id_tienda_fisica?: number): Promise<PresentacionType[]> {
    try {
        const response = await llamarFuncion('fn_get_presentaciones_disponibles_tienda', { p_id_tienda_fisica })
        return response as PresentacionType[]
    } catch (error) {
        console.error(`Error al obtener las presentaciones disponibles:`, error)
        throw new Error('Ocurrió un error al intentar obtener las presentaciones disponibles.')
    }
}