/**
 * Archivo de inserción de datos para las tablas de venta pt 1
 * Contiene inserts para: detalle_presentacion, miembro_presentacion_cerveza y venta
 * Cada tabla tendrá 10 registros de ejemplo
 */

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
(1500.50, NULL, 'Entrega urgente solicitada', NULL, NULL, 1, NULL, 1, NULL),  /** Venta en tienda física con cliente jurídico */
(850.75, NULL, 'Cliente frecuente', NULL, NULL, NULL, 1, 2, NULL),        /** Venta en tienda física con cliente natural */
(2300.00, 'Av. Libertador #789, Ciudad Bolívar', 'Pedido especial para evento', 3, 363, NULL, NULL, NULL, 1), /** Venta en tienda web con usuario */
(675.25, NULL, 'Pago en efectivo', NULL, NULL, 2, NULL, 3, NULL),              /** Venta en tienda física con cliente jurídico */
(1120.80, NULL, 'Descuento aplicado', NULL, NULL, NULL, 2, 4, NULL),      /** Venta en tienda física con cliente natural */
(1890.30, 'Sector Vista al Orinoco', 'Entrega coordinada', 15, 366, NULL, NULL, NULL, 2),             /** Venta en tienda web con usuario */
(945.60, NULL, 'Cliente nuevo', NULL, NULL, 3, NULL, 5, NULL),                      /** Venta en tienda física con cliente jurídico */
(2100.45, NULL, 'Pedido corporativo', NULL, NULL, NULL, 3, 1, NULL),       /** Venta en tienda física con cliente natural */
(1750.20, 'Calle Miranda #123', 'Entrega express', 16, 369, NULL, NULL, NULL, 3),                     /** Venta en tienda web con usuario */
(820.90, NULL, 'Venta promocional', NULL, NULL, 4, NULL, 2, NULL),       /** Venta en tienda física con cliente jurídico */

/** Ventas adicionales para clientes naturales - 2 ventas por cada cliente natural (40 ventas) */
(950.25, NULL, 'Primera compra del cliente', NULL, NULL, NULL, 1, 1, NULL),            /** Venta 11: Cliente natural 1 - primera venta */
(1250.75, NULL, 'Segunda compra del mes', NULL, NULL, NULL, 1, 2, NULL),               /** Venta 12: Cliente natural 1 - segunda venta */
(780.40, NULL, 'Pedido regular', NULL, NULL, NULL, 2, 3, NULL),                     /** Venta 13: Cliente natural 2 - primera venta */
(1450.80, NULL, 'Compra especial', NULL, NULL, NULL, 2, 4, NULL),                  /** Venta 14: Cliente natural 2 - segunda venta */
(625.90, NULL, 'Venta matutina', NULL, NULL, NULL, 3, 5, NULL),                          /** Venta 15: Cliente natural 3 - primera venta */
(890.30, NULL, 'Venta vespertina', NULL, NULL, NULL, 3, 1, NULL),                       /** Venta 16: Cliente natural 3 - segunda venta */  
(1150.60, NULL, 'Compra fin de semana', NULL, NULL, NULL, 4, 2, NULL),                 /** Venta 17: Cliente natural 4 - primera venta */
(750.45, NULL, 'Pedido express', NULL, NULL, NULL, 4, 3, NULL),                        /** Venta 18: Cliente natural 4 - segunda venta */
(2100.80, NULL, 'Venta corporativa', NULL, NULL, NULL, 5, 4, NULL),                        /** Venta 19: Cliente natural 5 - primera venta */
(1680.25, NULL, 'Pedido especial evento', NULL, NULL, NULL, 5, 5, NULL),                  /** Venta 20: Cliente natural 5 - segunda venta */
(940.70, NULL, 'Compra mensual', NULL, NULL, NULL, 6, 1, NULL),                      /** Venta 21: Cliente natural 6 - primera venta */
(1320.55, NULL, 'Venta promocional', NULL, NULL, NULL, 6, 2, NULL),                 /** Venta 22: Cliente natural 6 - segunda venta */
(1580.90, NULL, 'Pedido urgente', NULL, NULL, NULL, 7, 3, NULL),                        /** Venta 23: Cliente natural 7 - primera venta */
(850.40, NULL, 'Compra regular', NULL, NULL, NULL, 7, 4, NULL),                         /** Venta 24: Cliente natural 7 - segunda venta */
(1250.30, NULL, 'Venta especial', NULL, NULL, NULL, 8, 5, NULL),                       /** Venta 25: Cliente natural 8 - primera venta */
(975.85, NULL, 'Segunda compra', NULL, NULL, NULL, 8, 1, NULL),                        /** Venta 26: Cliente natural 8 - segunda venta */
(1790.60, NULL, 'Compra mayorista', NULL, NULL, NULL, 9, 2, NULL),                   /** Venta 27: Cliente natural 9 - primera venta */
(1120.45, NULL, 'Pedido regular', NULL, NULL, NULL, 9, 3, NULL),                     /** Venta 28: Cliente natural 9 - segunda venta */
(680.75, NULL, 'Venta matinal', NULL, NULL, NULL, 10, 4, NULL),                     /** Venta 29: Cliente natural 10 - primera venta */
(1450.20, NULL, 'Compra nocturna', NULL, NULL, NULL, 10, 5, NULL),                 /** Venta 30: Cliente natural 10 - segunda venta */
(920.30, NULL, 'Pedido estándar', NULL, NULL, NULL, 11, 1, NULL),                     /** Venta 31: Cliente natural 11 - primera venta */
(1340.85, NULL, 'Venta especial', NULL, NULL, NULL, 11, 2, NULL),                     /** Venta 32: Cliente natural 11 - segunda venta */
(1560.40, NULL, 'Compra quincenal', NULL, NULL, NULL, 12, 3, NULL),                  /** Venta 33: Cliente natural 12 - primera venta */
(890.75, NULL, 'Pedido express', NULL, NULL, NULL, 12, 4, NULL),                     /** Venta 34: Cliente natural 12 - segunda venta */
(1180.60, NULL, 'Primera compra', NULL, NULL, NULL, 13, 5, NULL),                    /** Venta 35: Cliente natural 13 - primera venta */
(750.25, NULL, 'Segunda compra', NULL, NULL, NULL, 13, 1, NULL),                     /** Venta 36: Cliente natural 13 - segunda venta */
(2050.80, NULL, 'Venta corporativa', NULL, NULL, NULL, 14, 2, NULL),                /** Venta 37: Cliente natural 14 - primera venta */
(1420.45, NULL, 'Pedido regular', NULL, NULL, NULL, 14, 3, NULL),                   /** Venta 38: Cliente natural 14 - segunda venta */
(980.70, NULL, 'Compra semanal', NULL, NULL, NULL, 15, 4, NULL),                        /** Venta 39: Cliente natural 15 - primera venta */
(1290.35, NULL, 'Venta promocional', NULL, NULL, NULL, 15, 5, NULL),                    /** Venta 40: Cliente natural 15 - segunda venta */
(1650.90, NULL, 'Pedido especial', NULL, NULL, NULL, 16, 1, NULL),                    /** Venta 41: Cliente natural 16 - primera venta */
(920.55, NULL, 'Compra regular', NULL, NULL, NULL, 16, 2, NULL),                      /** Venta 42: Cliente natural 16 - segunda venta */
(1380.25, NULL, 'Venta matutina', NULL, NULL, NULL, 17, 3, NULL),                       /** Venta 43: Cliente natural 17 - primera venta */
(840.80, NULL, 'Pedido vespertino', NULL, NULL, NULL, 17, 4, NULL),                     /** Venta 44: Cliente natural 17 - segunda venta */
(1520.40, NULL, 'Compra fin de mes', NULL, NULL, NULL, 18, 5, NULL),                     /** Venta 45: Cliente natural 18 - primera venta */
(960.75, NULL, 'Venta especial', NULL, NULL, NULL, 18, 1, NULL),                         /** Venta 46: Cliente natural 18 - segunda venta */
(1750.60, NULL, 'Pedido mayorista', NULL, NULL, NULL, 19, 2, NULL),                  /** Venta 47: Cliente natural 19 - primera venta */
(1050.30, NULL, 'Compra regular', NULL, NULL, NULL, 19, 3, NULL),                    /** Venta 48: Cliente natural 19 - segunda venta */
(880.85, NULL, 'Venta promocional', NULL, NULL, NULL, 20, 4, NULL),                 /** Venta 49: Cliente natural 20 - primera venta */
(1410.45, NULL, 'Pedido especial', NULL, NULL, NULL, 20, 5, NULL),                     /** Venta 50: Cliente natural 20 - segunda venta */

/** Ventas adicionales para clientes jurídicos - 2 ventas por cada cliente jurídico (40 ventas) */
(3250.75, NULL, 'Pedido corporativo mensual', NULL, NULL, 1, NULL, 1, NULL),         /** Venta 51: Cliente jurídico 1 - primera venta */
(4100.50, NULL, 'Compra para eventos', NULL, NULL, 1, NULL, 2, NULL),               /** Venta 52: Cliente jurídico 1 - segunda venta */
(2875.40, NULL, 'Pedido regular empresa', NULL, NULL, 2, NULL, 3, NULL),                /** Venta 53: Cliente jurídico 2 - primera venta */
(3650.80, NULL, 'Venta corporativa especial', NULL, NULL, 2, NULL, 4, NULL),           /** Venta 54: Cliente jurídico 2 - segunda venta */
(5200.30, NULL, 'Compra construcción', NULL, NULL, 3, NULL, 5, NULL),                  /** Venta 55: Cliente jurídico 3 - primera venta */
(4750.60, NULL, 'Pedido obra nueva', NULL, NULL, 3, NULL, 1, NULL),                    /** Venta 56: Cliente jurídico 3 - segunda venta */
(3890.25, NULL, 'Venta distribución', NULL, NULL, 4, NULL, 2, NULL),                 /** Venta 57: Cliente jurídico 4 - primera venta */
(4320.75, NULL, 'Pedido mayorista', NULL, NULL, 4, NULL, 3, NULL),                  /** Venta 58: Cliente jurídico 4 - segunda venta */
(4580.90, NULL, 'Compra importación', NULL, NULL, 5, NULL, 4, NULL),                     /** Venta 59: Cliente jurídico 5 - primera venta */
(3975.45, NULL, 'Venta comercial', NULL, NULL, 5, NULL, 5, NULL),                        /** Venta 60: Cliente jurídico 5 - segunda venta */
(3150.80, NULL, 'Pedido almacén', NULL, NULL, 6, NULL, 1, NULL),                       /** Venta 61: Cliente jurídico 6 - primera venta */
(3720.35, NULL, 'Compra bodega', NULL, NULL, 6, NULL, 2, NULL),                        /** Venta 62: Cliente jurídico 6 - segunda venta */
(4250.60, NULL, 'Venta comercializadora', NULL, NULL, 7, NULL, 3, NULL),                   /** Venta 63: Cliente jurídico 7 - primera venta */
(3680.90, NULL, 'Pedido especial empresa', NULL, NULL, 7, NULL, 4, NULL),                 /** Venta 64: Cliente jurídico 7 - segunda venta */
(3420.75, NULL, 'Compra distribuidora', NULL, NULL, 8, NULL, 5, NULL),               /** Venta 65: Cliente jurídico 8 - primera venta */
(4080.25, NULL, 'Venta corporativa', NULL, NULL, 8, NULL, 1, NULL),                  /** Venta 66: Cliente jurídico 8 - segunda venta */
(4950.40, NULL, 'Pedido importadora', NULL, NULL, 9, NULL, 2, NULL),                    /** Venta 67: Cliente jurídico 9 - primera venta */
(4320.85, NULL, 'Compra comercial', NULL, NULL, 9, NULL, 3, NULL),                     /** Venta 68: Cliente jurídico 9 - segunda venta */
(2950.60, NULL, 'Venta almacén lambda', NULL, NULL, 10, NULL, 4, NULL),                /** Venta 69: Cliente jurídico 10 - primera venta */
(3580.30, NULL, 'Pedido mensual', NULL, NULL, 10, NULL, 5, NULL),                     /** Venta 70: Cliente jurídico 10 - segunda venta */
(3850.75, NULL, 'Compra comercializadora zeta', NULL, NULL, 11, NULL, 1, NULL),      /** Venta 71: Cliente jurídico 11 - primera venta */
(4125.50, NULL, 'Venta corporativa', NULL, NULL, 11, NULL, 2, NULL),                /** Venta 72: Cliente jurídico 11 - segunda venta */
(4475.90, NULL, 'Pedido omega plus', NULL, NULL, 12, NULL, 3, NULL),                /** Venta 73: Cliente jurídico 12 - primera venta */
(3925.40, NULL, 'Compra especial', NULL, NULL, 12, NULL, 4, NULL),                 /** Venta 74: Cliente jurídico 12 - segunda venta */
(5850.80, NULL, 'Venta corporación alpha', NULL, NULL, 13, NULL, 5, NULL),           /** Venta 75: Cliente jurídico 13 - primera venta */
(5275.60, NULL, 'Pedido empresarial', NULL, NULL, 13, NULL, 1, NULL),               /** Venta 76: Cliente jurídico 13 - segunda venta */
(2650.25, NULL, 'Compra servicios bravo', NULL, NULL, 14, NULL, 2, NULL),            /** Venta 77: Cliente jurídico 14 - primera venta */
(3180.75, NULL, 'Venta regular', NULL, NULL, 14, NULL, 3, NULL),                     /** Venta 78: Cliente jurídico 14 - segunda venta */
(6250.40, NULL, 'Pedido constructora charlie', NULL, NULL, 15, NULL, 4, NULL),      /** Venta 79: Cliente jurídico 15 - primera venta */
(5890.90, NULL, 'Compra obra grande', NULL, NULL, 15, NULL, 5, NULL),              /** Venta 80: Cliente jurídico 15 - segunda venta */
(3450.60, NULL, 'Venta logística delta', NULL, NULL, 16, NULL, 1, NULL),             /** Venta 81: Cliente jurídico 16 - primera venta */
(3920.35, NULL, 'Pedido transporte', NULL, NULL, 16, NULL, 2, NULL),                /** Venta 82: Cliente jurídico 16 - segunda venta */
(4680.80, NULL, 'Compra importadora echo', NULL, NULL, 17, NULL, 3, NULL),           /** Venta 83: Cliente jurídico 17 - primera venta */
(4250.70, NULL, 'Venta comercial', NULL, NULL, 17, NULL, 4, NULL),                   /** Venta 84: Cliente jurídico 17 - segunda venta */
(3750.45, NULL, 'Pedido comercial foxtrot', NULL, NULL, 18, NULL, 5, NULL),          /** Venta 85: Cliente jurídico 18 - primera venta */
(4180.90, NULL, 'Compra regular', NULL, NULL, 18, NULL, 1, NULL),                    /** Venta 86: Cliente jurídico 18 - segunda venta */
(3580.25, NULL, 'Venta distribuidora golf', NULL, NULL, 19, NULL, 2, NULL),         /** Venta 87: Cliente jurídico 19 - primera venta */
(4020.75, NULL, 'Pedido mayorista', NULL, NULL, 19, NULL, 3, NULL),                /** Venta 88: Cliente jurídico 19 - segunda venta */
(5420.60, NULL, 'Compra exportadora hotel', NULL, NULL, 20, NULL, 4, NULL),        /** Venta 89: Cliente jurídico 20 - primera venta */
(4950.30, NULL, 'Venta internacional', NULL, NULL, 20, NULL, 5, NULL);            /** Venta 90: Cliente jurídico 20 - segunda venta */

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
INSERT INTO detalle_presentacion (cantidad, precio_unitario, fk_inventario_1, fk_inventario_2, fk_inventario_3, fk_venta) VALUES
/** Venta 1: 5 botellas + 3 latas + 2 growlers = 10 productos */
(5, 3.00, 'B330', 1, 1, 1),       /** 5 botellas 330ml cerveza 1 */
(3, 2.50, 'L330', 3, 2, 1),       /** 3 latas 330ml cerveza 3 */
(2, 10.00, 'G1L', 9, 5, 1),       /** 2 growlers 1L cerveza 9 */

/** Venta 2: 4 botellas 500ml + 2 six-packs + 4 latas = 10 productos */
(4, 5.20, 'B500', 2, 1, 2),       /** 4 botellas 500ml cerveza 2 */
(2, 15.00, 'SP330', 4, 2, 2),     /** 2 six-packs 330ml cerveza 4 */
(4, 2.60, 'L330', 3, 2, 2),       /** 4 latas 330ml cerveza 3 */

/** Venta 3: 6 botellas + 2 botellas 500ml + 1 caja + 1 lata = 10 productos */
(6, 2.95, 'B330', 1, 1, 3),       /** 6 botellas 330ml cerveza 1 */
(2, 5.10, 'B500', 2, 1, 3),       /** 2 botellas 500ml cerveza 2 */
(1, 50.00, 'C24330', 5, 3, 3),    /** 1 caja 24 unidades cerveza 5 */
(1, 2.40, 'L330', 3, 2, 3),       /** 1 lata 330ml cerveza 3 */

/** Venta 4: 3 botellas + 2 latas + 1 barril + 4 botellas 330ml cerveza 11 = 10 productos */
(3, 3.15, 'B330', 1, 1, 4),       /** 3 botellas 330ml cerveza 1 */
(2, 2.70, 'L330', 3, 2, 4),       /** 2 latas 330ml cerveza 3 */
(1, 70.00, 'B20', 6, 3, 4),       /** 1 barril 20L cerveza 6 */
(4, 3.20, 'B330', 11, 6, 4),      /** 4 botellas 330ml cerveza 11 */

/** Venta 5: 5 botellas 500ml + 3 latas + 2 growlers = 10 productos */
(5, 5.30, 'B500', 12, 6, 5),      /** 5 botellas 500ml cerveza 12 */
(3, 2.55, 'L330', 13, 7, 5),      /** 3 latas 330ml cerveza 13 */
(2, 10.25, 'G1L', 9, 5, 5),       /** 2 growlers 1L cerveza 9 */

/** Venta 6: 4 botellas + 1 six-pack + 3 latas + 2 cajas 12 unidades = 10 productos */
(4, 3.20, 'B330', 1, 1, 6),       /** 4 botellas 330ml cerveza 1 */
(1, 15.50, 'SP330', 14, 7, 6),    /** 1 six-pack 330ml cerveza 14 */
(3, 2.45, 'L330', 3, 2, 6),       /** 3 latas 330ml cerveza 3 */
(2, 45.00, 'C12500', 10, 5, 6),   /** 2 cajas 12 unidades 500ml cerveza 10 */

/** Venta 7: 7 botellas + 1 barril + 2 latas = 10 productos */
(7, 3.25, 'B330', 11, 6, 7),      /** 7 botellas 330ml cerveza 11 */
(1, 100.00, 'B30', 7, 4, 7),      /** 1 barril 30L cerveza 7 */
(2, 2.80, 'L330', 13, 7, 7),      /** 2 latas 330ml cerveza 13 */

/** Venta 8: 6 botellas + 1 caja + 3 latas = 10 productos */
(6, 2.90, 'B330', 1, 1, 8),       /** 6 botellas 330ml cerveza 1 */
(1, 52.00, 'C24330', 15, 8, 8),   /** 1 caja 24 unidades cerveza 15 */
(3, 2.35, 'L330', 3, 2, 8),       /** 3 latas 330ml cerveza 3 */

/** Venta 9: 5 botellas 500ml + 2 six-packs + 3 latas = 10 productos */
(5, 5.60, 'B500', 2, 1, 9),       /** 5 botellas 500ml cerveza 2 */
(2, 15.25, 'SP330', 4, 2, 9),     /** 2 six-packs 330ml cerveza 4 */
(3, 2.65, 'L330', 13, 7, 9),      /** 3 latas 330ml cerveza 13 */

/** Venta 10: 4 botellas + 1 barril + 2 growlers + 3 latas = 10 productos */
(4, 3.00, 'B330', 11, 6, 10),     /** 4 botellas 330ml cerveza 11 */
(1, 160.00, 'B50', 8, 4, 10),     /** 1 barril 50L cerveza 8 */
(2, 11.50, 'G1L', 9, 5, 10),      /** 2 growlers 1L cerveza 9 */
(3, 2.75, 'L330', 3, 2, 10),      /** 3 latas 330ml cerveza 3 */

/** Venta 11: 8 botellas + 1 barril + 1 lata = 10 productos */
(8, 3.05, 'B330', 1, 1, 11),      /** 8 botellas 330ml cerveza 1 */
(1, 72.00, 'B20', 16, 8, 11),     /** 1 barril 20L cerveza 16 */
(1, 2.50, 'L330', 3, 2, 11),      /** 1 lata 330ml cerveza 3 */

/** Venta 12: 3 botellas + 1 six-pack + 2 botellas 500ml + 4 latas = 10 productos */
(3, 3.15, 'B330', 1, 1, 12),      /** 3 botellas 330ml cerveza 1 */
(1, 15.25, 'SP330', 4, 2, 12),    /** 1 six-pack 330ml cerveza 4 */
(2, 5.40, 'B500', 12, 6, 12),     /** 2 botellas 500ml cerveza 12 */
(4, 2.45, 'L330', 3, 2, 12),      /** 4 latas 330ml cerveza 3 */

/** Venta 13: 6 latas + 1 barril + 3 botellas 500ml = 10 productos */
(6, 2.40, 'L330', 13, 7, 13),     /** 6 latas 330ml cerveza 13 */
(1, 105.00, 'B30', 17, 9, 13),    /** 1 barril 30L cerveza 17 */
(3, 5.15, 'B500', 2, 1, 13),      /** 3 botellas 500ml cerveza 2 */

/** Venta 14: 5 botellas + 1 caja + 4 latas = 10 productos */
(5, 3.25, 'B330', 11, 6, 14),     /** 5 botellas 330ml cerveza 11 */
(1, 48.00, 'C24330', 5, 3, 14),   /** 1 caja 24 unidades cerveza 5 */
(4, 2.60, 'L330', 13, 7, 14),     /** 4 latas 330ml cerveza 13 */

/** Venta 15: 4 botellas + 2 botellas 500ml + 1 six-pack + 3 latas = 10 productos */
(4, 2.95, 'B330', 1, 1, 15),      /** 4 botellas 330ml cerveza 1 */
(2, 5.35, 'B500', 2, 1, 15),      /** 2 botellas 500ml cerveza 2 */
(1, 16.00, 'SP330', 14, 7, 15),   /** 1 six-pack 330ml cerveza 14 */
(3, 2.55, 'L330', 3, 2, 15),      /** 3 latas 330ml cerveza 3 */

/** Venta 16: 7 botellas + 1 barril + 2 latas = 10 productos */
(7, 3.10, 'B330', 11, 6, 16),     /** 7 botellas 330ml cerveza 11 */
(1, 165.00, 'B50', 18, 9, 16),    /** 1 barril 50L cerveza 18 */
(2, 2.65, 'L330', 13, 7, 16),     /** 2 latas 330ml cerveza 13 */

/** Venta 17: 3 botellas + 2 six-packs + 1 caja + 4 latas = 10 productos */
(3, 3.20, 'B330', 1, 1, 17),      /** 3 botellas 330ml cerveza 1 */
(2, 15.00, 'SP330', 4, 2, 17),    /** 2 six-packs 330ml cerveza 4 */
(1, 46.00, 'C12500', 10, 5, 17),  /** 1 caja 12 unidades 500ml cerveza 10 */
(4, 2.70, 'L330', 3, 2, 17),      /** 4 latas 330ml cerveza 3 */

/** Venta 18: 6 botellas 500ml + 2 growlers + 2 latas = 10 productos */
(6, 5.40, 'B500', 12, 6, 18),     /** 6 botellas 500ml cerveza 12 */
(2, 11.00, 'G1L', 9, 5, 18),      /** 2 growlers 1L cerveza 9 */
(2, 2.45, 'L330', 13, 7, 18),     /** 2 latas 330ml cerveza 13 */

/** Venta 19: 5 latas + 1 barril + 4 botellas = 10 productos */
(5, 2.50, 'L330', 3, 2, 19),      /** 5 latas 330ml cerveza 3 */
(1, 78.00, 'B20', 6, 3, 19),      /** 1 barril 20L cerveza 6 */
(4, 3.30, 'B330', 11, 6, 19),     /** 4 botellas 330ml cerveza 11 */

/** Venta 20: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 3.15, 'B330', 1, 1, 20),      /** 8 botellas 330ml cerveza 1 */
(1, 49.50, 'C24330', 15, 8, 20),  /** 1 caja 24 unidades cerveza 15 */
(1, 2.60, 'L330', 3, 2, 20),      /** 1 lata 330ml cerveza 3 */

/** Ventas 21-40: Combinaciones adicionales usando todos los productos del inventario */
/** Venta 21: 4 botellas + 3 latas + 2 six-packs + 1 growler = 10 productos */
(4, 3.05, 'B330', 1, 1, 21),      /** 4 botellas 330ml cerveza 1 */
(3, 2.50, 'L330', 3, 2, 21),      /** 3 latas 330ml cerveza 3 */
(2, 15.20, 'SP330', 14, 7, 21),   /** 2 six-packs 330ml cerveza 14 */
(1, 10.75, 'G1L', 9, 5, 21),      /** 1 growler 1L cerveza 9 */

/** Venta 22: 6 botellas 500ml + 2 latas + 1 caja + 1 botella = 10 productos */
(6, 5.40, 'B500', 12, 6, 22),     /** 6 botellas 500ml cerveza 12 */
(2, 2.45, 'L330', 13, 7, 22),     /** 2 latas 330ml cerveza 13 */
(1, 47.00, 'C12500', 10, 5, 22),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 3.20, 'B330', 11, 6, 22),     /** 1 botella 330ml cerveza 11 */

/** Venta 23: 5 botellas + 1 barril + 3 latas + 1 six-pack = 10 productos */
(5, 3.15, 'B330', 1, 1, 23),      /** 5 botellas 330ml cerveza 1 */
(1, 110.00, 'B30', 17, 9, 23),    /** 1 barril 30L cerveza 17 */
(3, 2.60, 'L330', 3, 2, 23),      /** 3 latas 330ml cerveza 3 */
(1, 16.50, 'SP330', 4, 2, 23),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 24: 7 latas + 2 botellas 500ml + 1 growler = 10 productos */
(7, 2.55, 'L330', 13, 7, 24),     /** 7 latas 330ml cerveza 13 */
(2, 5.30, 'B500', 2, 1, 24),      /** 2 botellas 500ml cerveza 2 */
(1, 11.25, 'G1L', 9, 5, 24),      /** 1 growler 1L cerveza 9 */

/** Venta 25: 3 botellas + 1 caja + 2 six-packs + 4 latas = 10 productos */
(3, 3.00, 'B330', 11, 6, 25),     /** 3 botellas 330ml cerveza 11 */
(1, 51.50, 'C24330', 15, 8, 25),  /** 1 caja 24 unidades cerveza 15 */
(2, 15.75, 'SP330', 14, 7, 25),   /** 2 six-packs 330ml cerveza 14 */
(4, 2.40, 'L330', 3, 2, 25),      /** 4 latas 330ml cerveza 3 */

/** Venta 26: 8 botellas + 1 barril + 1 lata = 10 productos */
(8, 2.95, 'B330', 1, 1, 26),      /** 8 botellas 330ml cerveza 1 */
(1, 170.00, 'B50', 18, 9, 26),    /** 1 barril 50L cerveza 18 */
(1, 2.65, 'L330', 13, 7, 26),     /** 1 lata 330ml cerveza 13 */

/** Venta 27: 4 botellas 500ml + 3 latas + 2 growlers + 1 six-pack = 10 productos */
(4, 5.45, 'B500', 12, 6, 27),     /** 4 botellas 500ml cerveza 12 */
(3, 2.70, 'L330', 3, 2, 27),      /** 3 latas 330ml cerveza 3 */
(2, 10.50, 'G1L', 9, 5, 27),      /** 2 growlers 1L cerveza 9 */
(1, 15.00, 'SP330', 4, 2, 27),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 28: 6 botellas + 1 caja + 2 latas + 1 botella 500ml = 10 productos */
(6, 3.10, 'B330', 11, 6, 28),     /** 6 botellas 330ml cerveza 11 */
(1, 48.50, 'C12500', 10, 5, 28),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 2.50, 'L330', 13, 7, 28),     /** 2 latas 330ml cerveza 13 */
(1, 5.20, 'B500', 2, 1, 28),      /** 1 botella 500ml cerveza 2 */

/** Venta 29: 5 latas + 1 barril + 3 botellas + 1 six-pack = 10 productos */
(5, 2.45, 'L330', 3, 2, 29),      /** 5 latas 330ml cerveza 3 */
(1, 75.00, 'B20', 16, 8, 29),     /** 1 barril 20L cerveza 16 */
(3, 3.25, 'B330', 1, 1, 29),      /** 3 botellas 330ml cerveza 1 */
(1, 16.25, 'SP330', 14, 7, 29),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 30: 7 botellas + 1 caja + 2 latas = 10 productos */
(7, 3.30, 'B330', 11, 6, 30),     /** 7 botellas 330ml cerveza 11 */
(1, 52.75, 'C24330', 5, 3, 30),   /** 1 caja 24 unidades cerveza 5 */
(2, 2.80, 'L330', 13, 7, 30),     /** 2 latas 330ml cerveza 13 */

/** Continuando con ventas 31-50 usando más productos del inventario */
/** Venta 31: 4 botellas + 2 botellas 500ml + 1 barril + 3 latas = 10 productos */
(4, 3.15, 'B330', 1, 1, 31),      /** 4 botellas 330ml cerveza 1 */
(2, 5.50, 'B500', 12, 6, 31),     /** 2 botellas 500ml cerveza 12 */
(1, 108.00, 'B30', 7, 4, 31),     /** 1 barril 30L cerveza 7 */
(3, 2.60, 'L330', 3, 2, 31),      /** 3 latas 330ml cerveza 3 */

/** Venta 32: 8 latas + 1 six-pack + 1 growler = 10 productos */
(8, 2.35, 'L330', 13, 7, 32),     /** 8 latas 330ml cerveza 13 */
(1, 15.50, 'SP330', 4, 2, 32),    /** 1 six-pack 330ml cerveza 4 */
(1, 11.75, 'G1L', 9, 5, 32),      /** 1 growler 1L cerveza 9 */

/** Venta 33: 5 botellas + 1 caja + 2 botellas 500ml + 2 latas = 10 productos */
(5, 2.90, 'B330', 11, 6, 33),     /** 5 botellas 330ml cerveza 11 */
(1, 49.00, 'C12500', 10, 5, 33),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 5.35, 'B500', 2, 1, 33),      /** 2 botellas 500ml cerveza 2 */
(2, 2.75, 'L330', 3, 2, 33),      /** 2 latas 330ml cerveza 3 */

/** Venta 34: 6 botellas + 1 barril + 2 six-packs + 1 lata = 10 productos */
(6, 3.20, 'B330', 1, 1, 34),      /** 6 botellas 330ml cerveza 1 */
(1, 162.00, 'B50', 8, 4, 34),     /** 1 barril 50L cerveza 8 */
(2, 15.25, 'SP330', 14, 7, 34),   /** 2 six-packs 330ml cerveza 14 */
(1, 2.55, 'L330', 13, 7, 34),     /** 1 lata 330ml cerveza 13 */

/** Venta 35: 3 botellas 500ml + 4 latas + 2 growlers + 1 caja = 10 productos */
(3, 5.60, 'B500', 12, 6, 35),     /** 3 botellas 500ml cerveza 12 */
(4, 2.45, 'L330', 3, 2, 35),      /** 4 latas 330ml cerveza 3 */
(2, 10.25, 'G1L', 9, 5, 35),      /** 2 growlers 1L cerveza 9 */
(1, 53.00, 'C24330', 15, 8, 35),  /** 1 caja 24 unidades cerveza 15 */

/** Venta 36: 9 botellas + 1 lata = 10 productos */
(9, 3.00, 'B330', 11, 6, 36),     /** 9 botellas 330ml cerveza 11 */
(1, 2.80, 'L330', 13, 7, 36),     /** 1 lata 330ml cerveza 13 */

/** Venta 37: 5 latas + 1 barril + 2 botellas 500ml + 2 six-packs = 10 productos */
(5, 2.65, 'L330', 3, 2, 37),      /** 5 latas 330ml cerveza 3 */
(1, 115.00, 'B30', 17, 9, 37),    /** 1 barril 30L cerveza 17 */
(2, 5.25, 'B500', 2, 1, 37),      /** 2 botellas 500ml cerveza 2 */
(2, 16.00, 'SP330', 4, 2, 37),    /** 2 six-packs 330ml cerveza 4 */

/** Venta 38: 4 botellas + 1 caja + 3 latas + 2 growlers = 10 productos */
(4, 3.35, 'B330', 1, 1, 38),      /** 4 botellas 330ml cerveza 1 */
(1, 46.50, 'C12500', 10, 5, 38),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 2.50, 'L330', 13, 7, 38),     /** 3 latas 330ml cerveza 13 */
(2, 11.00, 'G1L', 9, 5, 38),      /** 2 growlers 1L cerveza 9 */

/** Venta 39: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 2.85, 'B330', 11, 6, 39),     /** 7 botellas 330ml cerveza 11 */
(1, 80.00, 'B20', 6, 3, 39),      /** 1 barril 20L cerveza 6 */
(1, 15.75, 'SP330', 14, 7, 39),   /** 1 six-pack 330ml cerveza 14 */
(1, 2.70, 'L330', 3, 2, 39),      /** 1 lata 330ml cerveza 3 */

/** Venta 40: 6 latas + 2 botellas 500ml + 1 caja + 1 botella = 10 productos */
(6, 2.40, 'L330', 13, 7, 40),     /** 6 latas 330ml cerveza 13 */
(2, 5.40, 'B500', 12, 6, 40),     /** 2 botellas 500ml cerveza 12 */
(1, 50.25, 'C24330', 5, 3, 40),   /** 1 caja 24 unidades cerveza 5 */
(1, 3.10, 'B330', 1, 1, 40),      /** 1 botella 330ml cerveza 1 */

/** Ventas 41-90: Completando todas las ventas con variedad de productos */
/** Venta 41: 5 botellas + 2 six-packs + 3 latas = 10 productos */
(5, 3.05, 'B330', 1, 1, 41),      /** 5 botellas 330ml cerveza 1 */
(2, 15.30, 'SP330', 4, 2, 41),    /** 2 six-packs 330ml cerveza 4 */
(3, 2.50, 'L330', 3, 2, 41),      /** 3 latas 330ml cerveza 3 */

/** Venta 42: 4 botellas + 3 botellas 500ml + 2 growlers + 1 lata = 10 productos */
(4, 3.20, 'B330', 11, 6, 42),     /** 4 botellas 330ml cerveza 11 */
(3, 5.30, 'B500', 12, 6, 42),     /** 3 botellas 500ml cerveza 12 */
(2, 10.75, 'G1L', 9, 5, 42),      /** 2 growlers 1L cerveza 9 */
(1, 2.65, 'L330', 13, 7, 42),     /** 1 lata 330ml cerveza 13 */

/** Venta 43: 6 latas + 1 barril + 2 botellas + 1 six-pack = 10 productos */
(6, 2.45, 'L330', 3, 2, 43),      /** 6 latas 330ml cerveza 3 */
(1, 85.00, 'B20', 16, 8, 43),     /** 1 barril 20L cerveza 16 */
(2, 3.15, 'B330', 1, 1, 43),      /** 2 botellas 330ml cerveza 1 */
(1, 16.00, 'SP330', 14, 7, 43),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 44: 7 botellas + 1 caja + 2 latas = 10 productos */
(7, 2.95, 'B330', 11, 6, 44),     /** 7 botellas 330ml cerveza 11 */
(1, 51.25, 'C24330', 15, 8, 44),  /** 1 caja 24 unidades cerveza 15 */
(2, 2.70, 'L330', 13, 7, 44),     /** 2 latas 330ml cerveza 13 */

/** Venta 45: 3 botellas 500ml + 4 latas + 1 barril + 2 six-packs = 10 productos */
(3, 5.45, 'B500', 2, 1, 45),      /** 3 botellas 500ml cerveza 2 */
(4, 2.55, 'L330', 3, 2, 45),      /** 4 latas 330ml cerveza 3 */
(1, 120.00, 'B30', 17, 9, 45),    /** 1 barril 30L cerveza 17 */
(2, 15.75, 'SP330', 4, 2, 45),    /** 2 six-packs 330ml cerveza 4 */

/** Venta 46: 8 botellas + 1 caja + 1 growler = 10 productos */
(8, 3.10, 'B330', 1, 1, 46),      /** 8 botellas 330ml cerveza 1 */
(1, 48.75, 'C12500', 10, 5, 46),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 11.50, 'G1L', 9, 5, 46),      /** 1 growler 1L cerveza 9 */

/** Venta 47: 5 latas + 2 botellas 500ml + 1 barril + 2 botellas = 10 productos */
(5, 2.40, 'L330', 13, 7, 47),     /** 5 latas 330ml cerveza 13 */
(2, 5.60, 'B500', 12, 6, 47),     /** 2 botellas 500ml cerveza 12 */
(1, 175.00, 'B50', 18, 9, 47),    /** 1 barril 50L cerveza 18 */
(2, 3.25, 'B330', 11, 6, 47),     /** 2 botellas 330ml cerveza 11 */

/** Venta 48: 6 botellas + 2 six-packs + 2 latas = 10 productos */
(6, 2.85, 'B330', 1, 1, 48),      /** 6 botellas 330ml cerveza 1 */
(2, 15.50, 'SP330', 14, 7, 48),   /** 2 six-packs 330ml cerveza 14 */
(2, 2.75, 'L330', 3, 2, 48),      /** 2 latas 330ml cerveza 3 */

/** Venta 49: 4 botellas + 1 caja + 3 growlers + 2 latas = 10 productos */
(4, 3.00, 'B330', 11, 6, 49),     /** 4 botellas 330ml cerveza 11 */
(1, 52.50, 'C24330', 5, 3, 49),   /** 1 caja 24 unidades cerveza 5 */
(3, 10.25, 'G1L', 9, 5, 49),      /** 3 growlers 1L cerveza 9 */
(2, 2.80, 'L330', 13, 7, 49),     /** 2 latas 330ml cerveza 13 */

/** Venta 50: 9 latas + 1 botellas 500ml = 10 productos */
(9, 2.35, 'L330', 3, 2, 50),      /** 9 latas 330ml cerveza 3 */
(1, 5.75, 'B500', 2, 1, 50),      /** 1 botella 500ml cerveza 2 */

/** Continuando ventas 51-70 con más variedad */
/** Venta 51: 3 botellas + 1 barril + 2 six-packs + 4 latas = 10 productos */
(3, 3.15, 'B330', 1, 1, 51),      /** 3 botellas 330ml cerveza 1 */
(1, 90.00, 'B20', 6, 3, 51),      /** 1 barril 20L cerveza 6 */
(2, 16.25, 'SP330', 4, 2, 51),    /** 2 six-packs 330ml cerveza 4 */
(4, 2.60, 'L330', 3, 2, 51),      /** 4 latas 330ml cerveza 3 */

/** Venta 52: 5 botellas 500ml + 1 caja + 3 latas + 1 growler = 10 productos */
(5, 5.50, 'B500', 12, 6, 52),     /** 5 botellas 500ml cerveza 12 */
(1, 47.50, 'C12500', 10, 5, 52),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 2.45, 'L330', 13, 7, 52),     /** 3 latas 330ml cerveza 13 */
(1, 11.00, 'G1L', 9, 5, 52),      /** 1 growler 1L cerveza 9 */

/** Venta 53: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 2.90, 'B330', 11, 6, 53),     /** 7 botellas 330ml cerveza 11 */
(1, 125.00, 'B30', 7, 4, 53),     /** 1 barril 30L cerveza 7 */
(1, 15.00, 'SP330', 14, 7, 53),   /** 1 six-pack 330ml cerveza 14 */
(1, 2.85, 'L330', 3, 2, 53),      /** 1 lata 330ml cerveza 3 */

/** Venta 54: 6 latas + 2 botellas 500ml + 1 caja + 1 botella = 10 productos */
(6, 2.50, 'L330', 13, 7, 54),     /** 6 latas 330ml cerveza 13 */
(2, 5.40, 'B500', 2, 1, 54),      /** 2 botellas 500ml cerveza 2 */
(1, 53.75, 'C24330', 15, 8, 54),  /** 1 caja 24 unidades cerveza 15 */
(1, 3.20, 'B330', 1, 1, 54),      /** 1 botella 330ml cerveza 1 */

/** Venta 55: 4 botellas + 1 barril + 2 growlers + 3 latas = 10 productos */
(4, 3.05, 'B330', 11, 6, 55),     /** 4 botellas 330ml cerveza 11 */
(1, 180.00, 'B50', 8, 4, 55),     /** 1 barril 50L cerveza 8 */
(2, 10.50, 'G1L', 9, 5, 55),      /** 2 growlers 1L cerveza 9 */
(3, 2.70, 'L330', 3, 2, 55),      /** 3 latas 330ml cerveza 3 */

/** Venta 56: 8 botellas + 1 six-pack + 1 lata = 10 productos */
(8, 2.95, 'B330', 1, 1, 56),      /** 8 botellas 330ml cerveza 1 */
(1, 16.50, 'SP330', 4, 2, 56),    /** 1 six-pack 330ml cerveza 4 */
(1, 2.55, 'L330', 13, 7, 56),     /** 1 lata 330ml cerveza 13 */

/** Venta 57: 5 latas + 3 botellas 500ml + 1 caja + 1 six-pack = 10 productos */
(5, 2.65, 'L330', 3, 2, 57),      /** 5 latas 330ml cerveza 3 */
(3, 5.25, 'B500', 12, 6, 57),     /** 3 botellas 500ml cerveza 12 */
(1, 49.00, 'C12500', 10, 5, 57),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 15.75, 'SP330', 14, 7, 57),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 58: 6 botellas + 1 barril + 2 latas + 1 growler = 10 productos */
(6, 3.10, 'B330', 11, 6, 58),     /** 6 botellas 330ml cerveza 11 */
(1, 95.00, 'B20', 16, 8, 58),     /** 1 barril 20L cerveza 16 */
(2, 2.40, 'L330', 13, 7, 58),     /** 2 latas 330ml cerveza 13 */
(1, 11.25, 'G1L', 9, 5, 58),      /** 1 growler 1L cerveza 9 */

/** Venta 59: 7 botellas + 1 caja + 1 six-pack + 1 lata = 10 productos */
(7, 2.80, 'B330', 1, 1, 59),      /** 7 botellas 330ml cerveza 1 */
(1, 54.25, 'C24330', 5, 3, 59),   /** 1 caja 24 unidades cerveza 5 */
(1, 16.00, 'SP330', 4, 2, 59),    /** 1 six-pack 330ml cerveza 4 */
(1, 2.75, 'L330', 3, 2, 59),      /** 1 lata 330ml cerveza 3 */

/** Venta 60: 4 botellas 500ml + 3 latas + 1 barril + 2 botellas = 10 productos */
(4, 5.35, 'B500', 2, 1, 60),      /** 4 botellas 500ml cerveza 2 */
(3, 2.50, 'L330', 13, 7, 60),     /** 3 latas 330ml cerveza 13 */
(1, 130.00, 'B30', 17, 9, 60),    /** 1 barril 30L cerveza 17 */
(2, 3.25, 'B330', 11, 6, 60),     /** 2 botellas 330ml cerveza 11 */

/** Continuando ventas 61-90 para completar todas */
/** Venta 61: 9 botellas + 1 growler = 10 productos */
(9, 2.85, 'B330', 1, 1, 61),      /** 9 botellas 330ml cerveza 1 */
(1, 12.00, 'G1L', 9, 5, 61),      /** 1 growler 1L cerveza 9 */

/** Venta 62: 5 latas + 2 six-packs + 1 caja + 2 botellas = 10 productos */
(5, 2.45, 'L330', 3, 2, 62),      /** 5 latas 330ml cerveza 3 */
(2, 15.25, 'SP330', 14, 7, 62),   /** 2 six-packs 330ml cerveza 14 */
(1, 50.50, 'C12500', 10, 5, 62),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 3.00, 'B330', 11, 6, 62),     /** 2 botellas 330ml cerveza 11 */

/** Venta 63: 6 botellas + 1 barril + 2 botellas 500ml + 1 lata = 10 productos */
(6, 3.15, 'B330', 1, 1, 63),      /** 6 botellas 330ml cerveza 1 */
(1, 185.00, 'B50', 18, 9, 63),    /** 1 barril 50L cerveza 18 */
(2, 5.60, 'B500', 12, 6, 63),     /** 2 botellas 500ml cerveza 12 */
(1, 2.80, 'L330', 13, 7, 63),     /** 1 lata 330ml cerveza 13 */

/** Venta 64: 7 latas + 1 caja + 1 six-pack + 1 growler = 10 productos */
(7, 2.35, 'L330', 3, 2, 64),      /** 7 latas 330ml cerveza 3 */
(1, 52.00, 'C24330', 15, 8, 64),  /** 1 caja 24 unidades cerveza 15 */
(1, 16.50, 'SP330', 4, 2, 64),    /** 1 six-pack 330ml cerveza 4 */
(1, 11.75, 'G1L', 9, 5, 64),      /** 1 growler 1L cerveza 9 */

/** Venta 65: 4 botellas + 3 botellas 500ml + 1 barril + 2 latas = 10 productos */
(4, 2.90, 'B330', 11, 6, 65),     /** 4 botellas 330ml cerveza 11 */
(3, 5.45, 'B500', 2, 1, 65),      /** 3 botellas 500ml cerveza 2 */
(1, 100.00, 'B20', 6, 3, 65),     /** 1 barril 20L cerveza 6 */
(2, 2.65, 'L330', 13, 7, 65),     /** 2 latas 330ml cerveza 13 */

/** Venta 66: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 3.20, 'B330', 1, 1, 66),      /** 8 botellas 330ml cerveza 1 */
(1, 48.25, 'C12500', 10, 5, 66),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 2.70, 'L330', 3, 2, 66),      /** 1 lata 330ml cerveza 3 */

/** Venta 67: 5 botellas + 2 six-packs + 1 barril + 2 latas = 10 productos */
(5, 2.95, 'B330', 11, 6, 67),     /** 5 botellas 330ml cerveza 11 */
(2, 15.75, 'SP330', 14, 7, 67),   /** 2 six-packs 330ml cerveza 14 */
(1, 135.00, 'B30', 17, 9, 67),    /** 1 barril 30L cerveza 17 */
(2, 2.55, 'L330', 13, 7, 67),     /** 2 latas 330ml cerveza 13 */

/** Venta 68: 6 latas + 2 botellas 500ml + 1 caja + 1 growler = 10 productos */
(6, 2.40, 'L330', 3, 2, 68),      /** 6 latas 330ml cerveza 3 */
(2, 5.30, 'B500', 12, 6, 68),     /** 2 botellas 500ml cerveza 12 */
(1, 53.50, 'C24330', 5, 3, 68),   /** 1 caja 24 unidades cerveza 5 */
(1, 10.75, 'G1L', 9, 5, 68),      /** 1 growler 1L cerveza 9 */

/** Venta 69: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 3.05, 'B330', 1, 1, 69),      /** 7 botellas 330ml cerveza 1 */
(1, 105.00, 'B20', 16, 8, 69),    /** 1 barril 20L cerveza 16 */
(1, 15.00, 'SP330', 4, 2, 69),    /** 1 six-pack 330ml cerveza 4 */
(1, 2.85, 'L330', 13, 7, 69),     /** 1 lata 330ml cerveza 13 */

/** Venta 70: 4 botellas + 3 latas + 1 barril + 2 botellas 500ml = 10 productos */
(4, 2.80, 'B330', 11, 6, 70),     /** 4 botellas 330ml cerveza 11 */
(3, 2.60, 'L330', 3, 2, 70),      /** 3 latas 330ml cerveza 3 */
(1, 190.00, 'B50', 8, 4, 70),     /** 1 barril 50L cerveza 8 */
(2, 5.50, 'B500', 2, 1, 70),      /** 2 botellas 500ml cerveza 2 */

/** Ventas finales 71-90 */
/** Venta 71: 9 latas + 1 caja = 10 productos */
(9, 2.30, 'L330', 13, 7, 71),     /** 9 latas 330ml cerveza 13 */
(1, 49.75, 'C12500', 10, 5, 71),  /** 1 caja 12 unidades 500ml cerveza 10 */

/** Venta 72: 5 botellas + 2 six-packs + 2 growlers + 1 lata = 10 productos */
(5, 3.10, 'B330', 1, 1, 72),      /** 5 botellas 330ml cerveza 1 */
(2, 16.00, 'SP330', 14, 7, 72),   /** 2 six-packs 330ml cerveza 14 */
(2, 11.50, 'G1L', 9, 5, 72),      /** 2 growlers 1L cerveza 9 */
(1, 2.75, 'L330', 3, 2, 72),      /** 1 lata 330ml cerveza 3 */

/** Venta 73: 6 botellas + 1 barril + 1 caja + 2 latas = 10 productos */
(6, 2.85, 'B330', 11, 6, 73),     /** 6 botellas 330ml cerveza 11 */
(1, 140.00, 'B30', 17, 9, 73),    /** 1 barril 30L cerveza 17 */
(1, 54.00, 'C24330', 15, 8, 73),  /** 1 caja 24 unidades cerveza 15 */
(2, 2.50, 'L330', 13, 7, 73),     /** 2 latas 330ml cerveza 13 */

/** Venta 74: 7 botellas + 2 botellas 500ml + 1 six-pack = 10 productos */
(7, 3.00, 'B330', 1, 1, 74),      /** 7 botellas 330ml cerveza 1 */
(2, 5.65, 'B500', 12, 6, 74),     /** 2 botellas 500ml cerveza 12 */
(1, 15.50, 'SP330', 4, 2, 74),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 75: 4 latas + 1 barril + 3 botellas + 2 growlers = 10 productos */
(4, 2.55, 'L330', 3, 2, 75),      /** 4 latas 330ml cerveza 3 */
(1, 195.00, 'B50', 18, 9, 75),    /** 1 barril 50L cerveza 18 */
(3, 3.15, 'B330', 11, 6, 75),     /** 3 botellas 330ml cerveza 11 */
(2, 10.25, 'G1L', 9, 5, 75),      /** 2 growlers 1L cerveza 9 */

/** Venta 76: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 2.90, 'B330', 1, 1, 76),      /** 8 botellas 330ml cerveza 1 */
(1, 51.00, 'C12500', 10, 5, 76),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 2.80, 'L330', 13, 7, 76),     /** 1 lata 330ml cerveza 13 */

/** Venta 77: 5 botellas + 1 barril + 2 six-packs + 2 latas = 10 productos */
(5, 3.05, 'B330', 11, 6, 77),     /** 5 botellas 330ml cerveza 11 */
(1, 110.00, 'B20', 6, 3, 77),     /** 1 barril 20L cerveza 6 */
(2, 15.25, 'SP330', 14, 7, 77),   /** 2 six-packs 330ml cerveza 14 */
(2, 2.45, 'L330', 3, 2, 77),      /** 2 latas 330ml cerveza 3 */

/** Venta 78: 6 latas + 3 botellas 500ml + 1 caja = 10 productos */
(6, 2.60, 'L330', 13, 7, 78),     /** 6 latas 330ml cerveza 13 */
(3, 5.40, 'B500', 2, 1, 78),      /** 3 botellas 500ml cerveza 2 */
(1, 52.25, 'C24330', 5, 3, 78),   /** 1 caja 24 unidades cerveza 5 */

/** Venta 79: 7 botellas + 1 barril + 1 growler + 1 lata = 10 productos */
(7, 2.75, 'B330', 1, 1, 79),      /** 7 botellas 330ml cerveza 1 */
(1, 145.00, 'B30', 7, 4, 79),     /** 1 barril 30L cerveza 7 */
(1, 11.00, 'G1L', 9, 5, 79),      /** 1 growler 1L cerveza 9 */
(1, 2.70, 'L330', 3, 2, 79),      /** 1 lata 330ml cerveza 3 */

/** Venta 80: 4 botellas + 2 six-packs + 1 caja + 3 latas = 10 productos */
(4, 3.20, 'B330', 11, 6, 80),     /** 4 botellas 330ml cerveza 11 */
(2, 16.25, 'SP330', 4, 2, 80),    /** 2 six-packs 330ml cerveza 4 */
(1, 48.00, 'C12500', 10, 5, 80),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 2.55, 'L330', 13, 7, 80),     /** 3 latas 330ml cerveza 13 */

/** Ventas finales 81-90 */
/** Venta 81: 8 latas + 1 barril + 1 botella = 10 productos */
(8, 2.40, 'L330', 3, 2, 81),      /** 8 latas 330ml cerveza 3 */
(1, 200.00, 'B50', 18, 9, 81),    /** 1 barril 50L cerveza 18 */
(1, 3.25, 'B330', 1, 1, 81),      /** 1 botella 330ml cerveza 1 */

/** Venta 82: 5 botellas + 2 botellas 500ml + 1 caja + 2 growlers = 10 productos */
(5, 2.95, 'B330', 11, 6, 82),     /** 5 botellas 330ml cerveza 11 */
(2, 5.50, 'B500', 12, 6, 82),     /** 2 botellas 500ml cerveza 12 */
(1, 53.75, 'C24330', 15, 8, 82),  /** 1 caja 24 unidades cerveza 15 */
(2, 10.50, 'G1L', 9, 5, 82),      /** 2 growlers 1L cerveza 9 */

/** Venta 83: 6 botellas + 1 six-pack + 1 barril + 2 latas = 10 productos */
(6, 3.10, 'B330', 1, 1, 83),      /** 6 botellas 330ml cerveza 1 */
(1, 15.75, 'SP330', 14, 7, 83),   /** 1 six-pack 330ml cerveza 14 */
(1, 115.00, 'B20', 16, 8, 83),    /** 1 barril 20L cerveza 16 */
(2, 2.65, 'L330', 13, 7, 83),     /** 2 latas 330ml cerveza 13 */

/** Venta 84: 7 latas + 2 botellas 500ml + 1 caja = 10 productos */
(7, 2.35, 'L330', 3, 2, 84),      /** 7 latas 330ml cerveza 3 */
(2, 5.35, 'B500', 2, 1, 84),      /** 2 botellas 500ml cerveza 2 */
(1, 54.50, 'C12500', 10, 5, 84),  /** 1 caja 12 unidades 500ml cerveza 10 */

/** Venta 85: 4 botellas + 1 barril + 2 six-packs + 3 latas = 10 productos */
(4, 2.80, 'B330', 11, 6, 85),     /** 4 botellas 330ml cerveza 11 */
(1, 150.00, 'B30', 17, 9, 85),    /** 1 barril 30L cerveza 17 */
(2, 16.00, 'SP330', 4, 2, 85),    /** 2 six-packs 330ml cerveza 4 */
(3, 2.70, 'L330', 13, 7, 85),     /** 3 latas 330ml cerveza 13 */

/** Venta 86: 9 botellas + 1 growler = 10 productos */
(9, 3.00, 'B330', 1, 1, 86),      /** 9 botellas 330ml cerveza 1 */
(1, 12.25, 'G1L', 9, 5, 86),      /** 1 growler 1L cerveza 9 */

/** Venta 87: 5 latas + 3 botellas 500ml + 1 caja + 1 six-pack = 10 productos */
(5, 2.50, 'L330', 3, 2, 87),      /** 5 latas 330ml cerveza 3 */
(3, 5.60, 'B500', 12, 6, 87),     /** 3 botellas 500ml cerveza 12 */
(1, 49.25, 'C24330', 5, 3, 87),   /** 1 caja 24 unidades cerveza 5 */
(1, 15.50, 'SP330', 14, 7, 87),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 88: 6 botellas + 1 barril + 2 latas + 1 botella 500ml = 10 productos */
(6, 2.85, 'B330', 11, 6, 88),     /** 6 botellas 330ml cerveza 11 */
(1, 205.00, 'B50', 8, 4, 88),     /** 1 barril 50L cerveza 8 */
(2, 2.75, 'L330', 13, 7, 88),     /** 2 latas 330ml cerveza 13 */
(1, 5.70, 'B500', 2, 1, 88),      /** 1 botella 500ml cerveza 2 */

/** Venta 89: 7 botellas + 1 caja + 1 six-pack + 1 growler = 10 productos */
(7, 3.15, 'B330', 1, 1, 89),      /** 7 botellas 330ml cerveza 1 */
(1, 52.00, 'C12500', 10, 5, 89),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 16.50, 'SP330', 4, 2, 89),    /** 1 six-pack 330ml cerveza 4 */
(1, 11.75, 'G1L', 9, 5, 89),      /** 1 growler 1L cerveza 9 */

/** Venta 90: 8 latas + 1 barril + 1 botella = 10 productos */
(8, 2.45, 'L330', 13, 7, 90),     /** 8 latas 330ml cerveza 13 */
(1, 120.00, 'B20', 6, 3, 90),     /** 1 barril 20L cerveza 6 */
(1, 3.30, 'B330', 11, 6, 90);     /** 1 botella 330ml cerveza 11 */

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