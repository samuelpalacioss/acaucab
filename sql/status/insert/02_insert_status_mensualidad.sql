/**
 * Inserts para la tabla status_mensualidad
 * Relaciona los estados con las mensualidades existentes
 */
INSERT INTO status_mensualidad (fecha_actualización, fecha_fin, fk_status, fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3) VALUES
    ('2024-01-01', NULL, 1, 1, 123456789, 'J'),
    ('2024-01-02', NULL, 2, 2, 987654321, 'V'),
    ('2024-01-03', NULL, 3, 3, 234567890, 'J'),
    ('2024-01-04', NULL, 4, 4, 345678901, 'V'),
    ('2024-01-05', NULL, 5, 5, 456789012, 'J'),
    ('2024-01-06', NULL, 6, 6, 567890123, 'V'),
    ('2024-01-07', NULL, 7, 7, 678901234, 'J'),
    ('2024-01-08', NULL, 8, 8, 789012345, 'V'),
    ('2024-01-09', NULL, 9, 9, 890123456, 'J'),
    ('2024-01-10', NULL, 10, 10, 901234567, 'V'),
    ('2024-01-11', NULL, 11, 11, 12345678, 'J'); 