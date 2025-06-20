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
 * Usa fechas dinámicas más recientes
 */
INSERT INTO status_mensualidad (fecha_actualización, fecha_fin, fk_status, fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3) VALUES
    (CURRENT_DATE - INTERVAL '30 days', NULL, 1, 1, 123456789, 'J'),
    (CURRENT_DATE - INTERVAL '29 days', NULL, 2, 2, 987654321, 'V'),
    (CURRENT_DATE - INTERVAL '28 days', NULL, 3, 3, 234567890, 'J'),
    (CURRENT_DATE - INTERVAL '27 days', NULL, 4, 4, 345678901, 'V'),
    (CURRENT_DATE - INTERVAL '26 days', NULL, 5, 5, 456789012, 'J'),
    (CURRENT_DATE - INTERVAL '25 days', NULL, 6, 6, 567890123, 'V'),
    (CURRENT_DATE - INTERVAL '24 days', NULL, 7, 7, 678901234, 'J'),
    (CURRENT_DATE - INTERVAL '23 days', NULL, 8, 8, 789012345, 'V'),
    (CURRENT_DATE - INTERVAL '22 days', NULL, 9, 9, 890123456, 'J'),
    (CURRENT_DATE - INTERVAL '21 days', NULL, 10, 10, 901234567, 'V'),
    (CURRENT_DATE - INTERVAL '20 days', NULL, 11, 11, 12345678, 'J');

-- =============================================================================
-- 3. INSERTS PARA LA TABLA STATUS_ORDEN
-- =============================================================================

/**
 * Inserts para la tabla status_orden
 * Relaciona los estados con las órdenes de compra y reposición
 * Cada orden debe tener o fk_orden_de_compra o fk_orden_reposicion, no ambos
 */
INSERT INTO status_orden (fecha_actualización, fecha_fin, fk_orden_de_compra, fk_status, fk_orden_de_reposicion) VALUES
    (CURRENT_DATE - INTERVAL '25 days', NULL, 1, 1, NULL),
    (CURRENT_DATE - INTERVAL '24 days', NULL, NULL, 2, 2), 
    (CURRENT_DATE - INTERVAL '23 days', NULL, 3, 3, NULL),
    (CURRENT_DATE - INTERVAL '22 days', NULL, NULL, 4, 4),
    (CURRENT_DATE - INTERVAL '21 days', NULL, 5, 5, NULL),
    (CURRENT_DATE - INTERVAL '20 days', NULL, NULL, 6, 6),
    (CURRENT_DATE - INTERVAL '19 days', NULL, 7, 7, NULL),
    (CURRENT_DATE - INTERVAL '18 days', NULL, NULL, 8, 8),
    (CURRENT_DATE - INTERVAL '17 days', NULL, 9, 9, NULL),
    (CURRENT_DATE - INTERVAL '16 days', NULL, NULL, 10, 10);

-- =============================================================================
-- 4. INSERTS PARA LA TABLA STATUS_VENTA
-- =============================================================================

/**
 * Inserts para la tabla status_venta
 * Relaciona los estados con las ventas regulares
 * Cada venta tiene dos registros: En Proceso (2) y Completado (5)
 * Para ventas de tienda física el tiempo de proceso es de 5 minutos
 * Para ventas web el tiempo puede ser de varias horas
 */
INSERT INTO status_venta (fecha_actualización, fecha_fin, fk_status, fk_venta, fk_venta_evento) VALUES
    -- Ventas del último mes distribuidas de manera realista
    -- Ventas más antiguas (hace 30 días)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '09:15:00', CURRENT_DATE - INTERVAL '30 days' + TIME '09:20:00', 2, 1, NULL),    -- Venta 1 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '10:30:00', CURRENT_DATE - INTERVAL '30 days' + TIME '10:35:00', 2, 2, NULL),    -- Venta 2 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '11:00:00', CURRENT_DATE - INTERVAL '30 days' + TIME '14:30:00', 2, 3, NULL),    -- Venta 3 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '12:45:00', CURRENT_DATE - INTERVAL '30 days' + TIME '12:50:00', 2, 4, NULL),    -- Venta 4 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '14:20:00', CURRENT_DATE - INTERVAL '30 days' + TIME '14:25:00', 2, 5, NULL),    -- Venta 5 - Tienda física (5 min)
    
    -- Ventas de hace 29 días
    (CURRENT_DATE - INTERVAL '29 days' + TIME '08:30:00', CURRENT_DATE - INTERVAL '29 days' + TIME '12:00:00', 2, 6, NULL),    -- Venta 6 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '29 days' + TIME '09:45:00', CURRENT_DATE - INTERVAL '29 days' + TIME '09:50:00', 2, 7, NULL),    -- Venta 7 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '29 days' + TIME '10:15:00', CURRENT_DATE - INTERVAL '29 days' + TIME '10:20:00', 2, 8, NULL),    -- Venta 8 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '29 days' + TIME '11:30:00', CURRENT_DATE - INTERVAL '29 days' + TIME '15:00:00', 2, 9, NULL),    -- Venta 9 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '29 days' + TIME '13:00:00', CURRENT_DATE - INTERVAL '29 days' + TIME '13:05:00', 2, 10, NULL),   -- Venta 10 - Tienda física (5 min)
    
    -- Ventas de hace 28 días
    (CURRENT_DATE - INTERVAL '28 days' + TIME '09:00:00', CURRENT_DATE - INTERVAL '28 days' + TIME '09:05:00', 2, 11, NULL),   -- Venta 11 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '28 days' + TIME '10:20:00', CURRENT_DATE - INTERVAL '28 days' + TIME '13:50:00', 2, 12, NULL),   -- Venta 12 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '28 days' + TIME '11:45:00', CURRENT_DATE - INTERVAL '28 days' + TIME '11:50:00', 2, 13, NULL),   -- Venta 13 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '28 days' + TIME '14:30:00', CURRENT_DATE - INTERVAL '28 days' + TIME '14:35:00', 2, 14, NULL),   -- Venta 14 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '28 days' + TIME '15:00:00', CURRENT_DATE - INTERVAL '28 days' + TIME '18:30:00', 2, 15, NULL),   -- Venta 15 - Web (3.5 horas)
    
    -- Ventas de hace 25 días
    (CURRENT_DATE - INTERVAL '25 days' + TIME '08:15:00', CURRENT_DATE - INTERVAL '25 days' + TIME '08:20:00', 2, 16, NULL),   -- Venta 16 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '25 days' + TIME '09:30:00', CURRENT_DATE - INTERVAL '25 days' + TIME '09:35:00', 2, 17, NULL),   -- Venta 17 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '25 days' + TIME '10:00:00', CURRENT_DATE - INTERVAL '25 days' + TIME '13:30:00', 2, 18, NULL),   -- Venta 18 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '25 days' + TIME '11:15:00', CURRENT_DATE - INTERVAL '25 days' + TIME '11:20:00', 2, 19, NULL),   -- Venta 19 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '25 days' + TIME '14:00:00', CURRENT_DATE - INTERVAL '25 days' + TIME '14:05:00', 2, 20, NULL),   -- Venta 20 - Tienda física (5 min)
    
    -- Ventas de hace 20 días
    (CURRENT_DATE - INTERVAL '20 days' + TIME '09:45:00', CURRENT_DATE - INTERVAL '20 days' + TIME '13:15:00', 2, 21, NULL),   -- Venta 21 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '20 days' + TIME '10:30:00', CURRENT_DATE - INTERVAL '20 days' + TIME '10:35:00', 2, 22, NULL),   -- Venta 22 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '20 days' + TIME '11:00:00', CURRENT_DATE - INTERVAL '20 days' + TIME '11:05:00', 2, 23, NULL),   -- Venta 23 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '20 days' + TIME '12:15:00', CURRENT_DATE - INTERVAL '20 days' + TIME '15:45:00', 2, 24, NULL),   -- Venta 24 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '20 days' + TIME '13:30:00', CURRENT_DATE - INTERVAL '20 days' + TIME '13:35:00', 2, 25, NULL),   -- Venta 25 - Tienda física (5 min)
    
    -- Ventas de hace 15 días
    (CURRENT_DATE - INTERVAL '15 days' + TIME '08:00:00', CURRENT_DATE - INTERVAL '15 days' + TIME '08:05:00', 2, 26, NULL),   -- Venta 26 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '15 days' + TIME '09:15:00', CURRENT_DATE - INTERVAL '15 days' + TIME '12:45:00', 2, 27, NULL),   -- Venta 27 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '15 days' + TIME '10:30:00', CURRENT_DATE - INTERVAL '15 days' + TIME '10:35:00', 2, 28, NULL),   -- Venta 28 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '15 days' + TIME '11:45:00', CURRENT_DATE - INTERVAL '15 days' + TIME '11:50:00', 2, 29, NULL),   -- Venta 29 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '15 days' + TIME '14:00:00', CURRENT_DATE - INTERVAL '15 days' + TIME '17:30:00', 2, 30, NULL),   -- Venta 30 - Web (3.5 horas)
    
    -- Ventas de hace 10 días
    (CURRENT_DATE - INTERVAL '10 days' + TIME '09:00:00', CURRENT_DATE - INTERVAL '10 days' + TIME '09:05:00', 2, 31, NULL),   -- Venta 31 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '10 days' + TIME '10:15:00', CURRENT_DATE - INTERVAL '10 days' + TIME '10:20:00', 2, 32, NULL),   -- Venta 32 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '10 days' + TIME '11:30:00', CURRENT_DATE - INTERVAL '10 days' + TIME '15:00:00', 2, 33, NULL),   -- Venta 33 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '10 days' + TIME '12:45:00', CURRENT_DATE - INTERVAL '10 days' + TIME '12:50:00', 2, 34, NULL),   -- Venta 34 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '10 days' + TIME '14:00:00', CURRENT_DATE - INTERVAL '10 days' + TIME '14:05:00', 2, 35, NULL),   -- Venta 35 - Tienda física (5 min)
    
    -- Ventas de hace 7 días
    (CURRENT_DATE - INTERVAL '7 days' + TIME '08:30:00', CURRENT_DATE - INTERVAL '7 days' + TIME '12:00:00', 2, 36, NULL),    -- Venta 36 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '7 days' + TIME '09:45:00', CURRENT_DATE - INTERVAL '7 days' + TIME '09:50:00', 2, 37, NULL),    -- Venta 37 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '7 days' + TIME '10:00:00', CURRENT_DATE - INTERVAL '7 days' + TIME '10:05:00', 2, 38, NULL),    -- Venta 38 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '7 days' + TIME '11:15:00', CURRENT_DATE - INTERVAL '7 days' + TIME '14:45:00', 2, 39, NULL),    -- Venta 39 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '7 days' + TIME '13:00:00', CURRENT_DATE - INTERVAL '7 days' + TIME '13:05:00', 2, 40, NULL),    -- Venta 40 - Tienda física (5 min)
    
    -- Ventas de hace 5 días
    (CURRENT_DATE - INTERVAL '5 days' + TIME '09:00:00', CURRENT_DATE - INTERVAL '5 days' + TIME '09:05:00', 2, 41, NULL),    -- Venta 41 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '5 days' + TIME '10:30:00', CURRENT_DATE - INTERVAL '5 days' + TIME '14:00:00', 2, 42, NULL),    -- Venta 42 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '5 days' + TIME '11:45:00', CURRENT_DATE - INTERVAL '5 days' + TIME '11:50:00', 2, 43, NULL),    -- Venta 43 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '5 days' + TIME '13:00:00', CURRENT_DATE - INTERVAL '5 days' + TIME '13:05:00', 2, 44, NULL),    -- Venta 44 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '5 days' + TIME '14:30:00', CURRENT_DATE - INTERVAL '5 days' + TIME '18:00:00', 2, 45, NULL),    -- Venta 45 - Web (3.5 horas)
    
    -- Ventas de hace 3 días
    (CURRENT_DATE - INTERVAL '3 days' + TIME '08:15:00', CURRENT_DATE - INTERVAL '3 days' + TIME '08:20:00', 2, 46, NULL),    -- Venta 46 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '3 days' + TIME '09:30:00', CURRENT_DATE - INTERVAL '3 days' + TIME '09:35:00', 2, 47, NULL),    -- Venta 47 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '3 days' + TIME '10:00:00', CURRENT_DATE - INTERVAL '3 days' + TIME '13:30:00', 2, 48, NULL),    -- Venta 48 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '3 days' + TIME '11:15:00', CURRENT_DATE - INTERVAL '3 days' + TIME '11:20:00', 2, 49, NULL),    -- Venta 49 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '3 days' + TIME '14:00:00', CURRENT_DATE - INTERVAL '3 days' + TIME '14:05:00', 2, 50, NULL),    -- Venta 50 - Tienda física (5 min)
    
    -- Ventas de ayer
    (CURRENT_DATE - INTERVAL '1 day' + TIME '08:30:00', CURRENT_DATE - INTERVAL '1 day' + TIME '12:00:00', 2, 51, NULL),     -- Venta 51 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '09:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '09:05:00', 2, 52, NULL),     -- Venta 52 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '09:45:00', CURRENT_DATE - INTERVAL '1 day' + TIME '09:50:00', 2, 53, NULL),     -- Venta 53 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '10:15:00', CURRENT_DATE - INTERVAL '1 day' + TIME '13:45:00', 2, 54, NULL),     -- Venta 54 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '11:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '11:05:00', 2, 55, NULL),     -- Venta 55 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '11:30:00', CURRENT_DATE - INTERVAL '1 day' + TIME '11:35:00', 2, 56, NULL),     -- Venta 56 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '12:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '15:30:00', 2, 57, NULL),     -- Venta 57 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '13:15:00', CURRENT_DATE - INTERVAL '1 day' + TIME '13:20:00', 2, 58, NULL),     -- Venta 58 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '14:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '14:05:00', 2, 59, NULL),     -- Venta 59 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '14:30:00', CURRENT_DATE - INTERVAL '1 day' + TIME '18:00:00', 2, 60, NULL),     -- Venta 60 - Web (3.5 horas)
    
    -- Ventas de hoy (más recientes)
    (CURRENT_DATE + TIME '08:00:00', CURRENT_DATE + TIME '08:05:00', 2, 61, NULL),     -- Venta 61 - Tienda física (5 min)
    (CURRENT_DATE + TIME '08:30:00', CURRENT_DATE + TIME '08:35:00', 2, 62, NULL),     -- Venta 62 - Tienda física (5 min)
    (CURRENT_DATE + TIME '09:00:00', CURRENT_DATE + TIME '12:30:00', 2, 63, NULL),     -- Venta 63 - Web (3.5 horas)
    (CURRENT_DATE + TIME '09:15:00', CURRENT_DATE + TIME '09:20:00', 2, 64, NULL),     -- Venta 64 - Tienda física (5 min)
    (CURRENT_DATE + TIME '09:45:00', CURRENT_DATE + TIME '09:50:00', 2, 65, NULL),     -- Venta 65 - Tienda física (5 min)
    (CURRENT_DATE + TIME '10:00:00', CURRENT_DATE + TIME '13:30:00', 2, 66, NULL),     -- Venta 66 - Web (3.5 horas)
    (CURRENT_DATE + TIME '10:30:00', CURRENT_DATE + TIME '10:35:00', 2, 67, NULL),     -- Venta 67 - Tienda física (5 min)
    (CURRENT_DATE + TIME '11:00:00', CURRENT_DATE + TIME '11:05:00', 2, 68, NULL),     -- Venta 68 - Tienda física (5 min)
    (CURRENT_DATE + TIME '11:15:00', CURRENT_DATE + TIME '14:45:00', 2, 69, NULL),     -- Venta 69 - Web (3.5 horas)
    (CURRENT_DATE + TIME '11:45:00', CURRENT_DATE + TIME '11:50:00', 2, 70, NULL),     -- Venta 70 - Tienda física (5 min)
    (CURRENT_DATE + TIME '12:00:00', CURRENT_DATE + TIME '12:05:00', 2, 71, NULL),     -- Venta 71 - Tienda física (5 min)
    (CURRENT_DATE + TIME '12:30:00', CURRENT_DATE + TIME '16:00:00', 2, 72, NULL),     -- Venta 72 - Web (3.5 horas)
    (CURRENT_DATE + TIME '13:00:00', CURRENT_DATE + TIME '13:05:00', 2, 73, NULL),     -- Venta 73 - Tienda física (5 min)
    (CURRENT_DATE + TIME '13:30:00', CURRENT_DATE + TIME '13:35:00', 2, 74, NULL),     -- Venta 74 - Tienda física (5 min)
    (CURRENT_DATE + TIME '14:00:00', CURRENT_DATE + TIME '17:30:00', 2, 75, NULL),     -- Venta 75 - Web (3.5 horas)
    (CURRENT_DATE + TIME '14:15:00', CURRENT_DATE + TIME '14:20:00', 2, 76, NULL),     -- Venta 76 - Tienda física (5 min)
    (CURRENT_DATE + TIME '14:45:00', CURRENT_DATE + TIME '14:50:00', 2, 77, NULL),     -- Venta 77 - Tienda física (5 min)
    (CURRENT_DATE + TIME '15:00:00', CURRENT_DATE + TIME '18:30:00', 2, 78, NULL),     -- Venta 78 - Web (3.5 horas)
    (CURRENT_DATE + TIME '15:30:00', CURRENT_DATE + TIME '15:35:00', 2, 79, NULL),     -- Venta 79 - Tienda física (5 min)
    (CURRENT_DATE + TIME '16:00:00', CURRENT_DATE + TIME '16:05:00', 2, 80, NULL),     -- Venta 80 - Tienda física (5 min)
    
    -- Ventas pendientes de completar (aún en proceso)
    (CURRENT_DATE + TIME '16:30:00', NULL, 2, 81, NULL),     -- Venta 81 - Web (pendiente)
    (CURRENT_DATE + TIME '17:00:00', NULL, 2, 82, NULL),     -- Venta 82 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '17:15:00', NULL, 2, 83, NULL),     -- Venta 83 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '17:30:00', NULL, 2, 84, NULL),     -- Venta 84 - Web (pendiente)
    (CURRENT_DATE + TIME '17:45:00', NULL, 2, 85, NULL),     -- Venta 85 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '18:00:00', NULL, 2, 86, NULL),     -- Venta 86 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '18:15:00', NULL, 2, 87, NULL),     -- Venta 87 - Web (pendiente)
    (CURRENT_DATE + TIME '18:30:00', NULL, 2, 88, NULL),     -- Venta 88 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '18:45:00', NULL, 2, 89, NULL),     -- Venta 89 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '19:00:00', NULL, 2, 90, NULL),     -- Venta 90 - Web (pendiente)

    -- Registros de status Completado (5) para las ventas que ya se completaron
    -- Ventas completadas del último mes
    (CURRENT_DATE - INTERVAL '30 days' + TIME '09:20:00', NULL, 5, 1, NULL),    -- Venta 1 - Completado
    (CURRENT_DATE - INTERVAL '30 days' + TIME '10:35:00', NULL, 5, 2, NULL),    -- Venta 2 - Completado
    (CURRENT_DATE - INTERVAL '30 days' + TIME '14:30:00', NULL, 5, 3, NULL),    -- Venta 3 - Completado
    (CURRENT_DATE - INTERVAL '30 days' + TIME '12:50:00', NULL, 5, 4, NULL),    -- Venta 4 - Completado
    (CURRENT_DATE - INTERVAL '30 days' + TIME '14:25:00', NULL, 5, 5, NULL),    -- Venta 5 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '12:00:00', NULL, 5, 6, NULL),    -- Venta 6 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '09:50:00', NULL, 5, 7, NULL),    -- Venta 7 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '10:20:00', NULL, 5, 8, NULL),    -- Venta 8 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '15:00:00', NULL, 5, 9, NULL),    -- Venta 9 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '13:05:00', NULL, 5, 10, NULL),   -- Venta 10 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '09:05:00', NULL, 5, 11, NULL),   -- Venta 11 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '13:50:00', NULL, 5, 12, NULL),   -- Venta 12 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '11:50:00', NULL, 5, 13, NULL),   -- Venta 13 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '14:35:00', NULL, 5, 14, NULL),   -- Venta 14 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '18:30:00', NULL, 5, 15, NULL),   -- Venta 15 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '08:20:00', NULL, 5, 16, NULL),   -- Venta 16 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '09:35:00', NULL, 5, 17, NULL),   -- Venta 17 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '13:30:00', NULL, 5, 18, NULL),   -- Venta 18 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '11:20:00', NULL, 5, 19, NULL),   -- Venta 19 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '14:05:00', NULL, 5, 20, NULL),   -- Venta 20 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '13:15:00', NULL, 5, 21, NULL),   -- Venta 21 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '10:35:00', NULL, 5, 22, NULL),   -- Venta 22 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '11:05:00', NULL, 5, 23, NULL),   -- Venta 23 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '15:45:00', NULL, 5, 24, NULL),   -- Venta 24 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '13:35:00', NULL, 5, 25, NULL),   -- Venta 25 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '08:05:00', NULL, 5, 26, NULL),   -- Venta 26 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '12:45:00', NULL, 5, 27, NULL),   -- Venta 27 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '10:35:00', NULL, 5, 28, NULL),   -- Venta 28 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '11:50:00', NULL, 5, 29, NULL),   -- Venta 29 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '17:30:00', NULL, 5, 30, NULL),   -- Venta 30 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '09:05:00', NULL, 5, 31, NULL),   -- Venta 31 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '10:20:00', NULL, 5, 32, NULL),   -- Venta 32 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '15:00:00', NULL, 5, 33, NULL),   -- Venta 33 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '12:50:00', NULL, 5, 34, NULL),   -- Venta 34 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '14:05:00', NULL, 5, 35, NULL),   -- Venta 35 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '12:00:00', NULL, 5, 36, NULL),    -- Venta 36 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '09:50:00', NULL, 5, 37, NULL),    -- Venta 37 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '10:05:00', NULL, 5, 38, NULL),    -- Venta 38 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '14:45:00', NULL, 5, 39, NULL),    -- Venta 39 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '13:05:00', NULL, 5, 40, NULL),    -- Venta 40 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '09:05:00', NULL, 5, 41, NULL),    -- Venta 41 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '14:00:00', NULL, 5, 42, NULL),    -- Venta 42 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '11:50:00', NULL, 5, 43, NULL),    -- Venta 43 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '13:05:00', NULL, 5, 44, NULL),    -- Venta 44 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '18:00:00', NULL, 5, 45, NULL),    -- Venta 45 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '08:20:00', NULL, 5, 46, NULL),    -- Venta 46 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '09:35:00', NULL, 5, 47, NULL),    -- Venta 47 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '13:30:00', NULL, 5, 48, NULL),    -- Venta 48 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '11:20:00', NULL, 5, 49, NULL),    -- Venta 49 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '14:05:00', NULL, 5, 50, NULL),    -- Venta 50 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '12:00:00', NULL, 5, 51, NULL),     -- Venta 51 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '09:05:00', NULL, 5, 52, NULL),     -- Venta 52 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '09:50:00', NULL, 5, 53, NULL),     -- Venta 53 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '13:45:00', NULL, 5, 54, NULL),     -- Venta 54 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '11:05:00', NULL, 5, 55, NULL),     -- Venta 55 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '11:35:00', NULL, 5, 56, NULL),     -- Venta 56 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '15:30:00', NULL, 5, 57, NULL),     -- Venta 57 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '13:20:00', NULL, 5, 58, NULL),     -- Venta 58 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '14:05:00', NULL, 5, 59, NULL),     -- Venta 59 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '18:00:00', NULL, 5, 60, NULL),     -- Venta 60 - Completado
    (CURRENT_DATE + TIME '08:05:00', NULL, 5, 61, NULL),     -- Venta 61 - Completado
    (CURRENT_DATE + TIME '08:35:00', NULL, 5, 62, NULL),     -- Venta 62 - Completado
    (CURRENT_DATE + TIME '12:30:00', NULL, 5, 63, NULL),     -- Venta 63 - Completado
    (CURRENT_DATE + TIME '09:20:00', NULL, 5, 64, NULL),     -- Venta 64 - Completado
    (CURRENT_DATE + TIME '09:50:00', NULL, 5, 65, NULL),     -- Venta 65 - Completado
    (CURRENT_DATE + TIME '13:30:00', NULL, 5, 66, NULL),     -- Venta 66 - Completado
    (CURRENT_DATE + TIME '10:35:00', NULL, 5, 67, NULL),     -- Venta 67 - Completado
    (CURRENT_DATE + TIME '11:05:00', NULL, 5, 68, NULL),     -- Venta 68 - Completado
    (CURRENT_DATE + TIME '14:45:00', NULL, 5, 69, NULL),     -- Venta 69 - Completado
    (CURRENT_DATE + TIME '11:50:00', NULL, 5, 70, NULL),     -- Venta 70 - Completado
    (CURRENT_DATE + TIME '12:05:00', NULL, 5, 71, NULL),     -- Venta 71 - Completado
    (CURRENT_DATE + TIME '16:00:00', NULL, 5, 72, NULL),     -- Venta 72 - Completado
    (CURRENT_DATE + TIME '13:05:00', NULL, 5, 73, NULL),     -- Venta 73 - Completado
    (CURRENT_DATE + TIME '13:35:00', NULL, 5, 74, NULL),     -- Venta 74 - Completado
    (CURRENT_DATE + TIME '17:30:00', NULL, 5, 75, NULL),     -- Venta 75 - Completado
    (CURRENT_DATE + TIME '14:20:00', NULL, 5, 76, NULL),     -- Venta 76 - Completado
    (CURRENT_DATE + TIME '14:50:00', NULL, 5, 77, NULL),     -- Venta 77 - Completado
    (CURRENT_DATE + TIME '18:30:00', NULL, 5, 78, NULL),     -- Venta 78 - Completado
    (CURRENT_DATE + TIME '15:35:00', NULL, 5, 79, NULL),     -- Venta 79 - Completado
    (CURRENT_DATE + TIME '16:05:00', NULL, 5, 80, NULL);     -- Venta 80 - Completado
    -- Las ventas 81-90 aún no tienen registro de completado porque siguen en proceso
