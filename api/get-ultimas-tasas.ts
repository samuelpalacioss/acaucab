import { TasaType } from "@/lib/schemas"
import { getUltimaTasaByMoneda } from "./get-ultima-tasa-by-moneda"

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