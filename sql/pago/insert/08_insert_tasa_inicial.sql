/**
 * Script de inserción inicial para la tabla tasa
 * Incluye datos de ejemplo para desarrollo y testing
 * 
 * NOTA: En producción, estos datos serán reemplazados por el cron job
 */

-- Limpiar datos existentes (solo para desarrollo)
-- DELETE FROM tasa WHERE moneda = 'USD';

 
/**
 * Verificar inserción
 */
SELECT 
    id,
    moneda,
    monto_equivalencia as tasa,
    fecha_inicio,
    fecha_fin,
    CASE 
        WHEN fecha_fin IS NULL THEN 'Vigente'
        WHEN fecha_fin > CURRENT_DATE THEN 'Vigente'
        ELSE 'Histórico'
    END as estado
FROM tasa
WHERE moneda = 'USD'
ORDER BY fecha_inicio DESC
LIMIT 10; 