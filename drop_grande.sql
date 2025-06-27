/**
 * Elimina la tabla de vacaciones
 */
DROP TABLE vacacion CASCADE;

/**
 * Elimina la tabla de registros biométricos
 */
DROP TABLE registro_biometrico CASCADE;

/**
 * Elimina la tabla de relación entre horarios y nóminas
 */
DROP TABLE horario_nomina CASCADE;

/**
 * Elimina la tabla de relación entre beneficios y nóminas
 */
DROP TABLE beneficio_nomina CASCADE;

/**
 * Elimina la tabla de nóminas
 */
DROP TABLE nomina CASCADE;

/**
 * Elimina la tabla de horarios
 */
DROP TABLE horario CASCADE;

/**
 * Elimina la tabla de empleados
 */
DROP TABLE empleado CASCADE;

/**
 * Elimina la tabla de departamentos
 */
DROP TABLE departamento CASCADE;

/**
 * Elimina la tabla de cargos
 */
DROP TABLE cargo CASCADE;

/**
 * Elimina la tabla de beneficios
 */
DROP TABLE beneficio CASCADE;


DROP TABLE lugar CASCADE;

-- Usuarios

DROP TABLE permiso_rol CASCADE;
DROP TABLE permiso CASCADE;
DROP TABLE miembro_usuario CASCADE;
DROP TABLE empleado_usuario CASCADE;
DROP TABLE persona_contacto CASCADE;
DROP TABLE telefono CASCADE;
DROP TABLE cliente_usuario CASCADE;
DROP TABLE cliente_juridico CASCADE;
DROP TABLE cliente_natural CASCADE;
DROP TABLE usuario CASCADE;
DROP TABLE correo CASCADE;
DROP TABLE miembro CASCADE;
DROP TABLE rol CASCADE; 

/**
 * Elimina la tabla de descuentos
 */
DROP TABLE descuento CASCADE;

/**
 * Elimina la tabla de relación entre tipos de cerveza e ingredientes
 */
DROP TABLE tipo_cerveza_ingrediente CASCADE;

/**
 * Elimina la tabla de relación entre cervezas y características
 */
DROP TABLE cerveza_caracteristica CASCADE;

/**
 * Elimina la tabla de relación entre presentaciones y cervezas
 */
DROP TABLE presentacion_cerveza CASCADE;

/**
 * Elimina la tabla de cervezas
 */
DROP TABLE cerveza CASCADE;

/**
 * Elimina la tabla de tipos de cerveza
 */
DROP TABLE tipo_cerveza CASCADE;

/**
 * Elimina la tabla de ingredientes
 */
DROP TABLE ingrediente CASCADE;

/**
 * Elimina la tabla de características
 */
DROP TABLE caracteristica CASCADE;

/**
 * Elimina la tabla de presentaciones
 */
DROP TABLE presentacion CASCADE;

/**
 * Elimina la tabla de períodos de descuento
 */
DROP TABLE periodo_descuento CASCADE;

/**
 * Elimina la tabla de colores
 */
DROP TABLE color CASCADE;

/**
 * Elimina la tabla de órdenes de reposición
 */
DROP TABLE orden_de_reposicion CASCADE;

/**
 * Elimina la tabla de inventario de lugares de tienda
 */
DROP TABLE lugar_tienda_inventario CASCADE;

/**
 * Elimina la tabla de lugares de tienda
 */
DROP TABLE lugar_tienda CASCADE;

/**
 * Elimina la tabla de inventario
 */
DROP TABLE inventario CASCADE;

/**
 * Elimina la tabla de almacenes
 */
DROP TABLE almacen CASCADE;

/**
 * Elimina la tabla de tiendas físicas
 */
DROP TABLE tienda_fisica CASCADE;

/**
 * Elimina la tabla de tiendas web
 */
DROP TABLE tienda_web CASCADE;

/**
 * Eventos
 */

DROP TABLE stock_miembro CASCADE;
DROP TABLE evento_cliente CASCADE;
DROP TABLE invitado_evento CASCADE;
DROP TABLE evento CASCADE;
DROP TABLE invitado CASCADE;
DROP TABLE tipo_invitado CASCADE;
DROP TABLE tipo_evento CASCADE; 

/**
 * Venta 1
 */

DROP TABLE detalle_presentacion CASCADE;
DROP TABLE miembro_presentacion_cerveza CASCADE;
DROP TABLE venta CASCADE; 

/**
 * Venta 2  
 */

DROP TABLE detalle_evento CASCADE;
DROP TABLE orden_de_compra CASCADE;
DROP TABLE venta_evento CASCADE; 

/**
 * Pago
 */

DROP TABLE IF EXISTS cliente_metodo_pago CASCADE;
DROP TABLE IF EXISTS miembro_metodo_pago CASCADE;
DROP TABLE IF EXISTS mensualidad CASCADE;
DROP TABLE IF EXISTS afiliacion CASCADE;
DROP TABLE IF EXISTS tasa CASCADE;
DROP TABLE IF EXISTS metodo_pago CASCADE;
DROP TABLE IF EXISTS pago CASCADE;
 
-- Drop status system tables in correct order (handling dependencies)
DROP TABLE IF EXISTS status_orden CASCADE;
DROP TABLE IF EXISTS status_mensualidad CASCADE;
DROP TABLE IF EXISTS status_venta CASCADE;
DROP TABLE IF EXISTS status CASCADE;