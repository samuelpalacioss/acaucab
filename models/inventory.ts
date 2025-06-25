/**
 * Modelo para la respuesta de la función fn_get_inventory
 * Representa los datos del inventario con stock en almacén y anaquel
 */
export interface InventoryItem {
  /** SKU único de la presentación de cerveza o combinación de IDs si es nulo */
  SKU: string;
  /** Nombre de la cerveza */
  Nombre: string;
  /** Tipo o categoría de la cerveza */
  Categoría: string;
  /** Cantidad total de stock (almacén + anaquel) */
  "Stock Total": number;
  /** Cantidad de unidades en todos los almacenes */
  "En Almacén": number;
  /** Cantidad de unidades en todas las tiendas físicas (anaqueles) */
  "En Anaquel": number;
}

/**
 * Tipo para el array de items del inventario
 */
export type InventoryData = InventoryItem[];
