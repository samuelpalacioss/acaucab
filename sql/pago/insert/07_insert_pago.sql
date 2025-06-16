/**
 * Inserts para la tabla pago
 * Incluye pagos tanto de mensualidades de miembros como de compras de clientes
 * Cada pago debe tener o método de pago de miembro o de cliente, no ambos
 */
INSERT INTO pago (
    monto,
    fecha_pago,
    fk_tasa,
    fk_mensualidad_1,
    fk_mensualidad_2,
    fk_mensualidad_3,
    fk_venta,
    fk_orden_de_compra,
    fk_venta_evento,
    fk_miembro_metodo_pago_3,
    fk_miembro_metodo_pago_2,
    fk_miembro_metodo_pago_1,
    fk_cliente_metodo_pago_1,
    fk_cliente_metodo_pago_2
) VALUES
    -- Pagos de mensualidades de miembros
    (150.00, '2024-01-15', 1, 1, 123456789, 'J', 1, 1, 1, 123456789, 'J', 1, NULL, NULL),
    (150.00, '2024-01-16', 1, 2, 987654321, 'V', 2, 2, 2, 987654321, 'V', 2, NULL, NULL),
    (150.00, '2024-01-17', 1, 3, 234567890, 'J', 3, 3, 3, 234567890, 'J', 3, NULL, NULL),
    (150.00, '2024-01-18', 1, 4, 345678901, 'V', 4, 4, 4, 345678901, 'V', 7, NULL, NULL),
    (150.00, '2024-01-19', 1, 5, 456789012, 'J', 5, 5, 5, 456789012, 'J', 8, NULL, NULL),
    (150.00, '2024-01-20', 1, 6, 567890123, 'V', 6, 6, 6, 567890123, 'V', 9, NULL, NULL),
    (150.00, '2024-01-21', 1, 7, 678901234, 'J', 7, 7, 7, 123456789, 'J', 4, NULL, NULL),
    (150.00, '2024-01-22', 1, 8, 789012345, 'V', 8, 8, 8, 987654321, 'V', 5, NULL, NULL),
    (150.00, '2024-01-23', 1, 9, 890123456, 'J', 9, 9, 9, 234567890, 'J', 6, NULL, NULL),
    (150.00, '2024-01-24', 1, 10, 901234567, 'V', 10, 10, 10, 345678901, 'V', 10, NULL, NULL),

    -- Pagos de compras de clientes
    (450.00, '2024-01-25', 1, 1, 123456789, 'J', 11, 1, 1, NULL, NULL, NULL, 1, 1),
    (280.50, '2024-01-26', 1, 2, 987654321, 'V', 12, 2, 2, NULL, NULL, NULL, 2, 2),
    (650.75, '2024-01-27', 1, 3, 234567890, 'J', 13, 3, 3, NULL, NULL, NULL, 3, 3),
    (320.25, '2024-01-28', 1, 4, 345678901, 'V', 14, 4, 4, NULL, NULL, NULL, 4, 4),
    (890.00, '2024-01-29', 1, 5, 456789012, 'J', 15, 5, 5, NULL, NULL, NULL, 5, 5),
    (150.00, '2024-01-30', 1, 6, 567890123, 'V', 16, 6, 6, NULL, NULL, NULL, 6, 6),
    (750.50, '2024-01-31', 1, 7, 678901234, 'J', 17, 7, 7, NULL, NULL, NULL, 7, 7),
    (420.75, '2024-02-01', 1, 8, 789012345, 'V', 18, 8, 8, NULL, NULL, NULL, 8, 8),
    (580.25, '2024-02-02', 1, 9, 890123456, 'J', 19, 9, 9, NULL, NULL, NULL, 9, 9),
    (290.00, '2024-02-03', 1, 10, 901234567, 'V', 20, 10, 10, NULL, NULL, NULL, 10, 10);
/**
 * Inserts para la tabla pago
 * Incluye pagos tanto de mensualidades de miembros como de compras de clientes
 * Cada pago debe tener o método de pago de miembro o de cliente, no ambos
 */
INSERT INTO pago (
    monto,
    fecha_pago,
    fk_tasa,
    fk_mensualidad_1,
    fk_mensualidad_2,
    fk_mensualidad_3,
    fk_venta,
    fk_orden_de_compra,
    fk_venta_evento,
    fk_miembro_metodo_pago_3,
    fk_miembro_metodo_pago_2,
    fk_miembro_metodo_pago_1,
    fk_cliente_metodo_pago_1,
    fk_cliente_metodo_pago_2
) VALUES
    -- Pagos de mensualidades de miembros
    (150.00, '2024-01-15', 1, 1, 123456789, 'J', 1, 1, 1, 123456789, 'J', 1, NULL, NULL),
    (150.00, '2024-01-16', 1, 2, 987654321, 'V', 2, 2, 2, 987654321, 'V', 2, NULL, NULL),
    (150.00, '2024-01-17', 1, 3, 234567890, 'J', 3, 3, 3, 234567890, 'J', 3, NULL, NULL),
    (150.00, '2024-01-18', 1, 4, 345678901, 'V', 4, 4, 4, 345678901, 'V', 7, NULL, NULL),
    (150.00, '2024-01-19', 1, 5, 456789012, 'J', 5, 5, 5, 456789012, 'J', 8, NULL, NULL),
    (150.00, '2024-01-20', 1, 6, 567890123, 'V', 6, 6, 6, 567890123, 'V', 9, NULL, NULL),
    (150.00, '2024-01-21', 1, 7, 678901234, 'J', 7, 7, 7, 123456789, 'J', 4, NULL, NULL),
    (150.00, '2024-01-22', 1, 8, 789012345, 'V', 8, 8, 8, 987654321, 'V', 5, NULL, NULL),
    (150.00, '2024-01-23', 1, 9, 890123456, 'J', 9, 9, 9, 234567890, 'J', 6, NULL, NULL),
    (150.00, '2024-01-24', 1, 10, 901234567, 'V', 10, 10, 10, 345678901, 'V', 10, NULL, NULL),

    -- Pagos de compras de clientes
    (450.00, '2024-01-25', 1, 1, 123456789, 'J', 11, 1, 1, NULL, NULL, NULL, 1, 1),
    (280.50, '2024-01-26', 1, 2, 987654321, 'V', 12, 2, 2, NULL, NULL, NULL, 2, 2),
    (650.75, '2024-01-27', 1, 3, 234567890, 'J', 13, 3, 3, NULL, NULL, NULL, 3, 3),
    (320.25, '2024-01-28', 1, 4, 345678901, 'V', 14, 4, 4, NULL, NULL, NULL, 4, 4),
    (890.00, '2024-01-29', 1, 5, 456789012, 'J', 15, 5, 5, NULL, NULL, NULL, 5, 5),
    (150.00, '2024-01-30', 1, 6, 567890123, 'V', 16, 6, 6, NULL, NULL, NULL, 6, 6),
    (750.50, '2024-01-31', 1, 7, 678901234, 'J', 17, 7, 7, NULL, NULL, NULL, 7, 7),
    (420.75, '2024-02-01', 1, 8, 789012345, 'V', 18, 8, 8, NULL, NULL, NULL, 8, 8),
    (580.25, '2024-02-02', 1, 9, 890123456, 'J', 19, 9, 9, NULL, NULL, NULL, 9, 9),
    (290.00, '2024-02-03', 1, 10, 901234567, 'V', 20, 10, 10, NULL, NULL, NULL, 10, 10);
