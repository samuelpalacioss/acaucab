import { PresentacionType } from "@/lib/schemas"
import { llamarFuncion } from "@/lib/server-actions"

export async function getPresentacionesDisponiblesWeb(p_id_tienda_web?: number): Promise<PresentacionType[]> {
    try {
        const response = await llamarFuncion('fn_get_presentaciones_disponibles_web', { p_id_tienda_web })
        return response as PresentacionType[]
    } catch (error) {
        console.error(`Error al obtener las presentaciones disponibles para la web:`, error)
        throw new Error('Ocurrió un error al intentar obtener las presentaciones disponibles para la web.')
    }
}