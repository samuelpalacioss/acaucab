/**
 * Interfaz para representar una orden de reposición
 * Basada en la función fn_get_ordenes_de_reposicion de PostgreSQL
 */
export interface OrdenReposicion {
  /** Identificador único de la orden de reposición */
  "ID de Orden": number;
  
  /** Nombre del producto y su presentación */
  "Producto": string;
  
  /** SKU del producto */
  "SKU": string;
  
  /** Cantidad de unidades solicitadas en la orden */
  "Unidades Solicitadas": number;
  
  /** Fecha en que se creó la orden */
  "Fecha de Orden": string;
  
  /** Nombre del lugar en la tienda donde se debe reponer el producto */
  "Lugar de Reposición": string;
  
  /** Estado actual de la orden de reposición */
  "Estado": string;
  
  /** Nombre y apellido del empleado que solicitó la reposición */
  "Empleado": string;
  
  /** Observaciones adicionales de la orden */
  "Observación": string;
}

/**
 * Tipo para representar un array de órdenes de reposición
 */
export type OrdenesReposicionData = OrdenReposicion[];
