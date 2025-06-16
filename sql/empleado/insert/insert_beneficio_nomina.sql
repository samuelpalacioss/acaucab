/**
 * Inserción de registros en la tabla beneficio_nomina
 * @param monto - Monto del beneficio
 * @param fecha_asignacion - Fecha cuando se asignó el beneficio
 * @param fk_nomina_1 - ID de la nómina
 * @param fk_nomina_2 - ID del empleado en la nómina
 * @param fk_beneficio - ID del beneficio asignado
 */
INSERT INTO beneficio_nomina (monto, fecha_asignacion, fk_nomina_1, fk_nomina_2, fk_beneficio) VALUES
(500.00, '2024-01-01', 1, 1, 1),
(300.00, '2024-01-01', 2, 2, 2),
(400.00, '2024-01-01', 3, 3, 3),
(350.00, '2024-01-01', 4, 4, 4),
(450.00, '2024-01-01', 5, 5, 5),
(250.00, '2024-01-16', 6, 6, 6),
(300.00, '2024-01-16', 7, 7, 7),
(400.00, '2024-01-16', 8, 8, 8),
(350.00, '2024-01-16', 9, 9, 9),
(300.00, '2024-01-16', 10, 10, 10); 