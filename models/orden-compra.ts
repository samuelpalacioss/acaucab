/**
 * Modelo para Orden de Compra
 * Define la estructura de datos para las órdenes de compra
 */

/**
 * Modelo para la vista detallada de una Orden de Compra
 */
export interface OrdenCompra {
  orden_id: number;
  fecha_solicitud: string;
  fecha_entrega: string | null;
  observacion: string | null;
  unidades_solicitadas: number;
  // Información del producto
  sku: string;
  nombre_cerveza: string;
  nombre_presentacion: string;
  precio_unitario: number;
  precio_total: number;
  imagen_url: string | null;
  // Información del usuario
  usuario_nombre: string | null;
  // Información del proveedor
  proveedor_rif: number | null;
  proveedor_naturaleza_rif: string | null;
  proveedor_razon_social: string | null;
  // Estado actual de la orden
  estado_actual: string;
}

/**
 * Modelo para el resumen de una Orden de Compra (para listados)
 */
export interface OrdenCompraResumen {
  orden_id: number;
  fecha_solicitud: string;
  proveedor_rif: number | null;
  proveedor_naturaleza_rif: string | null;
  proveedor_razon_social: string | null;
  usuario_nombre: string | null;
  precio_total: number;
  estado_actual: string;
}

export type OrdenesCompraData = OrdenCompraResumen[]; 