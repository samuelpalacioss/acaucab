/**
 * Script de configuración para el cron job de actualización de tasas BCV
 * Este script debe ejecutarse con permisos de superusuario
 * 
 * @author ACAUCAB
 * @date 2024
 */

-- =====================================================
-- 1. INSTALAR EXTENSIONES NECESARIAS
-- =====================================================

/**
 * Instalar extensión HTTP para hacer peticiones a APIs externas
 * Permite usar http_get() en funciones PL/pgSQL
 */
CREATE EXTENSION IF NOT EXISTS http;

/**
 * Instalar extensión pg_cron para programar tareas
 * Requiere configuración previa en postgresql.conf
 */
CREATE EXTENSION IF NOT EXISTS pg_cron;

/**
 * Opcionalmente instalar plpython3u para la versión Python
 * Proporciona mejor manejo de errores y parsing JSON
 */
-- CREATE EXTENSION IF NOT EXISTS plpython3u;

-- =====================================================
-- 2. CREAR FUNCIÓN DE PRUEBA
-- =====================================================

/**
 * Función para probar la conexión con la API
 * Útil para verificar que todo esté configurado correctamente
 * 
 * @returns TABLE con la información de la tasa actual
 */
CREATE OR REPLACE FUNCTION test_bcv_api()
RETURNS TABLE (
    moneda VARCHAR,
    tasa DECIMAL(10,2),
    fecha_consulta TIMESTAMP
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_response json;
    v_bcv_rate numeric;
BEGIN
    -- Realiza la solicitud HTTP usando pg_net
    SELECT response::json INTO v_response
    FROM net.http_get(
        url := 'https://pydolarve.org/api/v2/tipo-cambio?currency=usd&format_date=timestamp&rounded_price=true'
    );

    v_bcv_rate := (v_response->'monitors'->'bcv'->>'price')::numeric;

    RETURN QUERY SELECT 
        'USD'::VARCHAR as moneda,
        v_bcv_rate as tasa,
        NOW() as fecha_consulta;

    RAISE NOTICE 'Prueba exitosa: 1 USD = % Bs.', v_bcv_rate;

EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION 'Error al conectar con API: %', SQLERRM;
END;
$$;


-- =====================================================
-- 3. CONFIGURAR CRON JOBS
-- =====================================================
-- ---------------------------------------------------------------------
-- Job principal: se ejecuta todos los días a las 11:59 PM (UTC).
-- NOTA IMPORTANTE: Supabase pg_cron se ejecuta en UTC.
-- '59 23 * * *' es 11:59 PM UTC. Si tu hora de Venezuela es UTC-4,
-- 11:59 PM VET sería 03:59 AM UTC del día siguiente.
-- Ajusta el cron expression según necesites.
--
-- Ejemplo para 11:59 PM VET (UTC-4): '59 3 * * *'
-- ---------------------------------------------------------------------
SELECT cron.schedule(
    'refresh-bcv-daily',
    '59 3 * * *',  -- Cron expression en UTC (ejemplo para 11:59 PM VET)
    'SELECT refresh_bcv_rates()'
);

-- ---------------------------------------------------------------------
-- Job de respaldo: se ejecuta a las 6:00 AM UTC (2:00 AM VET)
-- solo si no hay tasa registrada para el día actual.
-- ---------------------------------------------------------------------
SELECT cron.schedule(
    'refresh-bcv-morning-backup',
    '0 6 * * *', -- Cron expression en UTC (6:00 AM UTC)
    $$
    SELECT refresh_bcv_rates()
    WHERE NOT EXISTS (
        SELECT 1 FROM tasa
        WHERE moneda = 'USD'
          AND fecha_inicio = CURRENT_DATE
    )
    $$
);

-- =====================================================
-- 4. CREAR VISTA PARA CONSULTAR TASA ACTUAL
-- =====================================================

/**
 * Vista que muestra la tasa de cambio vigente
 * Facilita las consultas en la aplicación
 */
CREATE OR REPLACE VIEW v_tasa_actual AS
SELECT 
    id,
    moneda,
    monto_equivalencia as tasa,
    fecha_inicio,
    fecha_fin
FROM tasa
WHERE fecha_fin IS NULL
   OR fecha_fin > CURRENT_DATE
ORDER BY fecha_inicio DESC;

/**
 * Función helper para obtener la tasa actual del USD
 * @returns DECIMAL - Tasa actual del USD en bolívares
 */
CREATE OR REPLACE FUNCTION get_tasa_usd_actual()
RETURNS DECIMAL(10,2)
LANGUAGE plpgsql
AS $$
DECLARE
    v_tasa DECIMAL(10,2);
BEGIN
    SELECT monto_equivalencia INTO v_tasa
    FROM tasa
    WHERE moneda = 'USD'
      AND (fecha_fin IS NULL OR fecha_fin > CURRENT_DATE)
    ORDER BY fecha_inicio DESC
    LIMIT 1;
    
    IF v_tasa IS NULL THEN
        RAISE EXCEPTION 'No hay tasa USD vigente';
    END IF;
    
    RETURN v_tasa;
END;
$$;

-- =====================================================
-- 5. MONITOREO Y ALERTAS
-- =====================================================

/**
 * Tabla para registrar el historial de actualizaciones
 */
CREATE TABLE IF NOT EXISTS bcv_update_log (
    id SERIAL PRIMARY KEY,
    fecha_ejecucion TIMESTAMP DEFAULT NOW(),
    exitoso BOOLEAN,
    mensaje TEXT,
    tasa_obtenida DECIMAL(10,2)
);

/**
 * Función modificada con logging
 */
CREATE OR REPLACE FUNCTION refresh_bcv_rates_with_log()
RETURNS void 
LANGUAGE plpgsql
AS $$
DECLARE
    v_response json;
    v_bcv_rate numeric;
    v_fecha_actual date;
BEGIN
    v_fecha_actual := CURRENT_DATE;
    
    BEGIN
        -- Cerrar tasas anteriores
        UPDATE tasa 
        SET fecha_fin = v_fecha_actual
        WHERE moneda = 'USD' 
          AND fecha_fin IS NULL;
        
        -- Obtener nueva tasa
        SELECT content::json INTO v_response
        FROM http_get('https://api.pydolarve.org/api/v2/tipo-cambio?currency=usd&format_date=default&rounded_price=true');
        
        v_bcv_rate := (v_response->'monitors'->'bcv'->>'price')::numeric;
        
        -- Insertar nueva tasa
        INSERT INTO tasa (moneda, monto_equivalencia, fecha_inicio, fecha_fin)
        VALUES ('USD', v_bcv_rate, v_fecha_actual, NULL);
        
        -- Registrar éxito
        INSERT INTO bcv_update_log (exitoso, mensaje, tasa_obtenida)
        VALUES (true, 'Actualización exitosa', v_bcv_rate);
        
        RAISE NOTICE 'Tasa BCV actualizada: 1 USD = % Bs.', v_bcv_rate;
        
    EXCEPTION
        WHEN OTHERS THEN
            -- Registrar error
            INSERT INTO bcv_update_log (exitoso, mensaje, tasa_obtenida)
            VALUES (false, SQLERRM, NULL);
            
            RAISE WARNING 'Error al actualizar tasa BCV: %', SQLERRM;
    END;
END;
$$;

-- =====================================================
-- 6. QUERIES DE VERIFICACIÓN
-- =====================================================

-- Ver jobs programados
-- SELECT * FROM cron.job;

-- Ver últimas tasas
-- SELECT * FROM tasa WHERE moneda = 'USD' ORDER BY fecha_inicio DESC LIMIT 10;

-- Ver log de actualizaciones
-- SELECT * FROM bcv_update_log ORDER BY fecha_ejecucion DESC LIMIT 10;

-- Probar la API
-- SELECT * FROM test_bcv_api(); 