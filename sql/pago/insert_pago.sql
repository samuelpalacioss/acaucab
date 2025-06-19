-- Insert data into método_pago
INSERT INTO metodo_pago (tipo, denominación, tipo_tarjeta, número, banco, fecha_vencimiento, número_cheque, fecha_adquisicion, fecha_canjeo) VALUES
-- Efectivo
('efectivo', 'Bs. 100', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('efectivo', 'Bs. 50', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('efectivo', 'Bs. 20', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
-- Tarjetas de crédito
('tarjeta_credito', NULL, 'Visa', 123456789, 'Banesco', '2025-12-31', NULL, NULL, NULL),
('tarjeta_credito', NULL, 'Mastercard', 987654321, 'Mercantil', '2026-06-30', NULL, NULL, NULL),
('tarjeta_credito', NULL, 'American Express', 456789123, 'Provincial', '2025-09-30', NULL, NULL, NULL),
-- Puntos
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2024-01-01', '2024-12-31'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-01', '2024-12-31'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-01', '2024-12-31'),
-- Cheques
('cheque', NULL, NULL, 789012345, 'BOD', NULL, 1001, NULL, NULL),
('cheque', NULL, NULL, 345678901, 'Banco de Venezuela', NULL, 1002, NULL, NULL),
-- Tarjetas de débito
('tarjeta_debito', NULL, NULL, 567890123, 'Banesco', '2025-12-31', NULL, NULL, NULL),
('tarjeta_debito', NULL, NULL, 890123456, 'Mercantil', '2026-06-30', NULL, NULL, NULL);

-- Insert data into afiliacion
INSERT INTO afiliacion (monto_mensual, fecha_inicio) VALUES
(100.00, '2023-01-15'),
(150.00, '2023-03-22'),
(200.00, '2023-05-10'),
(250.00, '2023-06-30'),
(300.00, '2023-08-05'),
(350.00, '2023-09-12'),
(400.00, '2023-10-25'),
(450.00, '2023-11-18'),
(500.00, '2023-12-01'),
(550.00, '2024-01-05'),
(600.00, '2024-01-20');

-- Insert data into mensualidad
INSERT INTO mensualidad (fecha_máxima_pago, fk_afiliacion, fk_miembro_1, fk_miembro_2) VALUES
('2024-01-31', 1, 'J', 123456789),
('2024-01-31', 2, 'V', 987654321),
('2024-01-31', 3, 'J', 234567890),
('2024-01-31', 4, 'V', 345678901),
('2024-01-31', 5, 'J', 456789012),
('2024-01-31', 6, 'V', 567890123),
('2024-01-31', 7, 'J', 678901234),
('2024-01-31', 8, 'V', 789012345),
('2024-01-31', 9, 'J', 890123456),
('2024-01-31', 10, 'V', 901234567),
('2024-01-31', 11, 'J', 12345678);

-- Insert data into miembro_método_pago
INSERT INTO miembro_metodo_pago (rif, naturaleza_rif, id) VALUES
(123456789, 'J', 1),
(123456789, 'J', 4),
(987654321, 'V', 2),
(987654321, 'V', 5),
(234567890, 'J', 3),
(234567890, 'J', 6),
(345678901, 'V', 7),
(345678901, 'V', 10),
(456789012, 'J', 8),
(456789012, 'J', 11),
(567890123, 'V', 9);

-- Insert data into cliente_método_pago
INSERT INTO cliente_metodo_pago (fk_metodo_pago, fk_cliente_natural, fk_cliente_juridico) VALUES
(1, 1, NULL),
(2, 2, NULL),
(3, 3, NULL),
(4, 4, NULL),
(5, 5, NULL),
(6, NULL, 1),
(7, NULL, 2),
(8, NULL, 3),
(9, NULL, 4),
(10, NULL, 5);

-- Insert data into tasa
-- NOTA: En producción, las tasas del USD serán actualizadas automáticamente por el cron job del BCV
-- Ver: scripts/procedures/refresh_bcv.sql y scripts/procedures/README_BCV_CRON.md

-- Datos de ejemplo para desarrollo (se puede ejecutar el script específico)
-- \i sql/pago/insert/08_insert_tasa_inicial.sql

/**
 * Insertar historial de tasas del BCV para los últimos 30 días
 * Simula el comportamiento del cron job con datos históricos
 * Las tasas reflejan una evolución realista del tipo de cambio USD/Bs
 */
INSERT INTO tasa (moneda, monto_equivalencia, fecha_inicio, fecha_fin)
VALUES 
    -- Hace 30 días hasta hace 25 días
    ('USD', 95.20, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE - INTERVAL '29 days'),
    ('USD', 95.45, CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE - INTERVAL '28 days'),
    ('USD', 95.68, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '27 days'),
    ('USD', 95.90, CURRENT_DATE - INTERVAL '27 days', CURRENT_DATE - INTERVAL '26 days'),
    ('USD', 96.12, CURRENT_DATE - INTERVAL '26 days', CURRENT_DATE - INTERVAL '25 days'),
    ('USD', 96.35, CURRENT_DATE - INTERVAL '25 days', CURRENT_DATE - INTERVAL '24 days'),
    
    -- Hace 24 días hasta hace 20 días
    ('USD', 96.58, CURRENT_DATE - INTERVAL '24 days', CURRENT_DATE - INTERVAL '23 days'),
    ('USD', 96.80, CURRENT_DATE - INTERVAL '23 days', CURRENT_DATE - INTERVAL '22 days'),
    ('USD', 97.02, CURRENT_DATE - INTERVAL '22 days', CURRENT_DATE - INTERVAL '21 days'),
    ('USD', 97.25, CURRENT_DATE - INTERVAL '21 days', CURRENT_DATE - INTERVAL '20 days'),
    ('USD', 97.48, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '19 days'),
    
    -- Hace 19 días hasta hace 15 días
    ('USD', 97.70, CURRENT_DATE - INTERVAL '19 days', CURRENT_DATE - INTERVAL '18 days'),
    ('USD', 97.92, CURRENT_DATE - INTERVAL '18 days', CURRENT_DATE - INTERVAL '17 days'),
    ('USD', 98.15, CURRENT_DATE - INTERVAL '17 days', CURRENT_DATE - INTERVAL '16 days'),
    ('USD', 98.38, CURRENT_DATE - INTERVAL '16 days', CURRENT_DATE - INTERVAL '15 days'),
    ('USD', 98.60, CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE - INTERVAL '14 days'),
    
    -- Hace 14 días hasta hace 10 días
    ('USD', 98.82, CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE - INTERVAL '13 days'),
    ('USD', 99.05, CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE - INTERVAL '12 days'),
    ('USD', 99.28, CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE - INTERVAL '11 days'),
    ('USD', 99.50, CURRENT_DATE - INTERVAL '11 days', CURRENT_DATE - INTERVAL '10 days'),
    ('USD', 99.72, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE - INTERVAL '9 days'),
    
    -- Hace 9 días hasta hace 5 días
    ('USD', 99.95, CURRENT_DATE - INTERVAL '9 days', CURRENT_DATE - INTERVAL '8 days'),
    ('USD', 100.18, CURRENT_DATE - INTERVAL '8 days', CURRENT_DATE - INTERVAL '7 days'),
    ('USD', 100.40, CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE - INTERVAL '6 days'),
    ('USD', 100.62, CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE - INTERVAL '5 days'),
    ('USD', 100.85, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE - INTERVAL '4 days'),
    
    -- Últimos 4 días
    ('USD', 101.08, CURRENT_DATE - INTERVAL '4 days', CURRENT_DATE - INTERVAL '3 days'),
    ('USD', 101.30, CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE - INTERVAL '2 days'),
    ('USD', 101.52, CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE - INTERVAL '1 day'),
    ('USD', 101.75, CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE);


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