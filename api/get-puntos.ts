import { llamarFuncion } from "@/lib/server-actions"

/**
 * ===============================================================================
 * GET PUNTOS
 * ===============================================================================
 *
 * @param p_id_usuario - El ID del usuario para el cual se quieren obtener los puntos.
 * @returns number | null - El número de puntos del usuario o null si no se encuentra.
 */
export async function getPuntos(p_id_usuario: number): Promise<number | null> {
    try {
      const response = await llamarFuncion('fn_get_puntos', { p_id_usuario })
      
      // La función fn_get_puntos devuelve directamente un INTEGER, no un array.
      if (response !== null && typeof response === 'number') {
        return response
      }
      
      return 0

    } catch (error) {
      console.error(`Error al obtener los puntos:`, error)
      throw new Error('Ocurrió un error al intentar obtener los puntos del usuario.')
    }
} 