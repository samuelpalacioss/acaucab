/**
 * Script consolidado de inserts para todas las tablas de status
 * Contiene los inserts para las tablas: status, status_mensualidad, status_orden y status_venta
 * 
 * ORDEN DE EJECUCIÓN:
 * 1. status - Tabla principal con los diferentes estados
 * 2. status_mensualidad - Relaciona estados con mensualidades
 * 3. status_orden - Relaciona estados con órdenes de compra y reposición
 * 4. status_venta - Relaciona estados con ventas regulares y de eventos
 */

-- =============================================================================
-- 1. INSERTS PARA LA TABLA STATUS
-- =============================================================================

/**
 * Inserts para la tabla status
 * Contiene los diferentes estados que puede tener una orden o mensualidad
 */
INSERT INTO status (nombre) VALUES
    ('Pendiente'),
    ('En Proceso'),
    ('Aprobado'),
    ('Rechazado'),
    ('Completado'),
    ('Cancelado'),
    ('En Revisión'),
    ('Devuelto'),
    ('En Espera'),
    ('Finalizado'),
    ('Suspendido'),
    ('Anulado');

-- =============================================================================
-- 2. INSERTS PARA LA TABLA STATUS_MENSUALIDAD
-- =============================================================================

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

-- =============================================================================
-- 3. INSERTS PARA LA TABLA STATUS_ORDEN
-- =============================================================================

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

-- =============================================================================
-- 4. INSERTS PARA LA TABLA STATUS_VENTA
-- =============================================================================

/**
 * Inserts para la tabla status_venta
 * Relaciona los estados con las ventas regulares
 * Cada venta tiene dos registros: En Proceso (2) y Completado (5)
 * La fecha_fin del proceso coincide con la fecha_actualización del completado
 */
INSERT INTO status_venta (fecha_actualización, fecha_fin, fk_status, fk_venta, fk_venta_evento) VALUES
    -- Registros de status En Proceso (2) para todas las ventas
    ('2024-01-01 08:00:00', '2024-01-01 16:00:00', 2, 1, NULL),    -- Venta 1 - En Proceso
    ('2024-01-02 08:00:00', '2024-01-02 16:00:00', 2, 2, NULL),    -- Venta 2 - En Proceso
    ('2024-01-03 08:00:00', '2024-01-03 16:00:00', 2, 3, NULL),    -- Venta 3 - En Proceso
    ('2024-01-04 08:00:00', '2024-01-04 16:00:00', 2, 4, NULL),    -- Venta 4 - En Proceso
    ('2024-01-05 08:00:00', '2024-01-05 16:00:00', 2, 5, NULL),    -- Venta 5 - En Proceso
    ('2024-01-06 08:00:00', '2024-01-06 16:00:00', 2, 6, NULL),    -- Venta 6 - En Proceso
    ('2024-01-07 08:00:00', '2024-01-07 16:00:00', 2, 7, NULL),    -- Venta 7 - En Proceso
    ('2024-01-08 08:00:00', '2024-01-08 16:00:00', 2, 8, NULL),    -- Venta 8 - En Proceso
    ('2024-01-09 08:00:00', '2024-01-09 16:00:00', 2, 9, NULL),    -- Venta 9 - En Proceso
    ('2024-01-10 08:00:00', '2024-01-10 16:00:00', 2, 10, NULL),   -- Venta 10 - En Proceso
    ('2024-01-11 08:00:00', '2024-01-11 16:00:00', 2, 11, NULL),   -- Venta 11 - En Proceso
    ('2024-01-12 08:00:00', '2024-01-12 16:00:00', 2, 12, NULL),   -- Venta 12 - En Proceso
    ('2024-01-13 08:00:00', '2024-01-13 16:00:00', 2, 13, NULL),   -- Venta 13 - En Proceso
    ('2024-01-14 08:00:00', '2024-01-14 16:00:00', 2, 14, NULL),   -- Venta 14 - En Proceso
    ('2024-01-15 08:00:00', '2024-01-15 16:00:00', 2, 15, NULL),   -- Venta 15 - En Proceso
    ('2024-01-16 08:00:00', '2024-01-16 16:00:00', 2, 16, NULL),   -- Venta 16 - En Proceso
    ('2024-01-17 08:00:00', '2024-01-17 16:00:00', 2, 17, NULL),   -- Venta 17 - En Proceso
    ('2024-01-18 08:00:00', '2024-01-18 16:00:00', 2, 18, NULL),   -- Venta 18 - En Proceso
    ('2024-01-19 08:00:00', '2024-01-19 16:00:00', 2, 19, NULL),   -- Venta 19 - En Proceso
    ('2024-01-20 08:00:00', '2024-01-20 16:00:00', 2, 20, NULL),   -- Venta 20 - En Proceso
    ('2024-01-21 08:00:00', '2024-01-21 16:00:00', 2, 21, NULL),   -- Venta 21 - En Proceso
    ('2024-01-22 08:00:00', '2024-01-22 16:00:00', 2, 22, NULL),   -- Venta 22 - En Proceso
    ('2024-01-23 08:00:00', '2024-01-23 16:00:00', 2, 23, NULL),   -- Venta 23 - En Proceso
    ('2024-01-24 08:00:00', '2024-01-24 16:00:00', 2, 24, NULL),   -- Venta 24 - En Proceso
    ('2024-01-25 08:00:00', '2024-01-25 16:00:00', 2, 25, NULL),   -- Venta 25 - En Proceso
    ('2024-01-26 08:00:00', '2024-01-26 16:00:00', 2, 26, NULL),   -- Venta 26 - En Proceso
    ('2024-01-27 08:00:00', '2024-01-27 16:00:00', 2, 27, NULL),   -- Venta 27 - En Proceso
    ('2024-01-28 08:00:00', '2024-01-28 16:00:00', 2, 28, NULL),   -- Venta 28 - En Proceso
    ('2024-01-29 08:00:00', '2024-01-29 16:00:00', 2, 29, NULL),   -- Venta 29 - En Proceso
    ('2024-01-30 08:00:00', '2024-01-30 16:00:00', 2, 30, NULL),   -- Venta 30 - En Proceso
    ('2024-01-31 08:00:00', '2024-01-31 16:00:00', 2, 31, NULL),   -- Venta 31 - En Proceso
    ('2024-02-01 08:00:00', '2024-02-01 16:00:00', 2, 32, NULL),   -- Venta 32 - En Proceso
    ('2024-02-02 08:00:00', '2024-02-02 16:00:00', 2, 33, NULL),   -- Venta 33 - En Proceso
    ('2024-02-03 08:00:00', '2024-02-03 16:00:00', 2, 34, NULL),   -- Venta 34 - En Proceso
    ('2024-02-04 08:00:00', '2024-02-04 16:00:00', 2, 35, NULL),   -- Venta 35 - En Proceso
    ('2024-02-05 08:00:00', '2024-02-05 16:00:00', 2, 36, NULL),   -- Venta 36 - En Proceso
    ('2024-02-06 08:00:00', '2024-02-06 16:00:00', 2, 37, NULL),   -- Venta 37 - En Proceso
    ('2024-02-07 08:00:00', '2024-02-07 16:00:00', 2, 38, NULL),   -- Venta 38 - En Proceso
    ('2024-02-08 08:00:00', '2024-02-08 16:00:00', 2, 39, NULL),   -- Venta 39 - En Proceso
    ('2024-02-09 08:00:00', '2024-02-09 16:00:00', 2, 40, NULL),   -- Venta 40 - En Proceso
    ('2024-02-10 08:00:00', '2024-02-10 16:00:00', 2, 41, NULL),   -- Venta 41 - En Proceso
    ('2024-02-11 08:00:00', '2024-02-11 16:00:00', 2, 42, NULL),   -- Venta 42 - En Proceso
    ('2024-02-12 08:00:00', '2024-02-12 16:00:00', 2, 43, NULL),   -- Venta 43 - En Proceso
    ('2024-02-13 08:00:00', '2024-02-13 16:00:00', 2, 44, NULL),   -- Venta 44 - En Proceso
    ('2024-02-14 08:00:00', '2024-02-14 16:00:00', 2, 45, NULL),   -- Venta 45 - En Proceso
    ('2024-02-15 08:00:00', '2024-02-15 16:00:00', 2, 46, NULL),   -- Venta 46 - En Proceso
    ('2024-02-16 08:00:00', '2024-02-16 16:00:00', 2, 47, NULL),   -- Venta 47 - En Proceso
    ('2024-02-17 08:00:00', '2024-02-17 16:00:00', 2, 48, NULL),   -- Venta 48 - En Proceso
    ('2024-02-18 08:00:00', '2024-02-18 16:00:00', 2, 49, NULL),   -- Venta 49 - En Proceso
    ('2024-02-19 08:00:00', '2024-02-19 16:00:00', 2, 50, NULL),   -- Venta 50 - En Proceso
    ('2024-02-20 08:00:00', '2024-02-20 16:00:00', 2, 51, NULL),   -- Venta 51 - En Proceso
    ('2024-02-21 08:00:00', '2024-02-21 16:00:00', 2, 52, NULL),   -- Venta 52 - En Proceso
    ('2024-02-22 08:00:00', '2024-02-22 16:00:00', 2, 53, NULL),   -- Venta 53 - En Proceso
    ('2024-02-23 08:00:00', '2024-02-23 16:00:00', 2, 54, NULL),   -- Venta 54 - En Proceso
    ('2024-02-24 08:00:00', '2024-02-24 16:00:00', 2, 55, NULL),   -- Venta 55 - En Proceso
    ('2024-02-25 08:00:00', '2024-02-25 16:00:00', 2, 56, NULL),   -- Venta 56 - En Proceso
    ('2024-02-26 08:00:00', '2024-02-26 16:00:00', 2, 57, NULL),   -- Venta 57 - En Proceso
    ('2024-02-27 08:00:00', '2024-02-27 16:00:00', 2, 58, NULL),   -- Venta 58 - En Proceso
    ('2024-02-28 08:00:00', '2024-02-28 16:00:00', 2, 59, NULL),   -- Venta 59 - En Proceso
    ('2024-02-29 08:00:00', '2024-02-29 16:00:00', 2, 60, NULL),   -- Venta 60 - En Proceso
    ('2024-03-01 08:00:00', '2024-03-01 16:00:00', 2, 61, NULL),   -- Venta 61 - En Proceso
    ('2024-03-02 08:00:00', '2024-03-02 16:00:00', 2, 62, NULL),   -- Venta 62 - En Proceso
    ('2024-03-03 08:00:00', '2024-03-03 16:00:00', 2, 63, NULL),   -- Venta 63 - En Proceso
    ('2024-03-04 08:00:00', '2024-03-04 16:00:00', 2, 64, NULL),   -- Venta 64 - En Proceso
    ('2024-03-05 08:00:00', '2024-03-05 16:00:00', 2, 65, NULL),   -- Venta 65 - En Proceso
    ('2024-03-06 08:00:00', '2024-03-06 16:00:00', 2, 66, NULL),   -- Venta 66 - En Proceso
    ('2024-03-07 08:00:00', '2024-03-07 16:00:00', 2, 67, NULL),   -- Venta 67 - En Proceso
    ('2024-03-08 08:00:00', '2024-03-08 16:00:00', 2, 68, NULL),   -- Venta 68 - En Proceso
    ('2024-03-09 08:00:00', '2024-03-09 16:00:00', 2, 69, NULL),   -- Venta 69 - En Proceso
    ('2024-03-10 08:00:00', '2024-03-10 16:00:00', 2, 70, NULL),   -- Venta 70 - En Proceso
    ('2024-03-11 08:00:00', '2024-03-11 16:00:00', 2, 71, NULL),   -- Venta 71 - En Proceso
    ('2024-03-12 08:00:00', '2024-03-12 16:00:00', 2, 72, NULL),   -- Venta 72 - En Proceso
    ('2024-03-13 08:00:00', '2024-03-13 16:00:00', 2, 73, NULL),   -- Venta 73 - En Proceso
    ('2024-03-14 08:00:00', '2024-03-14 16:00:00', 2, 74, NULL),   -- Venta 74 - En Proceso
    ('2024-03-15 08:00:00', '2024-03-15 16:00:00', 2, 75, NULL),   -- Venta 75 - En Proceso
    ('2024-03-16 08:00:00', '2024-03-16 16:00:00', 2, 76, NULL),   -- Venta 76 - En Proceso
    ('2024-03-17 08:00:00', '2024-03-17 16:00:00', 2, 77, NULL),   -- Venta 77 - En Proceso
    ('2024-03-18 08:00:00', '2024-03-18 16:00:00', 2, 78, NULL),   -- Venta 78 - En Proceso
    ('2024-03-19 08:00:00', '2024-03-19 16:00:00', 2, 79, NULL),   -- Venta 79 - En Proceso
    ('2024-03-20 08:00:00', '2024-03-20 16:00:00', 2, 80, NULL),   -- Venta 80 - En Proceso
    ('2024-03-21 08:00:00', '2024-03-21 16:00:00', 2, 81, NULL),   -- Venta 81 - En Proceso
    ('2024-03-22 08:00:00', '2024-03-22 16:00:00', 2, 82, NULL),   -- Venta 82 - En Proceso
    ('2024-03-23 08:00:00', '2024-03-23 16:00:00', 2, 83, NULL),   -- Venta 83 - En Proceso
    ('2024-03-24 08:00:00', '2024-03-24 16:00:00', 2, 84, NULL),   -- Venta 84 - En Proceso
    ('2024-03-25 08:00:00', '2024-03-25 16:00:00', 2, 85, NULL),   -- Venta 85 - En Proceso
    ('2024-03-26 08:00:00', '2024-03-26 16:00:00', 2, 86, NULL),   -- Venta 86 - En Proceso
    ('2024-03-27 08:00:00', '2024-03-27 16:00:00', 2, 87, NULL),   -- Venta 87 - En Proceso
    ('2024-03-28 08:00:00', '2024-03-28 16:00:00', 2, 88, NULL),   -- Venta 88 - En Proceso
    ('2024-03-29 08:00:00', '2024-03-29 16:00:00', 2, 89, NULL),   -- Venta 89 - En Proceso
    ('2024-03-30 08:00:00', '2024-03-30 16:00:00', 2, 90, NULL),   -- Venta 90 - En Proceso

    -- Registros de status Completado (5) para todas las ventas
    ('2024-01-01 16:00:00', NULL, 5, 1, NULL),    -- Venta 1 - Completado
    ('2024-01-02 16:00:00', NULL, 5, 2, NULL),    -- Venta 2 - Completado
    ('2024-01-03 16:00:00', NULL, 5, 3, NULL),    -- Venta 3 - Completado
    ('2024-01-04 16:00:00', NULL, 5, 4, NULL),    -- Venta 4 - Completado
    ('2024-01-05 16:00:00', NULL, 5, 5, NULL),    -- Venta 5 - Completado
    ('2024-01-06 16:00:00', NULL, 5, 6, NULL),    -- Venta 6 - Completado
    ('2024-01-07 16:00:00', NULL, 5, 7, NULL),    -- Venta 7 - Completado
    ('2024-01-08 16:00:00', NULL, 5, 8, NULL),    -- Venta 8 - Completado
    ('2024-01-09 16:00:00', NULL, 5, 9, NULL),    -- Venta 9 - Completado
    ('2024-01-10 16:00:00', NULL, 5, 10, NULL),   -- Venta 10 - Completado
    ('2024-01-11 16:00:00', NULL, 5, 11, NULL),   -- Venta 11 - Completado
    ('2024-01-12 16:00:00', NULL, 5, 12, NULL),   -- Venta 12 - Completado
    ('2024-01-13 16:00:00', NULL, 5, 13, NULL),   -- Venta 13 - Completado
    ('2024-01-14 16:00:00', NULL, 5, 14, NULL),   -- Venta 14 - Completado
    ('2024-01-15 16:00:00', NULL, 5, 15, NULL),   -- Venta 15 - Completado
    ('2024-01-16 16:00:00', NULL, 5, 16, NULL),   -- Venta 16 - Completado
    ('2024-01-17 16:00:00', NULL, 5, 17, NULL),   -- Venta 17 - Completado
    ('2024-01-18 16:00:00', NULL, 5, 18, NULL),   -- Venta 18 - Completado
    ('2024-01-19 16:00:00', NULL, 5, 19, NULL),   -- Venta 19 - Completado
    ('2024-01-20 16:00:00', NULL, 5, 20, NULL),   -- Venta 20 - Completado
    ('2024-01-21 16:00:00', NULL, 5, 21, NULL),   -- Venta 21 - Completado
    ('2024-01-22 16:00:00', NULL, 5, 22, NULL),   -- Venta 22 - Completado
    ('2024-01-23 16:00:00', NULL, 5, 23, NULL),   -- Venta 23 - Completado
    ('2024-01-24 16:00:00', NULL, 5, 24, NULL),   -- Venta 24 - Completado
    ('2024-01-25 16:00:00', NULL, 5, 25, NULL),   -- Venta 25 - Completado
    ('2024-01-26 16:00:00', NULL, 5, 26, NULL),   -- Venta 26 - Completado
    ('2024-01-27 16:00:00', NULL, 5, 27, NULL),   -- Venta 27 - Completado
    ('2024-01-28 16:00:00', NULL, 5, 28, NULL),   -- Venta 28 - Completado
    ('2024-01-29 16:00:00', NULL, 5, 29, NULL),   -- Venta 29 - Completado
    ('2024-01-30 16:00:00', NULL, 5, 30, NULL),   -- Venta 30 - Completado
    ('2024-01-31 16:00:00', NULL, 5, 31, NULL),   -- Venta 31 - Completado
    ('2024-02-01 16:00:00', NULL, 5, 32, NULL),   -- Venta 32 - Completado
    ('2024-02-02 16:00:00', NULL, 5, 33, NULL),   -- Venta 33 - Completado
    ('2024-02-03 16:00:00', NULL, 5, 34, NULL),   -- Venta 34 - Completado
    ('2024-02-04 16:00:00', NULL, 5, 35, NULL),   -- Venta 35 - Completado
    ('2024-02-05 16:00:00', NULL, 5, 36, NULL),   -- Venta 36 - Completado
    ('2024-02-06 16:00:00', NULL, 5, 37, NULL),   -- Venta 37 - Completado
    ('2024-02-07 16:00:00', NULL, 5, 38, NULL),   -- Venta 38 - Completado
    ('2024-02-08 16:00:00', NULL, 5, 39, NULL),   -- Venta 39 - Completado
    ('2024-02-09 16:00:00', NULL, 5, 40, NULL),   -- Venta 40 - Completado
    ('2024-02-10 16:00:00', NULL, 5, 41, NULL),   -- Venta 41 - Completado
    ('2024-02-11 16:00:00', NULL, 5, 42, NULL),   -- Venta 42 - Completado
    ('2024-02-12 16:00:00', NULL, 5, 43, NULL),   -- Venta 43 - Completado
    ('2024-02-13 16:00:00', NULL, 5, 44, NULL),   -- Venta 44 - Completado
    ('2024-02-14 16:00:00', NULL, 5, 45, NULL),   -- Venta 45 - Completado
    ('2024-02-15 16:00:00', NULL, 5, 46, NULL),   -- Venta 46 - Completado
    ('2024-02-16 16:00:00', NULL, 5, 47, NULL),   -- Venta 47 - Completado
    ('2024-02-17 16:00:00', NULL, 5, 48, NULL),   -- Venta 48 - Completado
    ('2024-02-18 16:00:00', NULL, 5, 49, NULL),   -- Venta 49 - Completado
    ('2024-02-19 16:00:00', NULL, 5, 50, NULL),   -- Venta 50 - Completado
    ('2024-02-20 16:00:00', NULL, 5, 51, NULL),   -- Venta 51 - Completado
    ('2024-02-21 16:00:00', NULL, 5, 52, NULL),   -- Venta 52 - Completado
    ('2024-02-22 16:00:00', NULL, 5, 53, NULL),   -- Venta 53 - Completado
    ('2024-02-23 16:00:00', NULL, 5, 54, NULL),   -- Venta 54 - Completado
    ('2024-02-24 16:00:00', NULL, 5, 55, NULL),   -- Venta 55 - Completado
    ('2024-02-25 16:00:00', NULL, 5, 56, NULL),   -- Venta 56 - Completado
    ('2024-02-26 16:00:00', NULL, 5, 57, NULL),   -- Venta 57 - Completado
    ('2024-02-27 16:00:00', NULL, 5, 58, NULL),   -- Venta 58 - Completado
    ('2024-02-28 16:00:00', NULL, 5, 59, NULL),   -- Venta 59 - Completado
    ('2024-02-29 16:00:00', NULL, 5, 60, NULL),   -- Venta 60 - Completado
    ('2024-03-01 16:00:00', NULL, 5, 61, NULL),   -- Venta 61 - Completado
    ('2024-03-02 16:00:00', NULL, 5, 62, NULL),   -- Venta 62 - Completado
    ('2024-03-03 16:00:00', NULL, 5, 63, NULL),   -- Venta 63 - Completado
    ('2024-03-04 16:00:00', NULL, 5, 64, NULL),   -- Venta 64 - Completado
    ('2024-03-05 16:00:00', NULL, 5, 65, NULL),   -- Venta 65 - Completado
    ('2024-03-06 16:00:00', NULL, 5, 66, NULL),   -- Venta 66 - Completado
    ('2024-03-07 16:00:00', NULL, 5, 67, NULL),   -- Venta 67 - Completado
    ('2024-03-08 16:00:00', NULL, 5, 68, NULL),   -- Venta 68 - Completado
    ('2024-03-09 16:00:00', NULL, 5, 69, NULL),   -- Venta 69 - Completado
    ('2024-03-10 16:00:00', NULL, 5, 70, NULL),   -- Venta 70 - Completado
    ('2024-03-11 16:00:00', NULL, 5, 71, NULL),   -- Venta 71 - Completado
    ('2024-03-12 16:00:00', NULL, 5, 72, NULL),   -- Venta 72 - Completado
    ('2024-03-13 16:00:00', NULL, 5, 73, NULL),   -- Venta 73 - Completado
    ('2024-03-14 16:00:00', NULL, 5, 74, NULL),   -- Venta 74 - Completado
    ('2024-03-15 16:00:00', NULL, 5, 75, NULL),   -- Venta 75 - Completado
    ('2024-03-16 16:00:00', NULL, 5, 76, NULL),   -- Venta 76 - Completado
    ('2024-03-17 16:00:00', NULL, 5, 77, NULL),   -- Venta 77 - Completado
    ('2024-03-18 16:00:00', NULL, 5, 78, NULL),   -- Venta 78 - Completado
    ('2024-03-19 16:00:00', NULL, 5, 79, NULL),   -- Venta 79 - Completado
    ('2024-03-20 16:00:00', NULL, 5, 80, NULL),   -- Venta 80 - Completado
    ('2024-03-21 16:00:00', NULL, 5, 81, NULL),   -- Venta 81 - Completado
    ('2024-03-22 16:00:00', NULL, 5, 82, NULL),   -- Venta 82 - Completado
    ('2024-03-23 16:00:00', NULL, 5, 83, NULL),   -- Venta 83 - Completado
    ('2024-03-24 16:00:00', NULL, 5, 84, NULL),   -- Venta 84 - Completado
    ('2024-03-25 16:00:00', NULL, 5, 85, NULL),   -- Venta 85 - Completado
    ('2024-03-26 16:00:00', NULL, 5, 86, NULL),   -- Venta 86 - Completado
    ('2024-03-27 16:00:00', NULL, 5, 87, NULL),   -- Venta 87 - Completado
    ('2024-03-28 16:00:00', NULL, 5, 88, NULL),   -- Venta 88 - Completado
    ('2024-03-29 16:00:00', NULL, 5, 89, NULL),   -- Venta 89 - Completado
    ('2024-03-30 16:00:00', NULL, 5, 90, NULL);   -- Venta 90 - Completado
