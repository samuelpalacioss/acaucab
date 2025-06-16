/**
 * Inserts para la tabla status_venta
 * Relaciona los estados con las ventas regulares y de eventos
 * Cada registro debe tener o fk_venta o fk_venta_evento, no ambos
 */
INSERT INTO status_venta (fecha_actualización, fecha_fin, fk_status, fk_venta, fk_venta_evento) VALUES
    ('2024-01-01', NULL, 1, 1, NULL),    -- Pendiente
    ('2024-01-02', NULL, 2, NULL, 2),    -- En Proceso
    ('2024-01-03', NULL, 3, 3, NULL),    -- Aprobado
    ('2024-01-04', NULL, 4, NULL, 4),    -- Rechazado
    ('2024-01-05', NULL, 5, 5, NULL),    -- Completado
    ('2024-01-06', NULL, 6, NULL, 6),    -- Cancelado
    ('2024-01-07', NULL, 7, 7, NULL),    -- En Revisión
    ('2024-01-08', NULL, 8, NULL, 8),    -- Devuelto
    ('2024-01-09', NULL, 9, 9, NULL),    -- En Espera
    ('2024-01-10', NULL, 10, NULL, 10);  -- Finalizado 