CREATE OR REPLACE FUNCTION refresh_bcv_rates ()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    v_status int;
    v_json   jsonb;
    v_rate   numeric(14,4);
    v_hoy    date := current_date;
BEGIN
    ----------------------------------------------------------------
    -- 1) Llamada HTTP
    ----------------------------------------------------------------
    SELECT status, content::jsonb
      INTO v_status, v_json
      FROM http_get(
        'https://pydolarve.org/api/v2/tipo-cambio?currency=usd&format_date=timestamp&rounded_price=true'
      );

    IF v_status <> 200 THEN
        RAISE WARNING 'HTTP % – no se pudo contactar la API', v_status;
        RETURN;
    END IF;

    ----------------------------------------------------------------
    -- 2) Detectar dónde viene el precio
    ----------------------------------------------------------------
    IF (v_json ? 'price') THEN          -- precio al nivel raíz
        v_rate := (v_json ->> 'price')::numeric;
    ELSIF (v_json ? 'monitors') THEN    -- precio dentro de monitors → bcv
        v_rate := (v_json ->'monitors'->'bcv'->>'price')::numeric;
    END IF;

    IF v_rate IS NULL THEN
        RAISE WARNING 'No encontré el campo price en la respuesta: %', v_json;
        RETURN;
    END IF;

    v_rate := round(v_rate, 4);         -- fija a 4 decimales

    ----------------------------------------------------------------
    -- 3) Cerrar la tasa vigente (si existe)
    ----------------------------------------------------------------
    UPDATE tasa
       SET fecha_fin = v_hoy
     WHERE moneda    = 'USD'
       AND fecha_fin IS NULL;

    ----------------------------------------------------------------
    -- 4) Insertar o actualizar la tasa del día
    ----------------------------------------------------------------
    INSERT INTO tasa (moneda, monto_equivalencia, fecha_inicio, fecha_fin)
    VALUES ('USD', v_rate, v_hoy, NULL)
    ON CONFLICT (moneda, fecha_inicio) DO
        UPDATE SET monto_equivalencia = EXCLUDED.monto_equivalencia,
                   fecha_fin          = NULL;

    RAISE NOTICE 'Tasa BCV guardada: 1 USD = % Bs. (%).', v_rate, v_hoy;
EXCEPTION
    WHEN others THEN
        RAISE WARNING 'Error inesperado: %', sqlerrm;
END;
$$;
