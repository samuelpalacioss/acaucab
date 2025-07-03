import { llamarFuncion } from "@/lib/server-actions";

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