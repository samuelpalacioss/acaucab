/**
 * Inserción de registros en la tabla vacacion
 * @param id - Identificador único de la vacación
 * @param nombre - Nombre o tipo de vacación
 * @param fecha_inicio - Fecha de inicio de la vacación
 * @param fecha_fin - Fecha de fin de la vacación
 * @param fk_nomina_1 - ID de la nómina
 * @param fk_nomina_2 - ID del empleado en la nómina
 */
INSERT INTO vacacion (id, nombre, fecha_inicio, fecha_fin, fk_nomina_1, fk_nomina_2) VALUES
(1,  'Vacaciones Anuales',      '2024-01-15', '2024-01-30', 1, 1),
(2,  'Carnavales',              '2024-02-12', '2024-02-16', 2, 2),
(3,  'Vacaciones Anuales',      '2024-03-04', '2024-03-18', 3, 3),
(4,  'Semana Santa',            '2024-03-25', '2024-03-31', 4, 4),
(5,  'Vacaciones Anuales',      '2024-04-15', '2024-04-29', 5, 5),
(6,  'Vacaciones de Agosto',    '2024-08-01', '2024-08-15', 6, 6),
(7,  'Vacaciones Anuales',      '2024-09-10', '2024-09-24', 1, 1),
(8,  'Carnavales',              '2024-02-12', '2024-02-16', 8, 8),
(9,  'Semana Santa',            '2024-03-25', '2024-03-31', 9, 9),
(10, 'Vacaciones de Navidad',   '2024-12-20', '2025-01-03', 10, 10);
