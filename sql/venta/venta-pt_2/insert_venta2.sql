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
    fk_evento_cliente_1
    fk_evento_cliente_2
) VALUES
    (450.00, 1, 1),        /** Venta a cliente jurídico */
    (280.50, 2, 2),        /** Venta a cliente natural */
    (650.75, 3, 3),        /** Venta a cliente jurídico */
    (320.25, 4, 4),        /** Venta a cliente natural */
    (890.00, 5, 5),        /** Venta a cliente jurídico */
    (150.00, 6, 6),        /** Venta a cliente natural */
    (750.50, 7, 7),        /** Venta a cliente jurídico */
    (420.75, 8, 8),        /** Venta a cliente natural */
    (580.25, 9, 9),        /** Venta a cliente jurídico */
    (290.00, 10, 10);        /** Venta a cliente natural */

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
    fk_usuario,
    fk_presentacion_cerveza_1,
    fk_presentacion_cerveza_2,
    unidades,
    fk_miembro_1,
    fk_miembro_2
) VALUES
    ('2024-05-10', '2024-05-17', 'Orden antigua - evento pasado', 22, 1, 1, 10000, 123456789, 'J'),      -- ID 1
    ('2024-06-12', '2024-06-20', 'Pedido histórico', 22, 2, 2, 10000, 234567890, 'J'),                           -- ID 2
    ('2024-07-13', '2024-07-22', 'Promoción especial pasada', 9, 5, 5, 10000, 345678901, 'V'),     -- ID 3
    ('2024-08-15', '2024-08-23', 'Pedido anterior', 22, 6, 6, 10000, 567890123, 'V'),                             -- ID 4
    ('2024-09-16', '2024-09-25', 'Bar asociado - pedido pasado', 22, 7, 7, 10000, 678901234, 'J'),              -- ID 5
    ('2024-10-17', '2024-10-27', 'Evento especial anterior', 22, 8, 8, 10000, 789012345, 'V'),                -- ID 6
    ('2024-11-18', '2024-11-28', 'Pedido regular pasado', 22, 9, 9, 10000, 890123456, 'J'),                            -- ID 7
    ('2025-06-20', NULL, 'URGENTE - Stock crítico Zona Refrigerada', 22, 6, 16, 10000, 987654321, 'V'),                 -- ID 8
    ('2025-06-22', NULL, 'CRÍTICO - Zona Barriles sin stock', 22, 7, 17, 10000, 456789012, 'J'),            -- ID 9
    ('2025-06-24', NULL, 'URGENTE - Pasillo Salida agotado', 22, 8, 18, 10000, 901234567, 'V');           -- ID 10

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
    fk_stock_miembro_3,      /** naturaleza_rif (CHAR) - 3º en clave primaria stock_miembro */
    fk_stock_miembro_1,      /** evento (INTEGER) - 1º en clave primaria stock_miembro */
    fk_stock_miembro_2,      /** rif (INTEGER) - 2º en clave primaria stock_miembro */
    fk_venta_evento,         /** id_venta (INTEGER) */
    fk_stock_miembro_4,      /** sku (VARCHAR) - 4º en clave primaria stock_miembro */
    fk_stock_miembro_5       /** id_cerveza (INTEGER) - 5º en clave primaria stock_miembro */
) VALUES
    (50, 4.50, 1, 123456789, 'J', 1, 1, 1),      /** 50 botellas 330ml del stock de miembro evento 1, RIF 123456789-J → venta_evento ID 1 */
    (25, 6.50, 1, 987654321, 'V', 2, 2, 2),      /** 25 botellas 500ml del stock de miembro evento 1, RIF 987654321-V → venta_evento ID 2 */
    (30, 3.50, 2, 234567890, 'J', 3, 3, 3),      /** 30 latas 330ml del stock de miembro evento 2, RIF 234567890-J → venta_evento ID 3 */
    (10, 18.00, 3, 345678901, 'V', 4, 4, 4),    /** 10 six-packs del stock de miembro evento 3, RIF 345678901-V → venta_evento ID 4 */
    (5, 55.00, 4, 456789012, 'J', 5, 5, 5),    /** 5 cajas 24 unidades del stock de miembro evento 4, RIF 456789012-J → venta_evento ID 5 */
    (3, 75.00, 5, 567890123, 'V', 6, 6, 6),       /** 3 barriles 20L del stock de miembro evento 5, RIF 567890123-V → venta_evento ID 6 */
    (2, 110.00, 6, 678901234, 'J', 7, 7, 7),      /** 2 barriles 30L del stock de miembro evento 6, RIF 678901234-J → venta_evento ID 7 */
    (1, 170.00, 7, 789012345, 'V', 8, 8, 8),      /** 1 barril 50L del stock de miembro evento 7, RIF 789012345-V → venta_evento ID 8 */
    (15, 12.00, 8, 890123456, 'J', 9, 9, 9),      /** 15 growlers 1L del stock de miembro evento 8, RIF 890123456-J → venta_evento ID 9 */
    (8, 48.00, 9, 901234567, 'V', 10, 10, 10),  /** 8 cajas 12 unidades del stock de miembro evento 9, RIF 901234567-V → venta_evento ID 10 */
    (40, 4.50, 10, 123456780, 'V', 1, 1, 1);     /** 40 botellas 330ml del stock de miembro evento 10, RIF 123456780-V → venta_evento ID 1 */ 