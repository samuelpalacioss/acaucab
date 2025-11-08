'use server';

import { PresentacionType } from "@/lib/schemas"
import { llamarFuncion } from "@/lib/server-actions"

/**
 * Obtiene las presentaciones disponibles para una tienda física.
 * @param p_id_tienda_fisica - El ID de la tienda física (opcional).
 * @returns PresentacionType[] - Array de presentaciones disponibles
 */
export async function getPresentacionesDisponibles(p_id_tienda_fisica?: number): Promise<PresentacionType[]> {
    try {
        const response = await llamarFuncion('fn_get_presentaciones_disponibles_tienda', { p_id_tienda_fisica })
        return response as PresentacionType[]
    } catch (error) {
        console.error(`Error al obtener las presentaciones disponibles:`, error)
        throw new Error('Ocurrió un error al intentar obtener las presentaciones disponibles.')
    }
}

/**
 * Obtiene las presentaciones disponibles para una tienda web.
 * @param p_id_tienda_web - El ID de la tienda web (opcional).
 * @returns PresentacionType[] - Array de presentaciones disponibles
 */
export async function getPresentacionesDisponiblesWeb(p_id_tienda_web?: number): Promise<PresentacionType[]> {
    try {
        const response = await llamarFuncion('fn_get_presentaciones_disponibles_web', { p_id_tienda_web })
        return response as PresentacionType[]
    } catch (error) {
        console.error(`Error al obtener las presentaciones disponibles para la web:`, error)
        throw new Error('Ocurrió un error al intentar obtener las presentaciones disponibles para la web.')
    }
}

/**
 * Obtiene una presentación por su SKU y tienda web.
 * @param sku - El SKU de la presentación.
 * @param id_tienda_web - El ID de la tienda web (opcional).
 * @returns PresentacionType | null - La presentación encontrada o null si no existe
 */
export const getPresentacionBySkuTiendaWeb = async (sku: string, id_tienda_web?: number) => {
  try {
    const response = await llamarFuncion('fn_get_presentacion_by_sku_tienda_web', { 
      p_sku: sku,
      p_id_tienda_web: id_tienda_web
    });
    
    // The function returns an array, we expect only one result for a given SKU
    return response && response.length > 0 ? response[0] : null;

  } catch (error) {
    console.error(`Error fetching presentacion with SKU ${sku}:`, error);
    throw new Error('Ocurrió un error al intentar obtener la presentación.')
  }
};

