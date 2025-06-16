/** 
 * Archivo de reinicio de secuencias a valor 0
 * Resetea todas las secuencias automáticas a 0
 * El próximo valor generado automáticamente será 1
 */

/** Reinicio de secuencia para tabla color */
SELECT SETVAL('color_id_seq', 0, false);

/** Reinicio de secuencia para tabla tipo_cerveza */
SELECT SETVAL('tipo_cerveza_id_seq', 0, false);

/** Reinicio de secuencia para tabla cerveza */
SELECT SETVAL('cerveza_id_seq', 0, false);

/** Reinicio de secuencia para tabla caracteristica */
SELECT SETVAL('caracteristica_id_seq', 0, false);

/** Reinicio de secuencia para tabla ingrediente */
SELECT SETVAL('ingrediente_id_seq', 0, false);

/** Reinicio de secuencia para tabla tipo_cerveza_ingrediente */
SELECT SETVAL('tipo_cerveza_ingrediente_id_seq', 0, false);

/** Reinicio de secuencia para tabla periodo_descuento */
SELECT SETVAL('periodo_descuento_id_seq', 0, false);

/** Reinicio de secuencia para tabla presentacion */
SELECT SETVAL('presentacion_id_seq', 0, false);

/** Reinicio de secuencia para tabla presentacion_cerveza */
SELECT SETVAL('presentacion_cerveza_id_seq', 0, false);

/** Reinicio de secuencia para tabla descuento */
SELECT SETVAL('descuento_id_seq', 0, false);

/** Reinicio de secuencia para tabla cerveza_caracteristica */
SELECT SETVAL('cerveza_caracteristica_id_seq', 0, false);

/** 
 * Verificación de las secuencias ajustadas - consulta informativa
 * Ejecutar estas consultas para verificar que las secuencias están correctamente configuradas
 */

-- SELECT 'color_id_seq' as tabla, currval('color_id_seq') as valor_actual
-- UNION ALL
-- SELECT 'tipo_cerveza_id_seq', currval('tipo_cerveza_id_seq')
-- UNION ALL  
-- SELECT 'cerveza_id_seq', currval('cerveza_id_seq')
-- UNION ALL
-- SELECT 'caracteristica_id_seq', currval('caracteristica_id_seq')
-- UNION ALL
-- SELECT 'ingrediente_id_seq', currval('ingrediente_id_seq')
-- UNION ALL
-- SELECT 'tipo_cerveza_ingrediente_id_seq', currval('tipo_cerveza_ingrediente_id_seq')
-- UNION ALL
-- SELECT 'periodo_descuento_id_seq', currval('periodo_descuento_id_seq')
-- UNION ALL
-- SELECT 'presentacion_id_seq', currval('presentacion_id_seq')
-- UNION ALL
-- SELECT 'presentacion_cerveza_id_seq', currval('presentacion_cerveza_id_seq')
-- UNION ALL
-- SELECT 'descuento_id_seq', currval('descuento_id_seq')
-- UNION ALL
-- SELECT 'cerveza_caracteristica_id_seq', currval('cerveza_caracteristica_id_seq'); 