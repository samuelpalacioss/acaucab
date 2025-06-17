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