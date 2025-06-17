/**
 * Inserción de registros en la tabla nomina
 * @param fecha_inicio - Fecha de inicio del período de pago
 * @param fecha_fin - Fecha de fin del período de pago
 * @param fk_cargo - ID del cargo del empleado
 * @param fk_departamento - ID del departamento
 * @param fk_empleado - ID del empleado
 */
INSERT INTO nomina (fecha_inicio, fecha_fin, fk_cargo, fk_departamento, fk_empleado) VALUES
('2024-03-01', NULL, 1, 1, 1),
('2023-07-15', NULL, 2, 2, 2),
('2022-10-20', NULL, 3, 3, 3),
('2024-01-10', NULL, 4, 4, 4),
('2022-12-05', NULL, 5, 5, 5),
('2023-05-18', NULL, 6, 6, 6),
('2021-11-30', NULL, 7, 7, 7),
('2024-02-12', '2024-05-31', 8, 8, 8),    
('2023-09-22', NULL, 9, 9, 9),
('2024-04-01', '2024-06-15', 10, 10, 10);   