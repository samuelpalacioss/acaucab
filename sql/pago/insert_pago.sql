-- Truncate tables to ensure a clean state
TRUNCATE TABLE cliente_metodo_pago CASCADE;
TRUNCATE TABLE metodo_pago RESTART IDENTITY CASCADE;

-- Insert data into método_pago
-- 100 Points for the first 10 natural clients (10 points each)
INSERT INTO metodo_pago (tipo, denominación, tipo_tarjeta, número, banco, fecha_vencimiento, número_cheque, fecha_adquisicion, fecha_canjeo) VALUES
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-01', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-02', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-03', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-04', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-05', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-06', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-07', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-08', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-09', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-10', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-11', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-12', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-13', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-14', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-15', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-16', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-17', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-18', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-19', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-20', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-21', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-22', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-23', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-24', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-25', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-26', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-27', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-28', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-29', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-30', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-01-31', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-01', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-02', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-03', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-04', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-05', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-06', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-07', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-08', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-09', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-10', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-11', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-12', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-13', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-14', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-15', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-16', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-17', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-18', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-19', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-20', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-21', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-22', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-23', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-24', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-25', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-26', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-27', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-28', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-01', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-02', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-03', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-04', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-05', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-06', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-07', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-08', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-09', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-10', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-11', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-12', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-13', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-14', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-15', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-16', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-17', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-18', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-19', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-20', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-21', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-22', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-23', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-24', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-25', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-26', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-27', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-28', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-29', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-30', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-31', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-02', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-03', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-04', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-05', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-06', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-07', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-08', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-09', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-10', NULL),
-- Original Payment Methods (Cards, Cash, etc.) starting from ID 101
('tarjeta_credito', NULL, 'Visa', 1234567890, 'Banco Mercantil', '2025-12-31', NULL, NULL, NULL),
('tarjeta_credito', NULL, 'MasterCard', 2345678901, 'Banesco', '2024-11-30', NULL, NULL, NULL),
('tarjeta_debito', NULL, NULL, 3456789012, 'Banco de Venezuela', '2026-08-31', NULL, NULL, NULL),
('tarjeta_debito', NULL, NULL, 4567890123, 'BBVA Provincial', '2025-06-30', NULL, NULL, NULL),
('cheque', NULL, NULL, 1001, 'Banco Mercantil', NULL, 5678, NULL, NULL),
('cheque', NULL, NULL, 1002, 'Banesco', NULL, 6789, NULL, NULL),
('efectivo', '1 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('efectivo', '5 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('efectivo', '20 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('efectivo', '100 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- Insert data into cliente_método_pago
INSERT INTO cliente_metodo_pago (fk_metodo_pago, fk_cliente_natural, fk_cliente_juridico) VALUES
(1, 1, NULL), (2, 1, NULL), (3, 1, NULL), (4, 1, NULL), (5, 1, NULL), (6, 1, NULL), (7, 1, NULL), (8, 1, NULL), (9, 1, NULL), (10, 1, NULL),
(11, 2, NULL), (12, 2, NULL), (13, 2, NULL), (14, 2, NULL), (15, 2, NULL), (16, 2, NULL), (17, 2, NULL), (18, 2, NULL), (19, 2, NULL), (20, 2, NULL),
(21, 3, NULL), (22, 3, NULL), (23, 3, NULL), (24, 3, NULL), (25, 3, NULL), (26, 3, NULL), (27, 3, NULL), (28, 3, NULL), (29, 3, NULL), (30, 3, NULL),
(31, 4, NULL), (32, 4, NULL), (33, 4, NULL), (34, 4, NULL), (35, 4, NULL), (36, 4, NULL), (37, 4, NULL), (38, 4, NULL), (39, 4, NULL), (40, 4, NULL),
(41, 5, NULL), (42, 5, NULL), (43, 5, NULL), (44, 5, NULL), (45, 5, NULL), (46, 5, NULL), (47, 5, NULL), (48, 5, NULL), (49, 5, NULL), (50, 5, NULL),
(51, 6, NULL), (52, 6, NULL), (53, 6, NULL), (54, 6, NULL), (55, 6, NULL), (56, 6, NULL), (57, 6, NULL), (58, 6, NULL), (59, 6, NULL), (60, 6, NULL),
(61, 7, NULL), (62, 7, NULL), (63, 7, NULL), (64, 7, NULL), (65, 7, NULL), (66, 7, NULL), (67, 7, NULL), (68, 7, NULL), (69, 7, NULL), (70, 7, NULL),
(71, 8, NULL), (72, 8, NULL), (73, 8, NULL), (74, 8, NULL), (75, 8, NULL), (76, 8, NULL), (77, 8, NULL), (78, 8, NULL), (79, 8, NULL), (80, 8, NULL),
(81, 9, NULL), (82, 9, NULL), (83, 9, NULL), (84, 9, NULL), (85, 9, NULL), (86, 9, NULL), (87, 9, NULL), (88, 9, NULL), (89, 9, NULL), (90, 9, NULL),
(91, 10, NULL), (92, 10, NULL), (93, 10, NULL), (94, 10, NULL), (95, 10, NULL), (96, 10, NULL), (97, 10, NULL), (98, 10, NULL), (99, 10, NULL), (100, 10, NULL),
(101, 1, NULL),
(102, 2, NULL),
(103, 3, NULL),
(104, 4, NULL),
(105, 5, NULL),
(106, NULL, 1),
(107, NULL, 2),
(108, NULL, 3),
(109, NULL, 4),
(110, NULL, 5);

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
    ('Punto', 1, CURRENT_DATE - INTERVAL '30 days', NULL),
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
    fk_cliente_metodo_pago_1
) VALUES
    -- Pagos de mensualidades de miembros
    (150.00, '2024-01-15', 1, 1, 123456789, 'J', 1, 1, 1, 123456789, 'J', 1, NULL),
    (150.00, '2024-01-16', 1, 2, 987654321, 'V', 2, 2, 2, 987654321, 'V', 2, NULL),
    (150.00, '2024-01-17', 1, 3, 234567890, 'J', 3, 3, 3, 234567890, 'J', 3, NULL),
    (150.00, '2024-01-18', 1, 4, 345678901, 'V', 4, 4, 4, 345678901, 'V', 7, NULL),
    (150.00, '2024-01-19', 1, 5, 456789012, 'J', 5, 5, 5, 456789012, 'J', 8, NULL),
    (150.00, '2024-01-20', 1, 6, 567890123, 'V', 6, 6, 6, 567890123, 'V', 9, NULL),
    (150.00, '2024-01-21', 1, 7, 678901234, 'J', 7, 7, 7, 123456789, 'J', 4, NULL),
    (150.00, '2024-01-22', 1, 8, 789012345, 'V', 8, 8, 8, 987654321, 'V', 5, NULL),
    (150.00, '2024-01-23', 1, 9, 890123456, 'J', 9, 9, 9, 234567890, 'J', 6, NULL),
    (150.00, '2024-01-24', 1, 10, 901234567, 'V', 10, 10, 10, 345678901, 'V', 10, NULL),

    -- Pagos de compras de clientes
    (450.00, '2024-01-25', 1, 1, 123456789, 'J', 11, 1, 1, NULL, NULL, NULL, 1),
    (280.50, '2024-01-26', 1, 2, 987654321, 'V', 12, 2, 2, NULL, NULL, NULL, 2),
    (650.75, '2024-01-27', 1, 3, 234567890, 'J', 13, 3, 3, NULL, NULL, NULL, 3),
    (320.25, '2024-01-28', 1, 4, 345678901, 'V', 14, 4, 4, NULL, NULL, NULL, 4),
    (890.00, '2024-01-29', 1, 5, 456789012, 'J', 15, 5, 5, NULL, NULL, NULL, 5),
    (150.00, '2024-01-30', 1, 6, 567890123, 'V', 16, 6, 6, NULL, NULL, NULL, 6),
    (750.50, '2024-01-31', 1, 7, 678901234, 'J', 17, 7, 7, NULL, NULL, NULL, 7),
    (420.75, '2024-02-01', 1, 8, 789012345, 'V', 18, 8, 8, NULL, NULL, NULL, 8),
    (580.25, '2024-02-02', 1, 9, 890123456, 'J', 19, 9, 9, NULL, NULL, NULL, 9),
    (290.00, '2024-02-03', 1, 10, 901234567, 'V', 20, 10, 10, NULL, NULL, NULL, 10);