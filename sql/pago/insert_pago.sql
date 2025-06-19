-- Truncate tables to ensure a clean state
TRUNCATE TABLE cliente_metodo_pago CASCADE;
TRUNCATE TABLE metodo_pago RESTART IDENTITY CASCADE;

-- Insert data into método_pago
-- 100 Points for the first 10 natural clients (10 points each)
INSERT INTO metodo_pago (tipo, denominación, tipo_tarjeta, número, banco, fecha_vencimiento, número_cheque, fecha_adquisicion, fecha_canjeo) VALUES
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),

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
('efectivo', '100 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL),

/** Tarjetas adicionales para completar 40 clientes distintos (tipos: VARCHAR, INTEGER, DATE) */
('tarjeta_credito', NULL, 'Visa', 5678901234, 'Banco Activo', '2025-03-31', NULL, NULL, NULL),          /** Tarjeta 5 - Visa */
('tarjeta_debito', NULL, NULL, 6789012345, 'Banco del Tesoro', '2026-01-31', NULL, NULL, NULL),        /** Tarjeta 6 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 7890123456, 'BOD', '2025-07-31', NULL, NULL, NULL),           /** Tarjeta 7 - MasterCard */
('tarjeta_debito', NULL, NULL, 8901234567, 'Bicentenario', '2024-12-31', NULL, NULL, NULL),           /** Tarjeta 8 - Débito */
('tarjeta_credito', NULL, 'American Express', 9012345678, 'Exterior', '2026-05-31', NULL, NULL, NULL), /** Tarjeta 9 - American Express */
('tarjeta_debito', NULL, NULL, 1123456789, 'Sofitasa', '2025-09-30', NULL, NULL, NULL),               /** Tarjeta 10 - Débito */
('tarjeta_credito', NULL, 'Visa', 2234567890, 'Plaza', '2025-11-30', NULL, NULL, NULL),               /** Tarjeta 11 - Visa */
('tarjeta_debito', NULL, NULL, 3345678901, 'Mi Banco', '2026-02-28', NULL, NULL, NULL),               /** Tarjeta 12 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 4456789012, 'Venezolano de Crédito', '2025-04-30', NULL, NULL, NULL), /** Tarjeta 13 - MasterCard */
('tarjeta_debito', NULL, NULL, 5567890123, 'Caroni', '2026-07-31', NULL, NULL, NULL),                 /** Tarjeta 14 - Débito */
('tarjeta_credito', NULL, 'Visa', 6678901234, 'Nacional de Crédito', '2025-08-31', NULL, NULL, NULL), /** Tarjeta 15 - Visa */
('tarjeta_debito', NULL, NULL, 7789012345, 'Federal', '2024-10-31', NULL, NULL, NULL),                /** Tarjeta 16 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 8890123456, 'Fondo Común', '2026-03-31', NULL, NULL, NULL),   /** Tarjeta 17 - MasterCard */
('tarjeta_debito', NULL, NULL, 9901234567, 'BFC', '2025-12-31', NULL, NULL, NULL),                    /** Tarjeta 18 - Débito */
('tarjeta_credito', NULL, 'American Express', 1012345678, 'Bancrecer', '2025-01-31', NULL, NULL, NULL), /** Tarjeta 19 - American Express */
('tarjeta_debito', NULL, NULL, 2123456789, 'Banplus', '2026-06-30', NULL, NULL, NULL),                /** Tarjeta 20 - Débito */
('tarjeta_credito', NULL, 'Visa', 3234567890, 'BBVA Provincial', '2025-10-31', NULL, NULL, NULL),     /** Tarjeta 21 - Visa */
('tarjeta_debito', NULL, NULL, 4345678901, 'Banco Mercantil', '2026-04-30', NULL, NULL, NULL),        /** Tarjeta 22 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 5456789012, 'Banesco', '2025-02-28', NULL, NULL, NULL),       /** Tarjeta 23 - MasterCard */
('tarjeta_debito', NULL, NULL, 6567890123, 'Banco de Venezuela', '2026-08-31', NULL, NULL, NULL),     /** Tarjeta 24 - Débito */
('tarjeta_credito', NULL, 'Visa', 7678901234, 'Banco Activo', '2025-05-31', NULL, NULL, NULL),        /** Tarjeta 25 - Visa */
('tarjeta_debito', NULL, NULL, 8789012345, 'Banco del Tesoro', '2024-11-30', NULL, NULL, NULL),       /** Tarjeta 26 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 9890123456, 'BOD', '2026-09-30', NULL, NULL, NULL),           /** Tarjeta 27 - MasterCard */
('tarjeta_debito', NULL, NULL, 1901234567, 'Bicentenario', '2025-06-30', NULL, NULL, NULL),           /** Tarjeta 28 - Débito */
('tarjeta_credito', NULL, 'American Express', 2012345678, 'Exterior', '2026-10-31', NULL, NULL, NULL), /** Tarjeta 29 - American Express */
('tarjeta_debito', NULL, NULL, 3123456789, 'Sofitasa', '2025-03-31', NULL, NULL, NULL),               /** Tarjeta 30 - Débito */
('tarjeta_credito', NULL, 'Visa', 4234567890, 'Plaza', '2026-11-30', NULL, NULL, NULL),               /** Tarjeta 31 - Visa */
('tarjeta_debito', NULL, NULL, 5345678901, 'Mi Banco', '2025-07-31', NULL, NULL, NULL),               /** Tarjeta 32 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 6456789012, 'Venezolano de Crédito', '2026-12-31', NULL, NULL, NULL), /** Tarjeta 33 - MasterCard */
('tarjeta_debito', NULL, NULL, 7567890123, 'Caroni', '2025-04-30', NULL, NULL, NULL),                 /** Tarjeta 34 - Débito */
('tarjeta_credito', NULL, 'Visa', 8678901234, 'Nacional de Crédito', '2026-01-31', NULL, NULL, NULL), /** Tarjeta 35 - Visa */
('tarjeta_debito', NULL, NULL, 9789012345, 'Federal', '2025-08-31', NULL, NULL, NULL),                /** Tarjeta 36 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 1890123456, 'Fondo Común', '2026-05-31', NULL, NULL, NULL),   /** Tarjeta 37 - MasterCard */
('tarjeta_debito', NULL, NULL, 2901234567, 'BFC', '2025-09-30', NULL, NULL, NULL),                    /** Tarjeta 38 - Débito */
('tarjeta_credito', NULL, 'American Express', 3012345678, 'Bancrecer', '2026-02-28', NULL, NULL, NULL), /** Tarjeta 39 - American Express */
('tarjeta_debito', NULL, NULL, 4123456789, 'Banplus', '2025-10-31', NULL, NULL, NULL);                /** Tarjeta 40 - Débito */

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
(101, 1, NULL),   /** Cliente natural 1 - Tarjeta crédito Visa */
(102, 2, NULL),   /** Cliente natural 2 - Tarjeta crédito MasterCard */
(103, 3, NULL),   /** Cliente natural 3 - Tarjeta débito */
(104, 4, NULL),   /** Cliente natural 4 - Tarjeta débito */
(105, 5, NULL),   /** Cliente natural 5 - Cheque */
(106, NULL, 1),   /** Cliente jurídico 1 - Cheque */
(107, NULL, 2),   /** Cliente jurídico 2 - Efectivo 1 USD */
(108, NULL, 3),   /** Cliente jurídico 3 - Efectivo 5 USD */
(109, NULL, 4),   /** Cliente jurídico 4 - Efectivo 20 USD */
(110, NULL, 5),   /** Cliente jurídico 5 - Efectivo 100 USD */

/** Asignación de tarjetas adicionales a clientes naturales (6-20) */
(111, 6, NULL),   /** Cliente natural 6 - Tarjeta crédito Visa */
(112, 7, NULL),   /** Cliente natural 7 - Tarjeta débito */
(113, 8, NULL),   /** Cliente natural 8 - Tarjeta crédito MasterCard */
(114, 9, NULL),   /** Cliente natural 9 - Tarjeta débito */
(115, 10, NULL),  /** Cliente natural 10 - Tarjeta crédito American Express */
(116, 11, NULL),  /** Cliente natural 11 - Tarjeta débito */
(117, 12, NULL),  /** Cliente natural 12 - Tarjeta crédito Visa */
(118, 13, NULL),  /** Cliente natural 13 - Tarjeta débito */
(119, 14, NULL),  /** Cliente natural 14 - Tarjeta crédito MasterCard */
(120, 15, NULL),  /** Cliente natural 15 - Tarjeta débito */
(121, 16, NULL),  /** Cliente natural 16 - Tarjeta crédito Visa */
(122, 17, NULL),  /** Cliente natural 17 - Tarjeta débito */
(123, 18, NULL),  /** Cliente natural 18 - Tarjeta crédito MasterCard */
(124, 19, NULL),  /** Cliente natural 19 - Tarjeta débito */
(125, 20, NULL),  /** Cliente natural 20 - Tarjeta crédito American Express */

/** Asignación de tarjetas adicionales a clientes jurídicos (6-20) */
(126, NULL, 6),   /** Cliente jurídico 6 - Tarjeta débito */
(127, NULL, 7),   /** Cliente jurídico 7 - Tarjeta crédito Visa */
(128, NULL, 8),   /** Cliente jurídico 8 - Tarjeta débito */
(129, NULL, 9),   /** Cliente jurídico 9 - Tarjeta crédito MasterCard */
(130, NULL, 10),  /** Cliente jurídico 10 - Tarjeta débito */
(131, NULL, 11),  /** Cliente jurídico 11 - Tarjeta crédito Visa */
(132, NULL, 12),  /** Cliente jurídico 12 - Tarjeta débito */
(133, NULL, 13),  /** Cliente jurídico 13 - Tarjeta crédito MasterCard */
(134, NULL, 14),  /** Cliente jurídico 14 - Tarjeta débito */
(135, NULL, 15),  /** Cliente jurídico 15 - Tarjeta crédito American Express */
(136, NULL, 16),  /** Cliente jurídico 16 - Tarjeta débito */
(137, NULL, 17),  /** Cliente jurídico 17 - Tarjeta crédito Visa */
(138, NULL, 18),  /** Cliente jurídico 18 - Tarjeta débito */
(139, NULL, 19),  /** Cliente jurídico 19 - Tarjeta crédito MasterCard */
(140, NULL, 20);  /** Cliente jurídico 20 - Tarjeta débito */


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
 * Inserts para la tabla pago - PAGOS CON TARJETAS PARA LAS 90 VENTAS
 * Cada pago corresponde exactamente a una venta con:
 * - Monto igual al monto_total de la venta
 * - Fecha igual a la fecha de finalización de la venta (status_venta)
 * - Cliente igual al cliente de la venta  
 * - Solo métodos de pago con TARJETAS (crédito/débito)
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
    /** VENTAS 1-10: Ventas iniciales con clientes mixtos */
    (10.00, CURRENT_DATE - INTERVAL '30 days' + TIME '09:20:00', 2, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 126),  /** Venta 1: Cliente jurídico 1 - Tarjeta débito */
    (18.00, CURRENT_DATE - INTERVAL '30 days' + TIME '10:35:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, 101),  /** Venta 2: Cliente natural 1 - Tarjeta crédito Visa */
    (29.00, CURRENT_DATE - INTERVAL '30 days' + TIME '14:30:00', 2, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, 101),  /** Venta 3: Usuario web (cliente natural 1) - Tarjeta crédito Visa */
    (39.00, CURRENT_DATE - INTERVAL '30 days' + TIME '12:50:00', 2, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, 127),  /** Venta 4: Cliente jurídico 2 - Tarjeta crédito Visa */
    (10.00, CURRENT_DATE - INTERVAL '30 days' + TIME '14:25:00', 2, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, 102),  /** Venta 5: Cliente natural 2 - Tarjeta crédito MasterCard */
    (32.00, CURRENT_DATE - INTERVAL '29 days' + TIME '12:00:00', 3, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, 102),  /** Venta 6: Usuario web (cliente natural 2) - Tarjeta crédito MasterCard */
    (49.00, CURRENT_DATE - INTERVAL '29 days' + TIME '09:50:00', 3, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, 128),  /** Venta 7: Cliente jurídico 3 - Tarjeta débito */
    (29.00, CURRENT_DATE - INTERVAL '29 days' + TIME '10:20:00', 3, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, 103),  /** Venta 8: Cliente natural 3 - Tarjeta débito */
    (18.00, CURRENT_DATE - INTERVAL '29 days' + TIME '15:00:00', 3, NULL, NULL, NULL, 9, NULL, NULL, NULL, NULL, NULL, 103),  /** Venta 9: Usuario web (cliente natural 3) - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '29 days' + TIME '13:05:00', 3, NULL, NULL, NULL, 10, NULL, NULL, NULL, NULL, NULL, 129), /** Venta 10: Cliente jurídico 4 - Tarjeta crédito MasterCard */

    /** VENTAS 11-50: Clientes naturales (2 ventas por cada cliente natural 1-20) */
    (39.00, CURRENT_DATE - INTERVAL '28 days' + TIME '09:05:00', 4, NULL, NULL, NULL, 11, NULL, NULL, NULL, NULL, NULL, 101), /** Venta 11: Cliente natural 1 - Tarjeta crédito Visa */
    (14.00, CURRENT_DATE - INTERVAL '28 days' + TIME '13:50:00', 4, NULL, NULL, NULL, 12, NULL, NULL, NULL, NULL, NULL, 101), /** Venta 12: Cliente natural 1 - Tarjeta crédito Visa */
    (49.00, CURRENT_DATE - INTERVAL '28 days' + TIME '11:50:00', 4, NULL, NULL, NULL, 13, NULL, NULL, NULL, NULL, NULL, 102), /** Venta 13: Cliente natural 2 - Tarjeta crédito MasterCard */
    (29.00, CURRENT_DATE - INTERVAL '28 days' + TIME '14:35:00', 4, NULL, NULL, NULL, 14, NULL, NULL, NULL, NULL, NULL, 102), /** Venta 14: Cliente natural 2 - Tarjeta crédito MasterCard */
    (14.00, CURRENT_DATE - INTERVAL '28 days' + TIME '18:30:00', 4, NULL, NULL, NULL, 15, NULL, NULL, NULL, NULL, NULL, 103), /** Venta 15: Cliente natural 3 - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '25 days' + TIME '08:20:00', 7, NULL, NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL, 103), /** Venta 16: Cliente natural 3 - Tarjeta débito */
    (27.00, CURRENT_DATE - INTERVAL '25 days' + TIME '09:35:00', 7, NULL, NULL, NULL, 17, NULL, NULL, NULL, NULL, NULL, 104), /** Venta 17: Cliente natural 4 - Tarjeta débito */
    (10.00, CURRENT_DATE - INTERVAL '25 days' + TIME '13:30:00', 7, NULL, NULL, NULL, 18, NULL, NULL, NULL, NULL, NULL, 104), /** Venta 18: Cliente natural 4 - Tarjeta débito */
    (39.00, CURRENT_DATE - INTERVAL '25 days' + TIME '11:20:00', 7, NULL, NULL, NULL, 19, NULL, NULL, NULL, NULL, NULL, 111), /** Venta 19: Cliente natural 5 - Tarjeta crédito Visa */
    (29.00, CURRENT_DATE - INTERVAL '25 days' + TIME '14:05:00', 7, NULL, NULL, NULL, 20, NULL, NULL, NULL, NULL, NULL, 111), /** Venta 20: Cliente natural 5 - Tarjeta crédito Visa */
    (18.00, CURRENT_DATE - INTERVAL '20 days' + TIME '13:15:00', 12, NULL, NULL, NULL, 21, NULL, NULL, NULL, NULL, NULL, 112), /** Venta 21: Cliente natural 6 - Tarjeta débito */
    (19.00, CURRENT_DATE - INTERVAL '20 days' + TIME '10:35:00', 12, NULL, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, 112), /** Venta 22: Cliente natural 6 - Tarjeta débito */
    (53.00, CURRENT_DATE - INTERVAL '20 days' + TIME '11:05:00', 12, NULL, NULL, NULL, 23, NULL, NULL, NULL, NULL, NULL, 113), /** Venta 23: Cliente natural 7 - Tarjeta crédito MasterCard */
    (10.00, CURRENT_DATE - INTERVAL '20 days' + TIME '15:45:00', 12, NULL, NULL, NULL, 24, NULL, NULL, NULL, NULL, NULL, 113), /** Venta 24: Cliente natural 7 - Tarjeta crédito MasterCard */
    (37.00, CURRENT_DATE - INTERVAL '20 days' + TIME '13:35:00', 12, NULL, NULL, NULL, 25, NULL, NULL, NULL, NULL, NULL, 114), /** Venta 25: Cliente natural 8 - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '15 days' + TIME '08:05:00', 17, NULL, NULL, NULL, 26, NULL, NULL, NULL, NULL, NULL, 114), /** Venta 26: Cliente natural 8 - Tarjeta débito */
    (14.00, CURRENT_DATE - INTERVAL '15 days' + TIME '12:45:00', 17, NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, 115), /** Venta 27: Cliente natural 9 - Tarjeta crédito American Express */
    (19.00, CURRENT_DATE - INTERVAL '15 days' + TIME '10:35:00', 17, NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, 115), /** Venta 28: Cliente natural 9 - Tarjeta crédito American Express */
    (43.00, CURRENT_DATE - INTERVAL '15 days' + TIME '11:50:00', 17, NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, 116), /** Venta 29: Cliente natural 10 - Tarjeta débito */
    (29.00, CURRENT_DATE - INTERVAL '15 days' + TIME '17:30:00', 17, NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, 116), /** Venta 30: Cliente natural 10 - Tarjeta débito */
    (49.00, CURRENT_DATE - INTERVAL '10 days' + TIME '09:05:00', 22, NULL, NULL, NULL, 31, NULL, NULL, NULL, NULL, NULL, 117), /** Venta 31: Cliente natural 11 - Tarjeta crédito Visa */
    (14.00, CURRENT_DATE - INTERVAL '10 days' + TIME '10:20:00', 22, NULL, NULL, NULL, 32, NULL, NULL, NULL, NULL, NULL, 117), /** Venta 32: Cliente natural 11 - Tarjeta crédito Visa */
    (19.00, CURRENT_DATE - INTERVAL '10 days' + TIME '15:00:00', 22, NULL, NULL, NULL, 33, NULL, NULL, NULL, NULL, NULL, 118), /** Venta 33: Cliente natural 12 - Tarjeta débito */
    (67.00, CURRENT_DATE - INTERVAL '10 days' + TIME '12:50:00', 22, NULL, NULL, NULL, 34, NULL, NULL, NULL, NULL, NULL, 118), /** Venta 34: Cliente natural 12 - Tarjeta débito */
    (29.00, CURRENT_DATE - INTERVAL '10 days' + TIME '14:05:00', 22, NULL, NULL, NULL, 35, NULL, NULL, NULL, NULL, NULL, 119), /** Venta 35: Cliente natural 13 - Tarjeta crédito MasterCard */
    (10.00, CURRENT_DATE - INTERVAL '7 days' + TIME '12:00:00', 25, NULL, NULL, NULL, 36, NULL, NULL, NULL, NULL, NULL, 119), /** Venta 36: Cliente natural 13 - Tarjeta crédito MasterCard */
    (57.00, CURRENT_DATE - INTERVAL '7 days' + TIME '09:50:00', 25, NULL, NULL, NULL, 37, NULL, NULL, NULL, NULL, NULL, 120), /** Venta 37: Cliente natural 14 - Tarjeta débito */
    (19.00, CURRENT_DATE - INTERVAL '7 days' + TIME '10:05:00', 25, NULL, NULL, NULL, 38, NULL, NULL, NULL, NULL, NULL, 120), /** Venta 38: Cliente natural 14 - Tarjeta débito */
    (43.00, CURRENT_DATE - INTERVAL '7 days' + TIME '14:45:00', 25, NULL, NULL, NULL, 39, NULL, NULL, NULL, NULL, NULL, 121), /** Venta 39: Cliente natural 15 - Tarjeta crédito Visa */
    (29.00, CURRENT_DATE - INTERVAL '7 days' + TIME '13:05:00', 25, NULL, NULL, NULL, 40, NULL, NULL, NULL, NULL, NULL, 121), /** Venta 40: Cliente natural 15 - Tarjeta crédito Visa */
    (18.00, CURRENT_DATE - INTERVAL '5 days' + TIME '09:05:00', 27, NULL, NULL, NULL, 41, NULL, NULL, NULL, NULL, NULL, 122), /** Venta 41: Cliente natural 16 - Tarjeta débito */
    (10.00, CURRENT_DATE - INTERVAL '5 days' + TIME '14:00:00', 27, NULL, NULL, NULL, 42, NULL, NULL, NULL, NULL, NULL, 122), /** Venta 42: Cliente natural 16 - Tarjeta débito */
    (43.00, CURRENT_DATE - INTERVAL '5 days' + TIME '11:50:00', 27, NULL, NULL, NULL, 43, NULL, NULL, NULL, NULL, NULL, 123), /** Venta 43: Cliente natural 17 - Tarjeta crédito MasterCard */
    (29.00, CURRENT_DATE - INTERVAL '5 days' + TIME '13:05:00', 27, NULL, NULL, NULL, 44, NULL, NULL, NULL, NULL, NULL, 123), /** Venta 44: Cliente natural 17 - Tarjeta crédito MasterCard */
    (57.00, CURRENT_DATE - INTERVAL '5 days' + TIME '18:00:00', 27, NULL, NULL, NULL, 45, NULL, NULL, NULL, NULL, NULL, 124), /** Venta 45: Cliente natural 18 - Tarjeta débito */
    (19.00, CURRENT_DATE - INTERVAL '3 days' + TIME '08:20:00', 29, NULL, NULL, NULL, 46, NULL, NULL, NULL, NULL, NULL, 124), /** Venta 46: Cliente natural 18 - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '3 days' + TIME '09:35:00', 29, NULL, NULL, NULL, 47, NULL, NULL, NULL, NULL, NULL, 125), /** Venta 47: Cliente natural 19 - Tarjeta crédito American Express */
    (18.00, CURRENT_DATE - INTERVAL '3 days' + TIME '13:30:00', 29, NULL, NULL, NULL, 48, NULL, NULL, NULL, NULL, NULL, 125), /** Venta 48: Cliente natural 19 - Tarjeta crédito American Express */
    (29.00, CURRENT_DATE - INTERVAL '3 days' + TIME '11:20:00', 29, NULL, NULL, NULL, 49, NULL, NULL, NULL, NULL, NULL, 126), /** Venta 49: Cliente natural 20 - Tarjeta débito */
    (10.00, CURRENT_DATE - INTERVAL '3 days' + TIME '14:05:00', 29, NULL, NULL, NULL, 50, NULL, NULL, NULL, NULL, NULL, 126), /** Venta 50: Cliente natural 20 - Tarjeta débito */

    /** VENTAS 51-90: Clientes jurídicos (2 ventas por cada cliente jurídico 1-20) */
    (47.00, CURRENT_DATE - INTERVAL '1 day' + TIME '12:00:00', 31, NULL, NULL, NULL, 51, NULL, NULL, NULL, NULL, NULL, 127), /** Venta 51: Cliente jurídico 1 - Tarjeta crédito Visa */
    (19.00, CURRENT_DATE - INTERVAL '1 day' + TIME '09:05:00', 31, NULL, NULL, NULL, 52, NULL, NULL, NULL, NULL, NULL, 127), /** Venta 52: Cliente jurídico 1 - Tarjeta crédito Visa */
    (53.00, CURRENT_DATE - INTERVAL '1 day' + TIME '09:50:00', 31, NULL, NULL, NULL, 53, NULL, NULL, NULL, NULL, NULL, 128), /** Venta 53: Cliente jurídico 2 - Tarjeta débito */
    (29.00, CURRENT_DATE - INTERVAL '1 day' + TIME '13:45:00', 31, NULL, NULL, NULL, 54, NULL, NULL, NULL, NULL, NULL, 128), /** Venta 54: Cliente jurídico 2 - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '1 day' + TIME '11:05:00', 31, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL, NULL, 129), /** Venta 55: Cliente jurídico 3 - Tarjeta crédito MasterCard */
    (14.00, CURRENT_DATE - INTERVAL '1 day' + TIME '11:35:00', 31, NULL, NULL, NULL, 56, NULL, NULL, NULL, NULL, NULL, 129), /** Venta 56: Cliente jurídico 3 - Tarjeta crédito MasterCard */
    (23.00, CURRENT_DATE - INTERVAL '1 day' + TIME '15:30:00', 31, NULL, NULL, NULL, 57, NULL, NULL, NULL, NULL, NULL, 130), /** Venta 57: Cliente jurídico 4 - Tarjeta débito */
    (39.00, CURRENT_DATE - INTERVAL '1 day' + TIME '13:20:00', 31, NULL, NULL, NULL, 58, NULL, NULL, NULL, NULL, NULL, 130), /** Venta 58: Cliente jurídico 4 - Tarjeta débito */
    (33.00, CURRENT_DATE - INTERVAL '1 day' + TIME '14:05:00', 31, NULL, NULL, NULL, 59, NULL, NULL, NULL, NULL, NULL, 131), /** Venta 59: Cliente jurídico 5 - Tarjeta crédito Visa */
    (49.00, CURRENT_DATE - INTERVAL '1 day' + TIME '18:00:00', 31, NULL, NULL, NULL, 60, NULL, NULL, NULL, NULL, NULL, 131), /** Venta 60: Cliente jurídico 5 - Tarjeta crédito Visa */
    (10.00, CURRENT_DATE + TIME '08:05:00', 31, NULL, NULL, NULL, 61, NULL, NULL, NULL, NULL, NULL, 132), /** Venta 61: Cliente jurídico 6 - Tarjeta débito */
    (27.00, CURRENT_DATE + TIME '08:35:00', 31, NULL, NULL, NULL, 62, NULL, NULL, NULL, NULL, NULL, 132), /** Venta 62: Cliente jurídico 6 - Tarjeta débito */
    (59.00, CURRENT_DATE + TIME '12:30:00', 31, NULL, NULL, NULL, 63, NULL, NULL, NULL, NULL, NULL, 133), /** Venta 63: Cliente jurídico 7 - Tarjeta crédito MasterCard */
    (33.00, CURRENT_DATE + TIME '09:20:00', 31, NULL, NULL, NULL, 64, NULL, NULL, NULL, NULL, NULL, 133), /** Venta 64: Cliente jurídico 7 - Tarjeta crédito MasterCard */
    (39.00, CURRENT_DATE + TIME '09:50:00', 31, NULL, NULL, NULL, 65, NULL, NULL, NULL, NULL, NULL, 134), /** Venta 65: Cliente jurídico 8 - Tarjeta débito */
    (19.00, CURRENT_DATE + TIME '13:30:00', 31, NULL, NULL, NULL, 66, NULL, NULL, NULL, NULL, NULL, 134), /** Venta 66: Cliente jurídico 8 - Tarjeta débito */
    (57.00, CURRENT_DATE + TIME '10:35:00', 31, NULL, NULL, NULL, 67, NULL, NULL, NULL, NULL, NULL, 135), /** Venta 67: Cliente jurídico 9 - Tarjeta crédito American Express */
    (29.00, CURRENT_DATE + TIME '11:05:00', 31, NULL, NULL, NULL, 68, NULL, NULL, NULL, NULL, NULL, 135), /** Venta 68: Cliente jurídico 9 - Tarjeta crédito American Express */
    (43.00, CURRENT_DATE + TIME '14:45:00', 31, NULL, NULL, NULL, 69, NULL, NULL, NULL, NULL, NULL, 136), /** Venta 69: Cliente jurídico 10 - Tarjeta débito */
    (59.00, CURRENT_DATE + TIME '11:50:00', 31, NULL, NULL, NULL, 70, NULL, NULL, NULL, NULL, NULL, 136), /** Venta 70: Cliente jurídico 10 - Tarjeta débito */
    (19.00, CURRENT_DATE + TIME '12:05:00', 31, NULL, NULL, NULL, 71, NULL, NULL, NULL, NULL, NULL, 137), /** Venta 71: Cliente jurídico 11 - Tarjeta crédito Visa */
    (18.00, CURRENT_DATE + TIME '16:00:00', 31, NULL, NULL, NULL, 72, NULL, NULL, NULL, NULL, NULL, 137), /** Venta 72: Cliente jurídico 11 - Tarjeta crédito Visa */
    (68.00, CURRENT_DATE + TIME '13:05:00', 31, NULL, NULL, NULL, 73, NULL, NULL, NULL, NULL, NULL, 138), /** Venta 73: Cliente jurídico 12 - Tarjeta débito */
    (14.00, CURRENT_DATE + TIME '13:35:00', 31, NULL, NULL, NULL, 74, NULL, NULL, NULL, NULL, NULL, 138), /** Venta 74: Cliente jurídico 12 - Tarjeta débito */
    (59.00, CURRENT_DATE + TIME '17:30:00', 31, NULL, NULL, NULL, 75, NULL, NULL, NULL, NULL, NULL, 139), /** Venta 75: Cliente jurídico 13 - Tarjeta crédito MasterCard */
    (19.00, CURRENT_DATE + TIME '14:20:00', 31, NULL, NULL, NULL, 76, NULL, NULL, NULL, NULL, NULL, 139), /** Venta 76: Cliente jurídico 13 - Tarjeta crédito MasterCard */
    (47.00, CURRENT_DATE + TIME '14:50:00', 31, NULL, NULL, NULL, 77, NULL, NULL, NULL, NULL, NULL, 140), /** Venta 77: Cliente jurídico 14 - Tarjeta débito */
    (29.00, CURRENT_DATE + TIME '18:30:00', 31, NULL, NULL, NULL, 78, NULL, NULL, NULL, NULL, NULL, 140), /** Venta 78: Cliente jurídico 14 - Tarjeta débito */
    (49.00, CURRENT_DATE + TIME '15:35:00', 31, NULL, NULL, NULL, 79, NULL, NULL, NULL, NULL, NULL, 126), /** Venta 79: Cliente jurídico 15 - Tarjeta débito */
    (27.00, CURRENT_DATE + TIME '16:05:00', 31, NULL, NULL, NULL, 80, NULL, NULL, NULL, NULL, NULL, 126), /** Venta 80: Cliente jurídico 15 - Tarjeta débito */
    
    /** VENTAS 81-90: Ventas pendientes aún en proceso */
    (59.00, CURRENT_DATE + TIME '16:30:00', 31, NULL, NULL, NULL, 81, NULL, NULL, NULL, NULL, NULL, 127), /** Venta 81: Cliente jurídico 16 - Tarjeta crédito Visa */
    (29.00, CURRENT_DATE + TIME '17:00:00', 31, NULL, NULL, NULL, 82, NULL, NULL, NULL, NULL, NULL, 127), /** Venta 82: Cliente jurídico 16 - Tarjeta crédito Visa */
    (43.00, CURRENT_DATE + TIME '17:15:00', 31, NULL, NULL, NULL, 83, NULL, NULL, NULL, NULL, NULL, 128), /** Venta 83: Cliente jurídico 17 - Tarjeta débito */
    (19.00, CURRENT_DATE + TIME '17:30:00', 31, NULL, NULL, NULL, 84, NULL, NULL, NULL, NULL, NULL, 128), /** Venta 84: Cliente jurídico 17 - Tarjeta débito */
    (57.00, CURRENT_DATE + TIME '17:45:00', 31, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL, 129), /** Venta 85: Cliente jurídico 18 - Tarjeta crédito MasterCard */
    (10.00, CURRENT_DATE + TIME '18:00:00', 31, NULL, NULL, NULL, 86, NULL, NULL, NULL, NULL, NULL, 129), /** Venta 86: Cliente jurídico 18 - Tarjeta crédito MasterCard */
    (33.00, CURRENT_DATE + TIME '18:15:00', 31, NULL, NULL, NULL, 87, NULL, NULL, NULL, NULL, NULL, 130), /** Venta 87: Cliente jurídico 19 - Tarjeta débito */
    (59.00, CURRENT_DATE + TIME '18:30:00', 31, NULL, NULL, NULL, 88, NULL, NULL, NULL, NULL, NULL, 130), /** Venta 88: Cliente jurídico 19 - Tarjeta débito */
    (23.00, CURRENT_DATE + TIME '18:45:00', 31, NULL, NULL, NULL, 89, NULL, NULL, NULL, NULL, NULL, 131), /** Venta 89: Cliente jurídico 20 - Tarjeta crédito Visa */
    (39.00, CURRENT_DATE + TIME '19:00:00', 31, NULL, NULL, NULL, 90, NULL, NULL, NULL, NULL, NULL, 131); /** Venta 90: Cliente jurídico 20 - Tarjeta crédito Visa */