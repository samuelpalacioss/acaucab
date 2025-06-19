/**
 * Archivo de inserción de datos para las tablas de venta pt 1
 * Contiene inserts para: detalle_presentacion, miembro_presentacion_cerveza y venta
 * Cada tabla tendrá 10 registros de ejemplo
 */

-- Limpiar las tablas en orden correcto según dependencias de claves foráneas
-- Primero las tablas dependientes, luego las principales
TRUNCATE TABLE detalle_presentacion CASCADE;
TRUNCATE TABLE miembro_presentacion_cerveza CASCADE;
TRUNCATE TABLE venta RESTART IDENTITY CASCADE;

-- Reiniciar las secuencias de IDs
ALTER SEQUENCE venta_id_seq RESTART WITH 1;

/**
 * Inserción de datos para la tabla venta
 * Almacena información principal de las ventas realizadas
 * @param monto_total - Monto total de la venta (tipo: DECIMAL)
 * @param dirección_entrega - Dirección de entrega del pedido (tipo: VARCHAR)
 * @param observación - Observaciones adicionales de la venta (tipo: VARCHAR)
 * @param fk_usuario - Clave foránea del usuario para tienda web (tipo: INTEGER)
 * @param fk_lugar - Clave foránea del lugar de entrega (tipo: INTEGER)
 * @param fk_cliente_juridico - Clave foránea del cliente jurídico para tienda física (tipo: INTEGER)
 * @param fk_cliente_natural - Clave foránea del cliente natural para tienda física (tipo: INTEGER)
 * @param fk_tienda_fisica - Clave foránea de la tienda física (tipo: INTEGER)
 * @param fk_tienda_web - Clave foránea de la tienda web (tipo: INTEGER)
 */
INSERT INTO venta (monto_total, dirección_entrega, observación, fk_usuario, fk_lugar, fk_cliente_juridico, fk_cliente_natural, fk_tienda_fisica, fk_tienda_web) VALUES
(10.00, NULL, 'Entrega urgente solicitada', NULL, NULL, 1, NULL, 1, NULL),  /** Venta en tienda física con cliente jurídico */
(18.00, NULL, 'Cliente frecuente', NULL, NULL, NULL, 1, 2, NULL),        /** Venta en tienda física con cliente natural */
(29.00, 'Av. Libertador #42, San Francisco', 'Pedido especial para evento', 3, 458, NULL, NULL, NULL, 1), /** Venta en tienda web con usuario */
(39.00, NULL, 'Pago en efectivo', NULL, NULL, 2, NULL, 3, NULL),              /** Venta en tienda física con cliente jurídico */
(10.00, NULL, 'Descuento aplicado', NULL, NULL, NULL, 2, 4, NULL),      /** Venta en tienda física con cliente natural */
(32.00, 'Av. Rio Rio #41, El Morro', 'Entrega coordinada', 15, 442, NULL, NULL, NULL, 2),             /** Venta en tienda web con usuario */
(49.00, NULL, 'Cliente nuevo', NULL, NULL, 3, NULL, 5, NULL),                      /** Venta en tienda física con cliente jurídico */
(29.00, NULL, 'Pedido corporativo', NULL, NULL, NULL, 3, 1, NULL),       /** Venta en tienda física con cliente natural */
(18.00, 'Calle Miranda #123', 'Entrega express', 16, 369, NULL, NULL, NULL, 3),                     /** Venta en tienda web con usuario */
(59.00, NULL, 'Venta promocional', NULL, NULL, 4, NULL, 2, NULL),       /** Venta en tienda física con cliente jurídico */

/** Ventas adicionales para clientes naturales - 2 ventas por cada cliente natural  (40 ventas) */
(39.00, NULL, 'Primera compra del cliente', NULL, NULL, NULL, 1, 1, NULL),            /** Venta 11: Cliente natural 1 - primera venta */
(14.00, NULL, 'Segunda compra del mes', NULL, NULL, NULL, 1, 2, NULL),               /** Venta 12: Cliente natural 1 - segunda venta */
(49.00, NULL, 'Pedido regular', NULL, NULL, NULL, 2, 3, NULL),                     /** Venta 13: Cliente natural 2 - primera venta */
(29.00, NULL, 'Compra especial', NULL, NULL, NULL, 2, 4, NULL),                  /** Venta 14: Cliente natural 2 - segunda venta */
(14.00, 'Calle Orinoco, Edif. Plaza Mayor, Ucata', 'Venta matutina', 15, 388, NULL, NULL, NULL, 1),                          /** Venta 15: Cliente natural 3 - primera venta - WEB */
(59.00, NULL, 'Venta vespertina', NULL, NULL, NULL, 3, 1, NULL),                       /** Venta 16: Cliente natural 3 - segunda venta */  
(27.00, NULL, 'Compra fin de semana', NULL, NULL, NULL, 4, 2, NULL),                 /** Venta 17: Cliente natural 4 - primera venta */
(10.00, 'Universidad Catolica Andres Bello, Caracas', 'Pedido express', 18, 362, NULL, NULL, NULL, 1),                        /** Venta 18: Cliente natural 4 - segunda venta - WEB */
(39.00, NULL, 'Venta corporativa', NULL, NULL, NULL, 5, 4, NULL),                        /** Venta 19: Cliente natural 5 - primera venta */
(29.00, NULL, 'Pedido especial evento', NULL, NULL, NULL, 5, 5, NULL),                  /** Venta 20: Cliente natural 5 - segunda venta */
(18.00, 'Av. Venezuela, El Rosal, Torre Financiera', 'Compra mensual', 21, 421, NULL, NULL, NULL, 1),                      /** Venta 21: Cliente natural 6 - primera venta - WEB */
(19.00, NULL, 'Venta promocional', NULL, NULL, NULL, 6, 2, NULL),                 /** Venta 22: Cliente natural 6 - segunda venta */
(53.00, NULL, 'Pedido urgente', NULL, NULL, NULL, 7, 3, NULL),                        /** Venta 23: Cliente natural 7 - primera venta */
(10.00, 'Calle Londres, Coche', 'Compra regular', 24, 365, NULL, NULL, NULL, 1),                         /** Venta 24: Cliente natural 7 - segunda venta - WEB */
(37.00, NULL, 'Venta especial', NULL, NULL, NULL, 8, 5, NULL),                       /** Venta 25: Cliente natural 8 - primera venta */
(59.00, NULL, 'Segunda compra', NULL, NULL, NULL, 8, 1, NULL),                        /** Venta 26: Cliente natural 8 - segunda venta */
(14.00, 'Av. Río de Janeiro, casa 3', 'Compra mayorista', 27, 427, NULL, NULL, NULL, 1),                   /** Venta 27: Cliente natural 9 - primera venta - WEB */
(19.00, NULL, 'Pedido regular', NULL, NULL, NULL, 9, 3, NULL),                     /** Venta 28: Cliente natural 9 - segunda venta */
(43.00, NULL, 'Venta matinal', NULL, NULL, NULL, 10, 4, NULL),                     /** Venta 29: Cliente natural 10 - primera venta */
(29.00, 'Av. Principal de La Castellana, Torre Sky', 'Compra nocturna', 30, 430, NULL, NULL, NULL, 1),                 /** Venta 30: Cliente natural 10 - segunda venta - WEB */
(49.00, NULL, 'Pedido estándar', NULL, NULL, NULL, 11, 1, NULL),                     /** Venta 31: Cliente natural 11 - primera venta */
(14.00, NULL, 'Venta especial', NULL, NULL, NULL, 11, 2, NULL),                     /** Venta 32: Cliente natural 11 - segunda venta */
(19.00, 'Calle Madrid, Coromoto, Piso 8', 'Compra quincenal', 33, 400, NULL, NULL, NULL, 1),                  /** Venta 33: Cliente natural 12 - primera venta - WEB */
(67.00, NULL, 'Pedido express', NULL, NULL, NULL, 12, 4, NULL),                     /** Venta 34: Cliente natural 12 - segunda venta */
(29.00, NULL, 'Primera compra', NULL, NULL, NULL, 13, 5, NULL),                    /** Venta 35: Cliente natural 13 - primera venta */
(10.00, 'Av. Eugenio Mendoza, Anaco, Torre 1', 'Segunda compra', 36, 415, NULL, NULL, NULL, 1),                     /** Venta 36: Cliente natural 13 - segunda venta - WEB */
(57.00, NULL, 'Venta corporativa', NULL, NULL, NULL, 14, 2, NULL),                /** Venta 37: Cliente natural 14 - primera venta */
(19.00, NULL, 'Pedido regular', NULL, NULL, NULL, 14, 3, NULL),                   /** Venta 38: Cliente natural 14 - segunda venta */
(43.00, 'Calle Los Laboratorios, Los Cortijos, Edif. Médico', 'Compra semanal', 39, 439, NULL, NULL, NULL, 1),                        /** Venta 39: Cliente natural 15 - primera venta - WEB */
(29.00, NULL, 'Venta promocional', NULL, NULL, NULL, 15, 5, NULL),                    /** Venta 40: Cliente natural 15 - segunda venta */
(18.00, NULL, 'Pedido especial', NULL, NULL, NULL, 16, 1, NULL),                    /** Venta 41: Cliente natural 16 - primera venta */
(10.00, 'Av. Blandin, Guanta, Centro Profesional', 'Compra regular', 42, 432, NULL, NULL, NULL, 1),                      /** Venta 42: Cliente natural 16 - segunda venta - WEB */
(43.00, NULL, 'Venta matutina', NULL, NULL, NULL, 17, 3, NULL),                       /** Venta 43: Cliente natural 17 - primera venta */
(29.00, NULL, 'Pedido vespertino', NULL, NULL, NULL, 17, 4, NULL),                     /** Venta 44: Cliente natural 17 - segunda venta */
(57.00, NULL, 'Compra fin de mes', NULL, NULL, NULL, 18, 5, NULL),                     /** Venta 45: Cliente natural 18 - primera venta */
(19.00, NULL, 'Venta especial', NULL, NULL, NULL, 18, 1, NULL),                         /** Venta 46: Cliente natural 18 - segunda venta */
(59.00, NULL, 'Pedido mayorista', NULL, NULL, NULL, 19, 2, NULL),                  /** Venta 47: Cliente natural 19 - primera venta */
(18.00, NULL, 'Compra regular', NULL, NULL, NULL, 19, 3, NULL),                    /** Venta 48: Cliente natural 19 - segunda venta */
(29.00, NULL, 'Venta promocional', NULL, NULL, NULL, 20, 4, NULL),                 /** Venta 49: Cliente natural 20 - primera venta */
(10.00, NULL, 'Pedido especial', NULL, NULL, NULL, 20, 5, NULL),                     /** Venta 50: Cliente natural 20 - segunda venta */

/** Ventas adicionales para clientes jurídicos - 2 ventas por cada cliente jurídico (40 ventas) */
(47.00, NULL, 'Pedido corporativo mensual', NULL, NULL, 1, NULL, 1, NULL),         /** Venta 51: Cliente jurídico 1 - primera venta */
(19.00, NULL, 'Compra para eventos', NULL, NULL, 1, NULL, 2, NULL),               /** Venta 52: Cliente jurídico 1 - segunda venta */
(53.00, NULL, 'Pedido regular empresa', NULL, NULL, 2, NULL, 3, NULL),                /** Venta 53: Cliente jurídico 2 - primera venta */
(29.00, NULL, 'Venta corporativa especial', NULL, NULL, 2, NULL, 4, NULL),           /** Venta 54: Cliente jurídico 2 - segunda venta */
(59.00, NULL, 'Compra construcción', NULL, NULL, 3, NULL, 5, NULL),                  /** Venta 55: Cliente jurídico 3 - primera venta */
(14.00, NULL, 'Pedido obra nueva', NULL, NULL, 3, NULL, 1, NULL),                    /** Venta 56: Cliente jurídico 3 - segunda venta */
(23.00, NULL, 'Venta distribución', NULL, NULL, 4, NULL, 2, NULL),                 /** Venta 57: Cliente jurídico 4 - primera venta */
(39.00, NULL, 'Pedido mayorista', NULL, NULL, 4, NULL, 3, NULL),                  /** Venta 58: Cliente jurídico 4 - segunda venta */
(33.00, NULL, 'Compra importación', NULL, NULL, 5, NULL, 4, NULL),                     /** Venta 59: Cliente jurídico 5 - primera venta */
(49.00, NULL, 'Venta comercial', NULL, NULL, 5, NULL, 5, NULL),                        /** Venta 60: Cliente jurídico 5 - segunda venta */
(10.00, NULL, 'Pedido almacén', NULL, NULL, 6, NULL, 1, NULL),                       /** Venta 61: Cliente jurídico 6 - primera venta */
(27.00, NULL, 'Compra bodega', NULL, NULL, 6, NULL, 2, NULL),                        /** Venta 62: Cliente jurídico 6 - segunda venta */
(59.00, NULL, 'Venta comercializadora', NULL, NULL, 7, NULL, 3, NULL),                   /** Venta 63: Cliente jurídico 7 - primera venta */
(33.00, NULL, 'Pedido especial empresa', NULL, NULL, 7, NULL, 4, NULL),                 /** Venta 64: Cliente jurídico 7 - segunda venta */
(39.00, NULL, 'Compra distribuidora', NULL, NULL, 8, NULL, 5, NULL),               /** Venta 65: Cliente jurídico 8 - primera venta */
(19.00, NULL, 'Venta corporativa', NULL, NULL, 8, NULL, 1, NULL),                  /** Venta 66: Cliente jurídico 8 - segunda venta */
(57.00, NULL, 'Pedido importadora', NULL, NULL, 9, NULL, 2, NULL),                    /** Venta 67: Cliente jurídico 9 - primera venta */
(29.00, NULL, 'Compra comercial', NULL, NULL, 9, NULL, 3, NULL),                     /** Venta 68: Cliente jurídico 9 - segunda venta */
(43.00, NULL, 'Venta almacén lambda', NULL, NULL, 10, NULL, 4, NULL),                /** Venta 69: Cliente jurídico 10 - primera venta */
(59.00, NULL, 'Pedido mensual', NULL, NULL, 10, NULL, 5, NULL),                     /** Venta 70: Cliente jurídico 10 - segunda venta */
(19.00, NULL, 'Compra comercializadora zeta', NULL, NULL, 11, NULL, 1, NULL),      /** Venta 71: Cliente jurídico 11 - primera venta */
(18.00, NULL, 'Venta corporativa', NULL, NULL, 11, NULL, 2, NULL),                /** Venta 72: Cliente jurídico 11 - segunda venta */
(68.00, NULL, 'Pedido omega plus', NULL, NULL, 12, NULL, 3, NULL),                /** Venta 73: Cliente jurídico 12 - primera venta */
(14.00, NULL, 'Compra especial', NULL, NULL, 12, NULL, 4, NULL),                 /** Venta 74: Cliente jurídico 12 - segunda venta */
(59.00, NULL, 'Venta corporación alpha', NULL, NULL, 13, NULL, 5, NULL),           /** Venta 75: Cliente jurídico 13 - primera venta */
(19.00, NULL, 'Pedido empresarial', NULL, NULL, 13, NULL, 1, NULL),               /** Venta 76: Cliente jurídico 13 - segunda venta */
(47.00, NULL, 'Compra servicios bravo', NULL, NULL, 14, NULL, 2, NULL),            /** Venta 77: Cliente jurídico 14 - primera venta */
(29.00, NULL, 'Venta regular', NULL, NULL, 14, NULL, 3, NULL),                     /** Venta 78: Cliente jurídico 14 - segunda venta */
(49.00, NULL, 'Pedido constructora charlie', NULL, NULL, 15, NULL, 4, NULL),      /** Venta 79: Cliente jurídico 15 - primera venta */
(27.00, NULL, 'Compra obra grande', NULL, NULL, 15, NULL, 5, NULL),              /** Venta 80: Cliente jurídico 15 - segunda venta */
(59.00, NULL, 'Venta logística delta', NULL, NULL, 16, NULL, 1, NULL),             /** Venta 81: Cliente jurídico 16 - primera venta */
(29.00, NULL, 'Pedido transporte', NULL, NULL, 16, NULL, 2, NULL),                /** Venta 82: Cliente jurídico 16 - segunda venta */
(43.00, NULL, 'Compra importadora echo', NULL, NULL, 17, NULL, 3, NULL),           /** Venta 83: Cliente jurídico 17 - primera venta */
(19.00, NULL, 'Venta comercial', NULL, NULL, 17, NULL, 4, NULL),                   /** Venta 84: Cliente jurídico 17 - segunda venta */
(57.00, NULL, 'Pedido comercial foxtrot', NULL, NULL, 18, NULL, 5, NULL),          /** Venta 85: Cliente jurídico 18 - primera venta */
(10.00, NULL, 'Compra regular', NULL, NULL, 18, NULL, 1, NULL),                    /** Venta 86: Cliente jurídico 18 - segunda venta */
(33.00, NULL, 'Venta distribuidora golf', NULL, NULL, 19, NULL, 2, NULL),         /** Venta 87: Cliente jurídico 19 - primera venta */
(59.00, NULL, 'Pedido mayorista', NULL, NULL, 19, NULL, 3, NULL),                /** Venta 88: Cliente jurídico 19 - segunda venta */
(23.00, NULL, 'Compra exportadora hotel', NULL, NULL, 20, NULL, 4, NULL),        /** Venta 89: Cliente jurídico 20 - primera venta */
(39.00, NULL, 'Venta internacional', NULL, NULL, 20, NULL, 5, NULL);            /** Venta 90: Cliente jurídico 20 - segunda venta */

/**
 * Inserción de datos para la tabla detalle_presentacion  
 * Almacena los detalles de las presentaciones de productos en cada venta
 * Cada venta contiene una cantidad total de 10 productos (suma de cantidades)
 * @param cantidad - Cantidad de productos vendidos (tipo: INTEGER)
 * @param precio_unitario - Precio por unidad del producto (tipo: DECIMAL)
 * @param fk_inventario_1 - Primera clave foránea del inventario - SKU (tipo: VARCHAR)
 * @param fk_inventario_2 - Segunda clave foránea del inventario - ID cerveza (tipo: INTEGER)
 * @param fk_inventario_3 - Tercera clave foránea del inventario - ID almacén (tipo: INTEGER)
 * @param fk_venta - Clave foránea que referencia la venta (tipo: INTEGER)
 */
INSERT INTO detalle_presentacion (cantidad, precio_unitario, fk_presentacion, fk_cerveza, fk_venta) VALUES
/** Venta 1: 5 botellas + 3 latas + 2 growlers = 10 productos */
(5, 1.00, 'B330', 1, 1),       /** 5 botellas 330ml cerveza 1 */
(3, 1.00, 'L330', 3, 1),       /** 3 latas 330ml cerveza 3 */
(2, 1.00, 'G1L', 9, 1),       /** 2 growlers 1L cerveza 9 */

/** Venta 2: 4 botellas 500ml + 2 six-packs + 4 latas = 10 productos */
(4, 1.00, 'B500', 2, 2),       /** 4 botellas 500ml cerveza 2 */
(2, 5.00, 'SP330', 4, 2),     /** 2 six-packs 330ml cerveza 4 */
(4, 1.00, 'L330', 3, 2),       /** 4 latas 330ml cerveza 3 */

/** Venta 3: 6 botellas + 2 botellas 500ml + 1 caja + 1 lata = 10 productos */
(6, 1.00, 'B330', 1, 3),       /** 6 botellas 330ml cerveza 1 */
(2, 1.00, 'B500', 2, 3),       /** 2 botellas 500ml cerveza 2 */
(1, 20.00, 'C24330', 5, 3),    /** 1 caja 24 unidades cerveza 5 */
(1, 1.00, 'L330', 3, 3),       /** 1 lata 330ml cerveza 3 */

/** Venta 4: 3 botellas + 2 latas + 1 barril + 4 botellas 330ml cerveza 11 = 10 productos */
(3, 1.00, 'B330', 1, 4),       /** 3 botellas 330ml cerveza 1 */
(2, 1.00, 'L330', 3, 4),       /** 2 latas 330ml cerveza 3 */
(1, 30.00, 'B20', 6, 4),       /** 1 barril 20L cerveza 6 */
(4, 1.00, 'B330', 11, 4),      /** 4 botellas 330ml cerveza 11 */

/** Venta 5: 5 botellas 500ml + 3 latas + 2 growlers = 10 productos */
(5, 1.00, 'B500', 12, 5),      /** 5 botellas 500ml cerveza 12 */
(3, 1.00, 'L330', 13, 5),      /** 3 latas 330ml cerveza 13 */
(2, 1.00, 'G1L', 9, 5),       /** 2 growlers 1L cerveza 9 */

/** Venta 6: 4 botellas + 1 six-pack + 3 latas + 2 cajas 12 unidades = 10 productos */
(4, 1.00, 'B330', 1, 6),       /** 4 botellas 330ml cerveza 1 */
(1, 5.00, 'SP330', 14, 6),    /** 1 six-pack 330ml cerveza 14 */
(3, 1.00, 'L330', 3, 6),       /** 3 latas 330ml cerveza 3 */
(2, 10.00, 'C12500', 10, 6),   /** 2 cajas 12 unidades 500ml cerveza 10 */

/** Venta 7: 7 botellas + 1 barril + 2 latas = 10 productos */
(7, 1.00, 'B330', 11, 7),      /** 7 botellas 330ml cerveza 11 */
(1, 40.00, 'B30', 7, 7),      /** 1 barril 30L cerveza 7 */
(2, 1.00, 'L330', 13, 7),      /** 2 latas 330ml cerveza 13 */

/** Venta 8: 6 botellas + 1 caja + 3 latas = 10 productos */
(6, 1.00, 'B330', 1, 8),       /** 6 botellas 330ml cerveza 1 */
(1, 20.00, 'C24330', 15, 8),   /** 1 caja 24 unidades cerveza 15 */
(3, 1.00, 'L330', 3, 8),       /** 3 latas 330ml cerveza 3 */

/** Venta 9: 5 botellas 500ml + 2 six-packs + 3 latas = 10 productos */
(5, 1.00, 'B500', 2, 9),       /** 5 botellas 500ml cerveza 2 */
(2, 5.00, 'SP330', 4, 9),     /** 2 six-packs 330ml cerveza 4 */
(3, 1.00, 'L330', 13, 9),      /** 3 latas 330ml cerveza 13 */

/** Venta 10: 4 botellas + 1 barril + 2 growlers + 3 latas = 10 productos */
(4, 1.00, 'B330', 11, 10),     /** 4 botellas 330ml cerveza 11 */
(1, 50.00, 'B50', 8, 10),     /** 1 barril 50L cerveza 8 */
(2, 1.00, 'G1L', 9, 10),      /** 2 growlers 1L cerveza 9 */
(3, 1.00, 'L330', 3, 10),      /** 3 latas 330ml cerveza 3 */

/** Venta 11: 8 botellas + 1 barril + 1 lata = 10 productos */
(8, 1.00, 'B330', 1, 11),      /** 8 botellas 330ml cerveza 1 */
(1, 30.00, 'B20', 16, 11),     /** 1 barril 20L cerveza 16 */
(1, 1.00, 'L330', 3, 11),      /** 1 lata 330ml cerveza 3 */

/** Venta 12: 3 botellas + 1 six-pack + 2 botellas 500ml + 4 latas = 10 productos */
(3, 1.00, 'B330', 1, 12),      /** 3 botellas 330ml cerveza 1 */
(1, 5.00, 'SP330', 4, 12),    /** 1 six-pack 330ml cerveza 4 */
(2, 1.00, 'B500', 12, 12),     /** 2 botellas 500ml cerveza 12 */
(4, 1.00, 'L330', 3, 12),      /** 4 latas 330ml cerveza 3 */

/** Venta 13: 6 latas + 1 barril + 3 botellas 500ml = 10 productos */
(6, 1.00, 'L330', 13, 13),     /** 6 latas 330ml cerveza 13 */
(1, 40.00, 'B30', 17, 13),    /** 1 barril 30L cerveza 17 */
(3, 1.00, 'B500', 2, 13),      /** 3 botellas 500ml cerveza 2 */

/** Venta 14: 5 botellas + 1 caja + 4 latas = 10 productos */
(5, 1.00, 'B330', 11, 14),     /** 5 botellas 330ml cerveza 11 */
(1, 20.00, 'C24330', 5, 14),   /** 1 caja 24 unidades cerveza 5 */
(4, 1.00, 'L330', 13, 14),     /** 4 latas 330ml cerveza 13 */

/** Venta 15: 4 botellas + 2 botellas 500ml + 1 six-pack + 3 latas = 10 productos */
(4, 1.00, 'B330', 1, 15),      /** 4 botellas 330ml cerveza 1 */
(2, 1.00, 'B500', 2, 15),      /** 2 botellas 500ml cerveza 2 */
(1, 5.00, 'SP330', 14, 15),   /** 1 six-pack 330ml cerveza 14 */
(3, 1.00, 'L330', 3, 15),      /** 3 latas 330ml cerveza 3 */

/** Venta 16: 7 botellas + 1 barril + 2 latas = 10 productos */
(7, 1.00, 'B330', 11, 16),     /** 7 botellas 330ml cerveza 11 */
(1, 50.00, 'B50', 18, 16),    /** 1 barril 50L cerveza 18 */
(2, 1.00, 'L330', 13, 16),     /** 2 latas 330ml cerveza 13 */

/** Venta 17: 3 botellas + 2 six-packs + 1 caja + 4 latas = 10 productos */
(3, 1.00, 'B330', 1, 17),      /** 3 botellas 330ml cerveza 1 */
(2, 5.00, 'SP330', 4, 17),    /** 2 six-packs 330ml cerveza 4 */
(1, 10.00, 'C12500', 10, 17),  /** 1 caja 12 unidades 500ml cerveza 10 */
(4, 1.00, 'L330', 3, 17),      /** 4 latas 330ml cerveza 3 */

/** Venta 18: 6 botellas 500ml + 2 growlers + 2 latas = 10 productos */
(6, 1.00, 'B500', 12, 18),     /** 6 botellas 500ml cerveza 12 */
(2, 1.00, 'G1L', 9, 18),      /** 2 growlers 1L cerveza 9 */
(2, 1.00, 'L330', 13, 18),     /** 2 latas 330ml cerveza 13 */

/** Venta 19: 5 latas + 1 barril + 4 botellas = 10 productos */
(5, 1.00, 'L330', 3, 19),      /** 5 latas 330ml cerveza 3 */
(1, 30.00, 'B20', 6, 19),      /** 1 barril 20L cerveza 6 */
(4, 1.00, 'B330', 11, 19),     /** 4 botellas 330ml cerveza 11 */

/** Venta 20: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 1.00, 'B330', 1, 20),      /** 8 botellas 330ml cerveza 1 */
(1, 20.00, 'C24330', 15, 20),  /** 1 caja 24 unidades cerveza 15 */
(1, 1.00, 'L330', 3, 20),      /** 1 lata 330ml cerveza 3 */

/** Ventas 21-40: Combinaciones adicionales usando todos los productos del inventario */
/** Venta 21: 4 botellas + 3 latas + 2 six-packs + 1 growler = 10 productos */
(4, 1.00, 'B330', 1, 21),      /** 4 botellas 330ml cerveza 1 */
(3, 1.00, 'L330', 3, 21),      /** 3 latas 330ml cerveza 3 */
(2, 5.00, 'SP330', 14, 21),   /** 2 six-packs 330ml cerveza 14 */
(1, 1.00, 'G1L', 9, 21),      /** 1 growler 1L cerveza 9 */

/** Venta 22: 6 botellas 500ml + 2 latas + 1 caja + 1 botella = 10 productos */
(6, 1.00, 'B500', 12, 22),     /** 6 botellas 500ml cerveza 12 */
(2, 1.00, 'L330', 13, 22),     /** 2 latas 330ml cerveza 13 */
(1, 10.00, 'C12500', 10, 22),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 1.00, 'B330', 11, 22),     /** 1 botella 330ml cerveza 11 */

/** Venta 23: 5 botellas + 1 barril + 3 latas + 1 six-pack = 10 productos */
(5, 1.00, 'B330', 1, 23),      /** 5 botellas 330ml cerveza 1 */
(1, 40.00, 'B30', 17, 23),    /** 1 barril 30L cerveza 17 */
(3, 1.00, 'L330', 3, 23),      /** 3 latas 330ml cerveza 3 */
(1, 5.00, 'SP330', 4, 23),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 24: 7 latas + 2 botellas 500ml + 1 growler = 10 productos */
(7, 1.00, 'L330', 13, 24),     /** 7 latas 330ml cerveza 13 */
(2, 1.00, 'B500', 2, 24),      /** 2 botellas 500ml cerveza 2 */
(1, 1.00, 'G1L', 9, 24),      /** 1 growler 1L cerveza 9 */

/** Venta 25: 3 botellas + 1 caja + 2 six-packs + 4 latas = 10 productos */
(3, 1.00, 'B330', 11, 25),     /** 3 botellas 330ml cerveza 11 */
(1, 20.00, 'C24330', 15, 25),  /** 1 caja 24 unidades cerveza 15 */
(2, 5.00, 'SP330', 14, 25),   /** 2 six-packs 330ml cerveza 14 */
(4, 1.00, 'L330', 3, 25),      /** 4 latas 330ml cerveza 3 */

/** Venta 26: 8 botellas + 1 barril + 1 lata = 10 productos */
(8, 1.00, 'B330', 1, 26),      /** 8 botellas 330ml cerveza 1 */
(1, 50.00, 'B50', 18, 26),    /** 1 barril 50L cerveza 18 */
(1, 1.00, 'L330', 13, 26),     /** 1 lata 330ml cerveza 13 */

/** Venta 27: 4 botellas 500ml + 3 latas + 2 growlers + 1 six-pack = 10 productos */
(4, 1.00, 'B500', 12, 27),     /** 4 botellas 500ml cerveza 12 */
(3, 1.00, 'L330', 3, 27),      /** 3 latas 330ml cerveza 3 */
(2, 1.00, 'G1L', 9, 27),      /** 2 growlers 1L cerveza 9 */
(1, 5.00, 'SP330', 4, 27),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 28: 6 botellas + 1 caja + 2 latas + 1 botella 500ml = 10 productos */
(6, 1.00, 'B330', 11, 28),     /** 6 botellas 330ml cerveza 11 */
(1, 10.00, 'C12500', 10, 28),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 1.00, 'L330', 13, 28),     /** 2 latas 330ml cerveza 13 */
(1, 1.00, 'B500', 2, 28),      /** 1 botella 500ml cerveza 2 */

/** Venta 29: 5 latas + 1 barril + 3 botellas + 1 six-pack = 10 productos */
(5, 1.00, 'L330', 3, 29),      /** 5 latas 330ml cerveza 3 */
(1, 30.00, 'B20', 16, 29),     /** 1 barril 20L cerveza 16 */
(3, 1.00, 'B330', 1, 29),      /** 3 botellas 330ml cerveza 1 */
(1, 5.00, 'SP330', 14, 29),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 30: 7 botellas + 1 caja + 2 latas = 10 productos */
(7, 1.00, 'B330', 11, 30),     /** 7 botellas 330ml cerveza 11 */
(1, 20.00, 'C24330', 5, 30),   /** 1 caja 24 unidades cerveza 5 */
(2, 1.00, 'L330', 13, 30),     /** 2 latas 330ml cerveza 13 */

/** Continuando con ventas 31-50 usando más productos del inventario */
/** Venta 31: 4 botellas + 2 botellas 500ml + 1 barril + 3 latas = 10 productos */
(4, 1.00, 'B330', 1, 31),      /** 4 botellas 330ml cerveza 1 */
(2, 1.00, 'B500', 12, 31),     /** 2 botellas 500ml cerveza 12 */
(1, 40.00, 'B30', 7, 31),     /** 1 barril 30L cerveza 7 */
(3, 1.00, 'L330', 3, 31),      /** 3 latas 330ml cerveza 3 */

/** Venta 32: 8 latas + 1 six-pack + 1 growler = 10 productos */
(8, 1.00, 'L330', 13, 32),     /** 8 latas 330ml cerveza 13 */
(1, 5.00, 'SP330', 4, 32),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 'G1L', 9, 32),      /** 1 growler 1L cerveza 9 */

/** Venta 33: 5 botellas + 1 caja + 2 botellas 500ml + 2 latas = 10 productos */
(5, 1.00, 'B330', 11, 33),     /** 5 botellas 330ml cerveza 11 */
(1, 10.00, 'C12500', 10, 33),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 1.00, 'B500', 2, 33),      /** 2 botellas 500ml cerveza 2 */
(2, 1.00, 'L330', 3, 33),      /** 2 latas 330ml cerveza 3 */

/** Venta 34: 6 botellas + 1 barril + 2 six-packs + 1 lata = 10 productos */
(6, 1.00, 'B330', 1, 34),      /** 6 botellas 330ml cerveza 1 */
(1, 50.00, 'B50', 8, 34),     /** 1 barril 50L cerveza 8 */
(2, 5.00, 'SP330', 14, 34),   /** 2 six-packs 330ml cerveza 14 */
(1, 1.00, 'L330', 13, 34),     /** 1 lata 330ml cerveza 13 */

/** Venta 35: 3 botellas 500ml + 4 latas + 2 growlers + 1 caja = 10 productos */
(3, 1.00, 'B500', 12, 35),     /** 3 botellas 500ml cerveza 12 */
(4, 1.00, 'L330', 3, 35),      /** 4 latas 330ml cerveza 3 */
(2, 1.00, 'G1L', 9, 35),      /** 2 growlers 1L cerveza 9 */
(1, 20.00, 'C24330', 15, 35),  /** 1 caja 24 unidades cerveza 15 */

/** Venta 36: 9 botellas + 1 lata = 10 productos */
(9, 1.00, 'B330', 11, 36),     /** 9 botellas 330ml cerveza 11 */
(1, 1.00, 'L330', 13, 36),     /** 1 lata 330ml cerveza 13 */

/** Venta 37: 5 latas + 1 barril + 2 botellas 500ml + 2 six-packs = 10 productos */
(5, 1.00, 'L330', 3, 37),      /** 5 latas 330ml cerveza 3 */
(1, 40.00, 'B30', 17, 37),    /** 1 barril 30L cerveza 17 */
(2, 1.00, 'B500', 2, 37),      /** 2 botellas 500ml cerveza 2 */
(2, 5.00, 'SP330', 4, 37),    /** 2 six-packs 330ml cerveza 4 */

/** Venta 38: 4 botellas + 1 caja + 3 latas + 2 growlers = 10 productos */
(4, 1.00, 'B330', 1, 38),      /** 4 botellas 330ml cerveza 1 */
(1, 10.00, 'C12500', 10, 38),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 1.00, 'L330', 13, 38),     /** 3 latas 330ml cerveza 13 */
(2, 1.00, 'G1L', 9, 38),      /** 2 growlers 1L cerveza 9 */

/** Venta 39: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 1.00, 'B330', 11, 39),     /** 7 botellas 330ml cerveza 11 */
(1, 30.00, 'B20', 6, 39),      /** 1 barril 20L cerveza 6 */
(1, 5.00, 'SP330', 14, 39),   /** 1 six-pack 330ml cerveza 14 */
(1, 1.00, 'L330', 3, 39),      /** 1 lata 330ml cerveza 3 */

/** Venta 40: 6 latas + 2 botellas 500ml + 1 caja + 1 botella = 10 productos */
(6, 1.00, 'L330', 13, 40),     /** 6 latas 330ml cerveza 13 */
(2, 1.00, 'B500', 12, 40),     /** 2 botellas 500ml cerveza 12 */
(1, 20.00, 'C24330', 5, 40),   /** 1 caja 24 unidades cerveza 5 */
(1, 1.00, 'B330', 1, 40),      /** 1 botella 330ml cerveza 1 */

/** Ventas 41-90: Completando todas las ventas con variedad de productos */
/** Venta 41: 5 botellas + 2 six-packs + 3 latas = 10 productos */
(5, 1.00, 'B330', 1, 41),      /** 5 botellas 330ml cerveza 1 */
(2, 5.00, 'SP330', 4, 41),    /** 2 six-packs 330ml cerveza 4 */
(3, 1.00, 'L330', 3, 41),      /** 3 latas 330ml cerveza 3 */

/** Venta 42: 4 botellas + 3 botellas 500ml + 2 growlers + 1 lata = 10 productos */
(4, 1.00, 'B330', 11, 42),     /** 4 botellas 330ml cerveza 11 */
(3, 1.00, 'B500', 12, 42),     /** 3 botellas 500ml cerveza 12 */
(2, 1.00, 'G1L', 9, 42),      /** 2 growlers 1L cerveza 9 */
(1, 1.00, 'L330', 13, 42),     /** 1 lata 330ml cerveza 13 */

/** Venta 43: 6 latas + 1 barril + 2 botellas + 1 six-pack = 10 productos */
(6, 1.00, 'L330', 3, 43),      /** 6 latas 330ml cerveza 3 */
(1, 30.00, 'B20', 16, 43),     /** 1 barril 20L cerveza 16 */
(2, 1.00, 'B330', 1, 43),      /** 2 botellas 330ml cerveza 1 */
(1, 5.00, 'SP330', 14, 43),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 44: 7 botellas + 1 caja + 2 latas = 10 productos */
(7, 1.00, 'B330', 11, 44),     /** 7 botellas 330ml cerveza 11 */
(1, 20.00, 'C24330', 15, 44),  /** 1 caja 24 unidades cerveza 15 */
(2, 1.00, 'L330', 13, 44),     /** 2 latas 330ml cerveza 13 */

/** Venta 45: 3 botellas 500ml + 4 latas + 1 barril + 2 six-packs = 10 productos */
(3, 1.00, 'B500', 2, 45),      /** 3 botellas 500ml cerveza 2 */
(4, 1.00, 'L330', 3, 45),      /** 4 latas 330ml cerveza 3 */
(1, 40.00, 'B30', 17, 45),    /** 1 barril 30L cerveza 17 */
(2, 5.00, 'SP330', 4, 45),    /** 2 six-packs 330ml cerveza 4 */

/** Venta 46: 8 botellas + 1 caja + 1 growler = 10 productos */
(8, 1.00, 'B330', 1, 46),      /** 8 botellas 330ml cerveza 1 */
(1, 10.00, 'C12500', 10, 46),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 1.00, 'G1L', 9, 46),      /** 1 growler 1L cerveza 9 */

/** Venta 47: 5 latas + 2 botellas 500ml + 1 barril + 2 botellas = 10 productos */
(5, 1.00, 'L330', 13, 47),     /** 5 latas 330ml cerveza 13 */
(2, 1.00, 'B500', 12, 47),     /** 2 botellas 500ml cerveza 12 */
(1, 50.00, 'B50', 18, 47),    /** 1 barril 50L cerveza 18 */
(2, 1.00, 'B330', 11, 47),     /** 2 botellas 330ml cerveza 11 */

/** Venta 48: 6 botellas + 2 six-packs + 2 latas = 10 productos */
(6, 1.00, 'B330', 1, 48),      /** 6 botellas 330ml cerveza 1 */
(2, 5.00, 'SP330', 14, 48),   /** 2 six-packs 330ml cerveza 14 */
(2, 1.00, 'L330', 3, 48),      /** 2 latas 330ml cerveza 3 */

/** Venta 49: 4 botellas + 1 caja + 3 growlers + 2 latas = 10 productos */
(4, 1.00, 'B330', 11, 49),     /** 4 botellas 330ml cerveza 11 */
(1, 20.00, 'C24330', 5, 49),   /** 1 caja 24 unidades cerveza 5 */
(3, 1.00, 'G1L', 9, 49),      /** 3 growlers 1L cerveza 9 */
(2, 1.00, 'L330', 13, 49),     /** 2 latas 330ml cerveza 13 */

/** Venta 50: 9 latas + 1 botellas 500ml = 10 productos */
(9, 1.00, 'L330', 3, 50),      /** 9 latas 330ml cerveza 3 */
(1, 1.00, 'B500', 2, 50),      /** 1 botella 500ml cerveza 2 */

/** Continuando ventas 51-70 con más variedad */
/** Venta 51: 3 botellas + 1 barril + 2 six-packs + 4 latas = 10 productos */
(3, 1.00, 'B330', 1, 51),      /** 3 botellas 330ml cerveza 1 */
(1, 30.00, 'B20', 6, 51),      /** 1 barril 20L cerveza 6 */
(2, 5.00, 'SP330', 4, 51),    /** 2 six-packs 330ml cerveza 4 */
(4, 1.00, 'L330', 3, 51),      /** 4 latas 330ml cerveza 3 */

/** Venta 52: 5 botellas 500ml + 1 caja + 3 latas + 1 growler = 10 productos */
(5, 1.00, 'B500', 12, 52),     /** 5 botellas 500ml cerveza 12 */
(1, 10.00, 'C12500', 10, 52),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 1.00, 'L330', 13, 52),     /** 3 latas 330ml cerveza 13 */
(1, 1.00, 'G1L', 9, 52),      /** 1 growler 1L cerveza 9 */

/** Venta 53: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 1.00, 'B330', 11, 53),     /** 7 botellas 330ml cerveza 11 */
(1, 40.00, 'B30', 7, 53),     /** 1 barril 30L cerveza 7 */
(1, 5.00, 'SP330', 14, 53),   /** 1 six-pack 330ml cerveza 14 */
(1, 1.00, 'L330', 3, 53),      /** 1 lata 330ml cerveza 3 */

/** Venta 54: 6 latas + 2 botellas 500ml + 1 caja + 1 botella = 10 productos */
(6, 1.00, 'L330', 13, 54),     /** 6 latas 330ml cerveza 13 */
(2, 1.00, 'B500', 2, 54),      /** 2 botellas 500ml cerveza 2 */
(1, 20.00, 'C24330', 15, 54),  /** 1 caja 24 unidades cerveza 15 */
(1, 1.00, 'B330', 1, 54),      /** 1 botella 330ml cerveza 1 */

/** Venta 55: 4 botellas + 1 barril + 2 growlers + 3 latas = 10 productos */
(4, 1.00, 'B330', 11, 55),     /** 4 botellas 330ml cerveza 11 */
(1, 50.00, 'B50', 8, 55),     /** 1 barril 50L cerveza 8 */
(2, 1.00, 'G1L', 9, 55),      /** 2 growlers 1L cerveza 9 */
(3, 1.00, 'L330', 3, 55),      /** 3 latas 330ml cerveza 3 */

/** Venta 56: 8 botellas + 1 six-pack + 1 lata = 10 productos */
(8, 1.00, 'B330', 1, 56),      /** 8 botellas 330ml cerveza 1 */
(1, 5.00, 'SP330', 4, 56),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 'L330', 13, 56),     /** 1 lata 330ml cerveza 13 */

/** Venta 57: 5 latas + 3 botellas 500ml + 1 caja + 1 six-pack = 10 productos */
(5, 1.00, 'L330', 3, 57),      /** 5 latas 330ml cerveza 3 */
(3, 1.00, 'B500', 12, 57),     /** 3 botellas 500ml cerveza 12 */
(1, 10.00, 'C12500', 10, 57),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 5.00, 'SP330', 14, 57),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 58: 6 botellas + 1 barril + 2 latas + 1 growler = 10 productos */
(6, 1.00, 'B330', 11, 58),     /** 6 botellas 330ml cerveza 11 */
(1, 30.00, 'B20', 16, 58),     /** 1 barril 20L cerveza 16 */
(2, 1.00, 'L330', 13, 58),     /** 2 latas 330ml cerveza 13 */
(1, 1.00, 'G1L', 9, 58),      /** 1 growler 1L cerveza 9 */

/** Venta 59: 7 botellas + 1 caja + 1 six-pack + 1 lata = 10 productos */
(7, 1.00, 'B330', 1, 59),      /** 7 botellas 330ml cerveza 1 */
(1, 20.00, 'C24330', 5, 59),   /** 1 caja 24 unidades cerveza 5 */
(1, 5.00, 'SP330', 4, 59),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 'L330', 3, 59),      /** 1 lata 330ml cerveza 3 */

/** Venta 60: 4 botellas 500ml + 3 latas + 1 barril + 2 botellas = 10 productos */
(4, 1.00, 'B500', 2, 60),      /** 4 botellas 500ml cerveza 2 */
(3, 1.00, 'L330', 13, 60),     /** 3 latas 330ml cerveza 13 */
(1, 40.00, 'B30', 17, 60),    /** 1 barril 30L cerveza 17 */
(2, 1.00, 'B330', 11, 60),     /** 2 botellas 330ml cerveza 11 */

/** Continuando ventas 61-90 para completar todas */
/** Venta 61: 9 botellas + 1 growler = 10 productos */
(9, 1.00, 'B330', 1, 61),      /** 9 botellas 330ml cerveza 1 */
(1, 1.00, 'G1L', 9, 61),      /** 1 growler 1L cerveza 9 */

/** Venta 62: 5 latas + 2 six-packs + 1 caja + 2 botellas = 10 productos */
(5, 1.00, 'L330', 3, 62),      /** 5 latas 330ml cerveza 3 */
(2, 5.00, 'SP330', 14, 62),   /** 2 six-packs 330ml cerveza 14 */
(1, 10.00, 'C12500', 10, 62),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 1.00, 'B330', 11, 62),     /** 2 botellas 330ml cerveza 11 */

/** Venta 63: 6 botellas + 1 barril + 2 botellas 500ml + 1 lata = 10 productos */
(6, 1.00, 'B330', 1, 63),      /** 6 botellas 330ml cerveza 1 */
(1, 50.00, 'B50', 18, 63),    /** 1 barril 50L cerveza 18 */
(2, 1.00, 'B500', 12, 63),     /** 2 botellas 500ml cerveza 12 */
(1, 1.00, 'L330', 13, 63),     /** 1 lata 330ml cerveza 13 */

/** Venta 64: 7 latas + 1 caja + 1 six-pack + 1 growler = 10 productos */
(7, 1.00, 'L330', 3, 64),      /** 7 latas 330ml cerveza 3 */
(1, 20.00, 'C24330', 15, 64),  /** 1 caja 24 unidades cerveza 15 */
(1, 5.00, 'SP330', 4, 64),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 'G1L', 9, 64),      /** 1 growler 1L cerveza 9 */

/** Venta 65: 4 botellas + 3 botellas 500ml + 1 barril + 2 latas = 10 productos */
(4, 1.00, 'B330', 11, 65),     /** 4 botellas 330ml cerveza 11 */
(3, 1.00, 'B500', 2, 65),      /** 3 botellas 500ml cerveza 2 */
(1, 30.00, 'B20', 6, 65),     /** 1 barril 20L cerveza 6 */
(2, 1.00, 'L330', 13, 65),     /** 2 latas 330ml cerveza 13 */

/** Venta 66: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 1.00, 'B330', 1, 66),      /** 8 botellas 330ml cerveza 1 */
(1, 10.00, 'C12500', 10, 66),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 1.00, 'L330', 3, 66),      /** 1 lata 330ml cerveza 3 */

/** Venta 67: 5 botellas + 2 six-packs + 1 barril + 2 latas = 10 productos */
(5, 1.00, 'B330', 11, 67),     /** 5 botellas 330ml cerveza 11 */
(2, 5.00, 'SP330', 14, 67),   /** 2 six-packs 330ml cerveza 14 */
(1, 40.00, 'B30', 17, 67),    /** 1 barril 30L cerveza 17 */
(2, 1.00, 'L330', 13, 67),     /** 2 latas 330ml cerveza 13 */

/** Venta 68: 6 latas + 2 botellas 500ml + 1 caja + 1 growler = 10 productos */
(6, 1.00, 'L330', 3, 68),      /** 6 latas 330ml cerveza 3 */
(2, 1.00, 'B500', 12, 68),     /** 2 botellas 500ml cerveza 12 */
(1, 20.00, 'C24330', 5, 68),   /** 1 caja 24 unidades cerveza 5 */
(1, 1.00, 'G1L', 9, 68),      /** 1 growler 1L cerveza 9 */

/** Venta 69: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 1.00, 'B330', 1, 69),      /** 7 botellas 330ml cerveza 1 */
(1, 30.00, 'B20', 16, 69),    /** 1 barril 20L cerveza 16 */
(1, 5.00, 'SP330', 4, 69),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 'L330', 13, 69),     /** 1 lata 330ml cerveza 13 */

/** Venta 70: 4 botellas + 3 latas + 1 barril + 2 botellas 500ml = 10 productos */
(4, 1.00, 'B330', 11, 70),     /** 4 botellas 330ml cerveza 11 */
(3, 1.00, 'L330', 3, 70),      /** 3 latas 330ml cerveza 3 */
(1, 50.00, 'B50', 8, 70),     /** 1 barril 50L cerveza 8 */
(2, 1.00, 'B500', 2, 70),      /** 2 botellas 500ml cerveza 2 */

/** Ventas finales 71-90 */
/** Venta 71: 9 latas + 1 caja = 10 productos */
(9, 1.00, 'L330', 13, 71),     /** 9 latas 330ml cerveza 13 */
(1, 10.00, 'C12500', 10, 71),  /** 1 caja 12 unidades 500ml cerveza 10 */

/** Venta 72: 5 botellas + 2 six-packs + 2 growlers + 1 lata = 10 productos */
(5, 1.00, 'B330', 1, 72),      /** 5 botellas 330ml cerveza 1 */
(2, 5.00, 'SP330', 14, 72),   /** 2 six-packs 330ml cerveza 14 */
(2, 1.00, 'G1L', 9, 72),      /** 2 growlers 1L cerveza 9 */
(1, 1.00, 'L330', 3, 72),      /** 1 lata 330ml cerveza 3 */

/** Venta 73: 6 botellas + 1 barril + 1 caja + 2 latas = 10 productos */
(6, 1.00, 'B330', 11, 73),     /** 6 botellas 330ml cerveza 11 */
(1, 40.00, 'B30', 17, 73),    /** 1 barril 30L cerveza 17 */
(1, 20.00, 'C24330', 15, 73),  /** 1 caja 24 unidades cerveza 15 */
(2, 1.00, 'L330', 13, 73),     /** 2 latas 330ml cerveza 13 */

/** Venta 74: 7 botellas + 2 botellas 500ml + 1 six-pack = 10 productos */
(7, 1.00, 'B330', 1, 74),      /** 7 botellas 330ml cerveza 1 */
(2, 1.00, 'B500', 12, 74),     /** 2 botellas 500ml cerveza 12 */
(1, 5.00, 'SP330', 4, 74),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 75: 4 latas + 1 barril + 3 botellas + 2 growlers = 10 productos */
(4, 1.00, 'L330', 3, 75),      /** 4 latas 330ml cerveza 3 */
(1, 50.00, 'B50', 18, 75),    /** 1 barril 50L cerveza 18 */
(3, 1.00, 'B330', 11, 75),     /** 3 botellas 330ml cerveza 11 */
(2, 1.00, 'G1L', 9, 75),      /** 2 growlers 1L cerveza 9 */

/** Venta 76: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 1.00, 'B330', 1, 76),      /** 8 botellas 330ml cerveza 1 */
(1, 10.00, 'C12500', 10, 76),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 1.00, 'L330', 13, 76),     /** 1 lata 330ml cerveza 13 */

/** Venta 77: 5 botellas + 1 barril + 2 six-packs + 2 latas = 10 productos */
(5, 1.00, 'B330', 11, 77),     /** 5 botellas 330ml cerveza 11 */
(1, 30.00, 'B20', 6, 77),     /** 1 barril 20L cerveza 6 */
(2, 5.00, 'SP330', 14, 77),   /** 2 six-packs 330ml cerveza 14 */
(2, 1.00, 'L330', 3, 77),      /** 2 latas 330ml cerveza 3 */

/** Venta 78: 6 latas + 3 botellas 500ml + 1 caja = 10 productos */
(6, 1.00, 'L330', 13, 78),     /** 6 latas 330ml cerveza 13 */
(3, 1.00, 'B500', 2, 78),      /** 3 botellas 500ml cerveza 2 */
(1, 20.00, 'C24330', 5, 78),   /** 1 caja 24 unidades cerveza 5 */

/** Venta 79: 7 botellas + 1 barril + 1 growler + 1 lata = 10 productos */
(7, 1.00, 'B330', 1, 79),      /** 7 botellas 330ml cerveza 1 */
(1, 40.00, 'B30', 7, 79),     /** 1 barril 30L cerveza 7 */
(1, 1.00, 'G1L', 9, 79),      /** 1 growler 1L cerveza 9 */
(1, 1.00, 'L330', 3, 79),      /** 1 lata 330ml cerveza 3 */

/** Venta 80: 4 botellas + 2 six-packs + 1 caja + 3 latas = 10 productos */
(4, 1.00, 'B330', 11, 80),     /** 4 botellas 330ml cerveza 11 */
(2, 5.00, 'SP330', 4, 80),    /** 2 six-packs 330ml cerveza 4 */
(1, 10.00, 'C12500', 10, 80),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 1.00, 'L330', 13, 80),     /** 3 latas 330ml cerveza 13 */

/** Ventas finales 81-90 */
/** Venta 81: 8 latas + 1 barril + 1 botella = 10 productos */
(8, 1.00, 'L330', 3, 81),      /** 8 latas 330ml cerveza 3 */
(1, 50.00, 'B50', 18, 81),    /** 1 barril 50L cerveza 18 */
(1, 1.00, 'B330', 1, 81),      /** 1 botella 330ml cerveza 1 */

/** Venta 82: 5 botellas + 2 botellas 500ml + 1 caja + 2 growlers = 10 productos */
(5, 1.00, 'B330', 11, 82),     /** 5 botellas 330ml cerveza 11 */
(2, 1.00, 'B500', 12, 82),     /** 2 botellas 500ml cerveza 12 */
(1, 20.00, 'C24330', 15, 82),  /** 1 caja 24 unidades cerveza 15 */
(2, 1.00, 'G1L', 9, 82),      /** 2 growlers 1L cerveza 9 */

/** Venta 83: 6 botellas + 1 six-pack + 1 barril + 2 latas = 10 productos */
(6, 1.00, 'B330', 1, 83),      /** 6 botellas 330ml cerveza 1 */
(1, 5.00, 'SP330', 14, 83),   /** 1 six-pack 330ml cerveza 14 */
(1, 30.00, 'B20', 16, 83),    /** 1 barril 20L cerveza 16 */
(2, 1.00, 'L330', 13, 83),     /** 2 latas 330ml cerveza 13 */

/** Venta 84: 7 latas + 2 botellas 500ml + 1 caja = 10 productos */
(7, 1.00, 'L330', 3, 84),      /** 7 latas 330ml cerveza 3 */
(2, 1.00, 'B500', 2, 84),      /** 2 botellas 500ml cerveza 2 */
(1, 10.00, 'C12500', 10, 84),  /** 1 caja 12 unidades 500ml cerveza 10 */

/** Venta 85: 4 botellas + 1 barril + 2 six-packs + 3 latas = 10 productos */
(4, 1.00, 'B330', 11, 85),     /** 4 botellas 330ml cerveza 11 */
(1, 40.00, 'B30', 17, 85),    /** 1 barril 30L cerveza 17 */
(2, 5.00, 'SP330', 4, 85),    /** 2 six-packs 330ml cerveza 4 */
(3, 1.00, 'L330', 13, 85),     /** 3 latas 330ml cerveza 13 */

/** Venta 86: 9 botellas + 1 growler = 10 productos */
(9, 1.00, 'B330', 1, 86),      /** 9 botellas 330ml cerveza 1 */
(1, 1.00, 'G1L', 9, 86),      /** 1 growler 1L cerveza 9 */

/** Venta 87: 5 latas + 3 botellas 500ml + 1 caja + 1 six-pack = 10 productos */
(5, 1.00, 'L330', 3, 87),      /** 5 latas 330ml cerveza 3 */
(3, 1.00, 'B500', 12, 87),     /** 3 botellas 500ml cerveza 12 */
(1, 20.00, 'C24330', 5, 87),   /** 1 caja 24 unidades cerveza 5 */
(1, 5.00, 'SP330', 14, 87),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 88: 6 botellas + 1 barril + 2 latas + 1 botella 500ml = 10 productos */
(6, 1.00, 'B330', 11, 88),     /** 6 botellas 330ml cerveza 11 */
(1, 50.00, 'B50', 8, 88),     /** 1 barril 50L cerveza 8 */
(2, 1.00, 'L330', 13, 88),     /** 2 latas 330ml cerveza 13 */
(1, 1.00, 'B500', 2, 88),      /** 1 botella 500ml cerveza 2 */

/** Venta 89: 7 botellas + 1 caja + 1 six-pack + 1 growler = 10 productos */
(7, 1.00, 'B330', 1, 89),      /** 7 botellas 330ml cerveza 1 */
(1, 10.00, 'C12500', 10, 89),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 5.00, 'SP330', 4, 89),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 'G1L', 9, 89),      /** 1 growler 1L cerveza 9 */

/** Venta 90: 8 latas + 1 barril + 1 botella = 10 productos */
(8, 1.00, 'L330', 13, 90),     /** 8 latas 330ml cerveza 13 */
(1, 30.00, 'B20', 6, 90),     /** 1 barril 20L cerveza 6 */
(1, 1.00, 'B330', 11, 90);     /** 1 botella 330ml cerveza 11 */

/**
 * Inserción de datos para la tabla miembro_presentacion_cerveza
 * Relaciona miembros con presentaciones de cerveza y su monto de proveedor
 * @param monto_proveedor - Monto que paga el proveedor (tipo: DECIMAL)
 * @param fk_miembro_1 - Primera clave foránea del miembro - RIF (tipo: INTEGER)
 * @param fk_miembro_2 - Segunda clave foránea del miembro - naturaleza RIF (tipo: CHAR)
 * @param fk_presentacion_cerveza_1 - Primera clave foránea de presentación cerveza - SKU (tipo: VARCHAR)
 * @param fk_presentacion_cerveza_2 - Segunda clave foránea de presentación cerveza - ID cerveza (tipo: INTEGER)
 */
INSERT INTO miembro_presentacion_cerveza (monto_proveedor, fk_miembro_1, fk_miembro_2, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) VALUES
(2.50, 123456789, 'J', 'B330', 1),      /** Empresa ABC provee botella 330ml por $2.50 */
(4.25, 987654321, 'V', 'B500', 2),      /** Empresa XYZ provee botella 500ml por $4.25 */
(1.80, 234567890, 'J', 'L330', 3),      /** Delta Distrib provee lata 330ml por $1.80 */
(13.75, 345678901, 'V', 'SP330', 4),    /** Omega Imports provee six-pack 330ml por $13.75 */
(45.30, 456789012, 'J', 'C24330', 5),   /** Epsilon Trade provee caja 24 unidades por $45.30 */
(65.80, 567890123, 'V', 'B20', 6),      /** Beta Stores provee barril 20L por $65.80 */
(95.50, 678901234, 'J', 'B30', 7),      /** Gamma Dist provee barril 30L por $95.50 */
(155.75, 789012345, 'V', 'B50', 8),     /** Sigma Com provee barril 50L por $155.75 */
(8.90, 890123456, 'J', 'G1L', 9),       /** Theta Imports provee growler 1L por $8.90 */
(42.60, 901234567, 'V', 'C12500', 10);  /** Lambda Stores provee caja 12 unidades 500ml por $42.60 */ 