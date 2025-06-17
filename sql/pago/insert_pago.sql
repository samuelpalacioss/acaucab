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
INSERT INTO tasa (moneda, monto_equivalencia, fecha_inicio, fecha_fin) VALUES
('USD', 70.00, '2025-02-01', '2025-02-15'),
('USD', 74.00, '2025-03-01', '2025-03-31'),
('USD', 85.20, '2025-04-01', '2025-04-30'),
('USD', 92.75, '2025-05-01', '2025-05-15'),
('USD', 100.40, '2025-05-16', NULL),
('EUR', 86.00, '2025-02-01', '2025-02-15'),
('EUR', 90.50, '2025-02-16', '2025-02-28'),
('EUR', 98.50, '2025-04-01', '2025-04-30'),
('EUR', 105.80, '2025-05-01', '2025-05-15'),
('EUR', 116.20, '2025-05-16', NULL);