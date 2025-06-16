/**
 * Inserts para la tabla status_orden
 * Relaciona los estados con las órdenes de compra y reposición
 * Cada orden debe tener o fk_orden_de_compra o fk_orden_reposicion, no ambos
 */
INSERT INTO status_orden (fecha_actualización, fecha_fin, fk_orden_de_compra, fk_status, fk_orden_de_reposicion) VALUES
    ('2024-01-01', NULL, 1, 1, NULL),
    ('2024-01-02', NULL, NULL, 2, 2), 
    ('2024-01-03', NULL, 3, 3, NULL),
    ('2024-01-04', NULL, NULL, 4, 4),
    ('2024-01-05', NULL, 5, 5, NULL),
    ('2024-01-06', NULL, NULL, 6, 6),
    ('2024-01-07', NULL, 7, 7, NULL),
    ('2024-01-08', NULL, NULL, 8, 8),
    ('2024-01-09', NULL, 9, 9, NULL),
    ('2024-01-10', NULL, NULL, 10, 10);