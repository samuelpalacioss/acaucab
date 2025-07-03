import { llamarFuncion } from "@/lib/server-actions";

export const getPresentacionBySku = async (sku: string) => {
  try {
    const response = await llamarFuncion('fn_get_presentacion_by_sku', { 
      p_sku: sku 
    });
    
    // The function returns an array, we expect only one result for a given SKU
    return response && response.length > 0 ? response[0] : null;

  } catch (error) {
    console.error(`Error fetching presentacion with SKU ${sku}:`, error);
    throw new Error('Ocurrió un error al intentar obtener la presentación.')
  }
}; 