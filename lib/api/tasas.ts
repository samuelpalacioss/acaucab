'use server';

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

/**
 * Obtiene las últimas tasas de cambio para todas las monedas principales (USD, PUNTO, EUR).
 * @returns TasaType[] - Array con las últimas tasas de cambio
 */
export async function getUltimasTasas(): Promise<TasaType[]> {
    try {
        const monedas = ['USD', 'PUNTO', 'EUR'];
        const promises = monedas.map(moneda => getUltimaTasaByMoneda(moneda));
        const results = await Promise.all(promises);
        
        // Filter out null results in case a currency rate is not found
        const tasas = results.filter(tasa => tasa !== null) as TasaType[];
        return tasas;

    } catch (error) {
        console.error(`Error al obtener las últimas tasas de cambio:`, error)
        throw new Error('Ocurrió un error al intentar obtener las últimas tasas de cambio.')
    }
}

