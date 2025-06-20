/**
 * Modelo de datos para Ventas
 * 
 * Define las interfaces TypeScript que representan la estructura
 * de datos de las ventas según el esquema de base de datos PostgreSQL
 */

/**
 * Estado de la venta
 */
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
  estado?: string;
  
  /** Lista de productos/presentaciones en la venta */
  detalles_presentacion?: DetallePresentacion[];
  
  /** Puntos obtenidos por la venta (si aplica) */
  puntos?: number;
  
  /** Moneda utilizada */
  moneda?: string;
}

/**
 * Interface para la respuesta de la función PostgreSQL
 * Estructura que devuelve fn_get_ventas() - ACTUALIZADA para coincidir con la función SQL
 */
export interface VentaResponse {
  id: number;
  monto_total: number;
  direccion_entrega?: string;  // Cambiado de dirección_entrega
  observacion?: string;        // Cambiado de observación
  tipo_cliente: string;
  nombre_cliente: string;
  tipo_tienda: string;
  lugar_entrega?: string;
  estado_entrega?: string;
  fecha_ultimo_estado?: string; // TIMESTAMP se convierte a string
}

/**
 * Interface para la respuesta de la función PostgreSQL fn_get_venta_by_id()
 * Representa una fila de la respuesta, que incluye detalles del producto.
 */
export interface VentaByIdResponse {
  id: number;
  monto_total: number;
  direccion_entrega?: string;
  observacion?: string;
  tipo_cliente: string;
  nombre_cliente: string;
  tipo_tienda: string;
  lugar_entrega?: string;
  estado_entrega?: string;
  fecha_ultimo_estado?: string;
  producto_nombre: string;
  producto_cantidad: number;
  producto_precio_unitario: number;
  pagos?: PagoDetalle[];
}

/**
 * Interface para representar el detalle de un producto en una venta.
 */
export interface ProductoDetalle {
  nombre: string;
  cantidad: number;
  precio_unitario: number;
}

/**
 * Interface para representar el detalle de un pago en una venta.
 */
export interface PagoDetalle {
  monto: number;
  fecha_pago: string;
  metodo_pago: string;
  referencia: string;
  tasa_bcv?: number;
}

/**
 * Interface para la Venta con sus detalles de productos, ideal para la UI.
 * Extiende VentaExpandida y añade la lista de productos.
 */
export interface VentaDetalleExpansida extends VentaExpandida {
  productos: ProductoDetalle[];
  pagos: PagoDetalle[];
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
  estado?: string;
  
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
 * ACTUALIZADA para manejar la nueva estructura de fn_get_ventas()
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
    fecha_venta: ventaResponse.fecha_ultimo_estado, // Usar fecha_ultimo_estado como fecha_venta
    nombre_cliente: ventaResponse.nombre_cliente,
    tipo_cliente: ventaResponse.tipo_cliente as TipoCliente,
    canal_venta: ventaResponse.tipo_tienda === 'Física' ? 'Tienda' : 'Web', // Mapear tipo_tienda a canal_venta
    estado: ventaResponse.estado_entrega as string,
    puntos: 0, // No viene en la función SQL, asignar valor por defecto
    moneda: 'Bs', // No viene en la función SQL, asignar valor por defecto
    // Las FK no vienen en la función SQL, se pueden omitir o asignar undefined
    fk_usuario: undefined,
    fk_lugar: undefined,
    fk_cliente_juridico: undefined,
    fk_cliente_natural: undefined,
    fk_tienda_fisica: undefined,
    fk_tienda_web: undefined,
  };
}

/**
 * Transforma la respuesta de fn_get_venta_by_id (un array de filas)
 * en un único objeto de venta con un array de productos.
 *
 * @param ventaResponse - Array de la respuesta de PostgreSQL
 * @returns VentaDetalleExpansida - Objeto de venta formateado para la UI, o null si no hay datos.
 */
export function transformarVentaByIdResponse(
  ventaResponse: VentaByIdResponse[]
): VentaDetalleExpansida | null {
  if (!ventaResponse || ventaResponse.length === 0) {
    return null;
  }

  // La información general de la venta es la misma en todas las filas.
  const firstRow = ventaResponse[0];

  // Reutilizamos la transformación base para la información general de la venta.
  const ventaBase = transformarVentaResponse({
    id: firstRow.id,
    monto_total: firstRow.monto_total,
    direccion_entrega: firstRow.direccion_entrega,
    observacion: firstRow.observacion,
    tipo_cliente: firstRow.tipo_cliente,
    nombre_cliente: firstRow.nombre_cliente,
    tipo_tienda: firstRow.tipo_tienda,
    lugar_entrega: firstRow.lugar_entrega,
    estado_entrega: firstRow.estado_entrega,
    fecha_ultimo_estado: firstRow.fecha_ultimo_estado,
  });

  // Mapeamos cada fila a un objeto de detalle de producto.
  const productos: ProductoDetalle[] = ventaResponse.map((row) => ({
    nombre: row.producto_nombre,
    cantidad: row.producto_cantidad,
    precio_unitario: Number(row.producto_precio_unitario),
  }));

  return {
    ...ventaBase,
    productos: productos,
    pagos: firstRow.pagos || [],
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
