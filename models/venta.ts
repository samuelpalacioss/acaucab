/**
 * Modelo de datos para Ventas
 * 
 * Define las interfaces TypeScript que representan la estructura
 * de datos de las ventas según el esquema de base de datos PostgreSQL
 */

/**
 * Estado de la venta
 */
export type EstadoVenta = 'Pendiente' | 'En proceso' | 'Entregado' | 'Cancelado';

/**
 * Canal de venta
 */
export type CanalVenta = 'Web' | 'Tienda';

/**
 * Tipo de cliente
 */
export type TipoCliente = 'Natural' | 'Juridico' | 'Usuario';

/**
 * Interface principal para la tabla venta
 * Representa la información principal de las ventas realizadas
 */
export interface Venta {
  /** Identificador único de la venta (SERIAL) */
  id: number;
  
  /** Monto total de la venta (DECIMAL) */
  monto_total: number;
  
  /** Dirección donde se entrega el pedido (VARCHAR) */
  direccion_entrega?: string;
  
  /** Observaciones adicionales de la venta (VARCHAR) */
  observacion?: string;
  
  /** Fecha de la venta (agregado para la interfaz) */
  fecha_venta?: string;
  
  /** Claves foráneas - Referencias a otras tablas */
  fk_usuario?: number;
  fk_lugar?: number;
  fk_cliente_juridico?: number;
  fk_cliente_natural?: number;
  fk_tienda_fisica?: number;
  fk_tienda_web?: number;
}

/**
 * Interface para los detalles de presentación en la venta
 * Almacena los detalles de las presentaciones de productos en cada venta
 */
export interface DetallePresentacion {
  /** Cantidad de productos vendidos (INTEGER) */
  cantidad: number;
  
  /** Precio por unidad del producto (DECIMAL) */
  precio_unitario: number;
  
  /** SKU de la presentación (VARCHAR) */
  fk_presentacion: string;
  
  /** ID de la venta relacionada (INTEGER) */
  fk_venta: number;
}

/**
 * Interface para los datos expandidos de venta
 * Incluye información de clientes, tiendas y productos para la interfaz
 */
export interface VentaExpandida extends Venta {
  /** Nombre del cliente (calculado desde cliente_natural o cliente_juridico) */
  nombre_cliente: string;
  
  /** Tipo de cliente identificado */
  tipo_cliente: TipoCliente;
  
  /** Canal de venta identificado */
  canal_venta: CanalVenta;
  
  /** Estado de la venta */
  estado?: EstadoVenta;
  
  /** Lista de productos/presentaciones en la venta */
  detalles_presentacion?: DetallePresentacion[];
  
  /** Puntos obtenidos por la venta (si aplica) */
  puntos?: number;
  
  /** Moneda utilizada */
  moneda?: string;
}

/**
 * Interface para la respuesta de la función PostgreSQL
 * Estructura que devuelve fn_get_ventas()
 */
export interface VentaResponse {
  id: number;
  monto_total: number;
  direccion_entrega?: string;
  observacion?: string;
  fecha_venta?: string;
  nombre_cliente: string;
  tipo_cliente: string;
  canal_venta: string;
  estado?: string;
  puntos?: number;
  moneda?: string;
  fk_usuario?: number;
  fk_lugar?: number;
  fk_cliente_juridico?: number;
  fk_cliente_natural?: number;
  fk_tienda_fisica?: number;
  fk_tienda_web?: number;
}

/**
 * Interface para filtros de búsqueda de ventas
 */
export interface FiltrosVenta {
  /** Término de búsqueda (ID o cliente) */
  termino_busqueda?: string;
  
  /** Filtro por canal de venta */
  canal?: CanalVenta;
  
  /** Filtro por estado */
  estado?: EstadoVenta;
  
  /** Filtro por tipo de cliente */
  tipo_cliente?: TipoCliente;
  
  /** Filtro por rango de fechas */
  fecha_desde?: string;
  fecha_hasta?: string;
  
  /** Filtro por monto mínimo */
  monto_minimo?: number;
  
  /** Filtro por monto máximo */
  monto_maximo?: number;
}

/**
 * Función utilitaria para transformar VentaResponse a VentaExpandida
 * 
 * @param ventaResponse - Datos de la respuesta de PostgreSQL
 * @returns VentaExpandida - Datos formateados para la interfaz
 */
export function transformarVentaResponse(ventaResponse: VentaResponse): VentaExpandida {
  return {
    id: ventaResponse.id,
    monto_total: ventaResponse.monto_total,
    direccion_entrega: ventaResponse.direccion_entrega,
    observacion: ventaResponse.observacion,
    fecha_venta: ventaResponse.fecha_venta,
    nombre_cliente: ventaResponse.nombre_cliente,
    tipo_cliente: ventaResponse.tipo_cliente as TipoCliente,
    canal_venta: ventaResponse.canal_venta as CanalVenta,
    estado: ventaResponse.estado as EstadoVenta,
    puntos: ventaResponse.puntos || 0,
    moneda: ventaResponse.moneda || 'Bs',
    fk_usuario: ventaResponse.fk_usuario,
    fk_lugar: ventaResponse.fk_lugar,
    fk_cliente_juridico: ventaResponse.fk_cliente_juridico,
    fk_cliente_natural: ventaResponse.fk_cliente_natural,
    fk_tienda_fisica: ventaResponse.fk_tienda_fisica,
    fk_tienda_web: ventaResponse.fk_tienda_web,
  };
}

/**
 * Función utilitaria para validar una venta
 * 
 * @param venta - Datos de la venta a validar
 * @returns boolean - true si la venta es válida
 */
export function validarVenta(venta: Partial<Venta>): boolean {
  // Validaciones básicas requeridas
  if (!venta.monto_total || venta.monto_total <= 0) {
    return false;
  }
  
  // Validar que tenga al menos un tipo de cliente o usuario
  const tieneCliente = !!(
    venta.fk_usuario || 
    venta.fk_cliente_juridico || 
    venta.fk_cliente_natural
  );
  
  if (!tieneCliente) {
    return false;
  }
  
  // Validar que tenga al menos un tipo de tienda
  const tieneTienda = !!(venta.fk_tienda_fisica || venta.fk_tienda_web);
  
  if (!tieneTienda) {
    return false;
  }
  
  return true;
}
