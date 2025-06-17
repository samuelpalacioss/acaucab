/**
 * Inserción de registros para las tablas de venta
 * Incluye datos para: venta_evento, orden_de_compra, detalle_evento
 * Usa referencias de stock_miembro y presentacion_cerveza existentes
 */

/**
 * Inserción de ventas de eventos
 * @param id - Se genera automáticamente con SERIAL
 * @param monto_total - Monto total de la venta en formato DECIMAL
 * @param fecha_venta - Fecha cuando se realizó la venta
 * @param fk_cliente_juridico - Referencia a cliente jurídico (opcional)
 * @param fk_cliente_natural - Referencia a cliente natural (opcional)
 */
INSERT INTO venta_evento (
    monto_total,
    fk_cliente_juridico,
    fk_cliente_natural
) VALUES
    (450.00, 1, NULL),        /** Venta a cliente jurídico */
    (280.50, NULL, 1),        /** Venta a cliente natural */
    (650.75, 2, NULL),        /** Venta a cliente jurídico */
    (320.25, 2, NULL),        /** Venta a cliente natural */
    (890.00, 3, NULL),        /** Venta a cliente jurídico */
    (150.00, 3, NULL),        /** Venta a cliente natural */
    (750.50, 4, NULL),        /** Venta a cliente jurídico */
    (420.75, 4, NULL),        /** Venta a cliente natural */
    (580.25, 5, NULL),        /** Venta a cliente jurídico */
    (290.00, 5, NULL);        /** Venta a cliente natural */

/**
 * Inserción de órdenes de compra
 * @param id - Se genera automáticamente con SERIAL
 * @param fecha_solicitud - Fecha de solicitud de la orden
 * @param fecha_entrega - Fecha estimada de entrega (opcional)
 * @param observacion - Observaciones adicionales (opcional)
 * @param fk_empleado - Referencia al empleado que hace la orden
 * @param fk_presentacion_cerveza_1 - Referencia al ID de cerveza
 * @param fk_presentacion_cerveza_2 - Referencia al SKU de presentación
 * @param unidades - Cantidad de unidades a ordenar
 */
INSERT INTO orden_de_compra (
    fecha_solicitud,
    fecha_entrega,
    observacion,
    fk_empleado,
    fk_presentacion_cerveza_2,
    fk_presentacion_cerveza_1,
    unidades
) VALUES
    ('2025-01-10', '2025-01-20', 'Orden urgente para evento', 1, 1, 'B330', 500),      /** Botellas 330ml Destilo */
    ('2025-01-11', '2025-01-21', 'Stock regular', 2, 2, 'B500', 300),                 /** Botellas 500ml Dos Leones */
    ('2025-01-12', '2025-01-22', NULL, 3, 3, 'L330', 400),                           /** Latas 330ml Benitz Pale Ale */
    ('2025-01-13', '2025-01-23', 'Para promoción especial', 4, 4, 'SP330', 100),     /** Six-packs Candileja de Abadía */
    ('2025-01-14', '2025-01-24', 'Pedido mayorista', 5, 5, 'C24330', 50),            /** Cajas 24 unidades Ángel o Demonio */
    ('2025-01-15', '2025-01-25', NULL, 1, 6, 'B20', 20),                             /** Barriles 20L Barricas Saison Belga */
    ('2025-01-16', '2025-01-26', 'Para bar asociado', 2, 7, 'B30', 15),              /** Barriles 30L Aldarra Mantuana */
    ('2025-01-17', '2025-01-27', 'Evento especial', 3, 8, 'B50', 10),                /** Barriles 50L Tröegs HopBack Amber */
    ('2025-01-18', '2025-01-28', NULL, 4, 9, 'G1L', 200),                            /** Growlers 1L Full Sail Amber */
    ('2025-01-19', '2025-01-29', 'Reposición stock', 5, 10, 'C12500', 80);           /** Cajas 12 unidades Deschutes Cinder Cone */

/**
 * Inserción de detalles de evento
 * @param cantidad - Cantidad vendida del producto
 * @param precio_unitario - Precio por unidad vendida
 * @param fk_stock_miembro_* - Referencias compuestas al stock del miembro (5 campos)
 * @param fk_venta_evento - Referencia a la venta del evento
 * Datos alineados exactamente con stock_miembro existente
 */
INSERT INTO detalle_evento (
    cantidad,
    precio_unitario,
    fk_stock_miembro_1,      /** evento (INTEGER) - 1º en clave primaria stock_miembro */
    fk_stock_miembro_2,      /** rif (INTEGER) - 2º en clave primaria stock_miembro */
    fk_stock_miembro_3,      /** naturaleza_rif (CHAR) - 3º en clave primaria stock_miembro */
    fk_venta_evento,         /** id_venta (INTEGER) */
    fk_stock_miembro_4,      /** sku (VARCHAR) - 4º en clave primaria stock_miembro */
    fk_stock_miembro_5       /** id_cerveza (INTEGER) - 5º en clave primaria stock_miembro */
) VALUES
    (50, 4.50, 1, 123456789, 'J', 1, 'B330', 1),      /** 50 botellas 330ml del stock de miembro evento 1, RIF 123456789-J → venta_evento ID 1 */
    (25, 6.50, 1, 987654321, 'V', 2, 'B500', 2),      /** 25 botellas 500ml del stock de miembro evento 1, RIF 987654321-V → venta_evento ID 2 */
    (30, 3.50, 2, 234567890, 'J', 3, 'L330', 3),      /** 30 latas 330ml del stock de miembro evento 2, RIF 234567890-J → venta_evento ID 3 */
    (10, 18.00, 3, 345678901, 'V', 4, 'SP330', 4),    /** 10 six-packs del stock de miembro evento 3, RIF 345678901-V → venta_evento ID 4 */
    (5, 55.00, 4, 456789012, 'J', 5, 'C24330', 5),    /** 5 cajas 24 unidades del stock de miembro evento 4, RIF 456789012-J → venta_evento ID 5 */
    (3, 75.00, 5, 567890123, 'V', 6, 'B20', 6),       /** 3 barriles 20L del stock de miembro evento 5, RIF 567890123-V → venta_evento ID 6 */
    (2, 110.00, 6, 678901234, 'J', 7, 'B30', 7),      /** 2 barriles 30L del stock de miembro evento 6, RIF 678901234-J → venta_evento ID 7 */
    (1, 170.00, 7, 789012345, 'V', 8, 'B50', 8),      /** 1 barril 50L del stock de miembro evento 7, RIF 789012345-V → venta_evento ID 8 */
    (15, 12.00, 8, 890123456, 'J', 9, 'G1L', 9),      /** 15 growlers 1L del stock de miembro evento 8, RIF 890123456-J → venta_evento ID 9 */
    (8, 48.00, 9, 901234567, 'V', 10, 'C12500', 10),  /** 8 cajas 12 unidades del stock de miembro evento 9, RIF 901234567-V → venta_evento ID 10 */
    (40, 4.50, 10, 123456780, 'V', 1, 'B330', 1);     /** 40 botellas 330ml del stock de miembro evento 10, RIF 123456780-V → venta_evento ID 1 */ 