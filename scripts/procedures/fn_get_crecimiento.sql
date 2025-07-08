DROP FUNCTION IF EXISTS fn_get_crecimiento_ventas(DATE, VARCHAR);

CREATE OR REPLACE FUNCTION fn_get_crecimiento_ventas(
    fecha_referencia DATE,
    tipo_comparacion VARCHAR
)
RETURNS TABLE (
    periodo TEXT,
    ventas_totales DECIMAL,
    crecimiento_abs DECIMAL,
    crecimiento_pct DECIMAL
)
LANGUAGE plpgsql
AS $$
DECLARE
    ventas_actual DECIMAL;
    ventas_anterior DECIMAL;
    fecha_inicio_actual DATE;
    fecha_fin_actual DATE;
    fecha_inicio_anterior DATE;
    fecha_fin_anterior DATE;
BEGIN
    -- Determinar los rangos de fecha según el tipo de comparación
    IF tipo_comparacion = 'mensual' THEN
        fecha_inicio_actual   := DATE_TRUNC('month', fecha_referencia)::DATE;
        fecha_fin_actual     := (DATE_TRUNC('month', fecha_referencia) + INTERVAL '1 month' - INTERVAL '1 day')::DATE;
        fecha_inicio_anterior := (DATE_TRUNC('month', fecha_referencia) - INTERVAL '1 month')::DATE;
        fecha_fin_anterior   := (DATE_TRUNC('month', fecha_referencia) - INTERVAL '1 day')::DATE;
    ELSIF tipo_comparacion = 'anual' THEN
        fecha_inicio_actual   := DATE_TRUNC('year', fecha_referencia)::DATE;
        fecha_fin_actual     := (DATE_TRUNC('year', fecha_referencia) + INTERVAL '1 year' - INTERVAL '1 day')::DATE;
        fecha_inicio_anterior := (DATE_TRUNC('year', fecha_referencia) - INTERVAL '1 year')::DATE;
        fecha_fin_anterior   := (DATE_TRUNC('year', fecha_referencia) - INTERVAL '1 day')::DATE;
    ELSE
        RAISE EXCEPTION 'El tipo de comparación debe ser ''mensual'' o ''anual''.';
    END IF;

    -- Calcular ventas para el período actual
    SELECT COALESCE(SUM(v.monto_total), 0)
    INTO ventas_actual
    FROM venta v
    WHERE v.id IN (
        SELECT sv.fk_venta
        FROM status_venta sv
        JOIN status s ON sv.fk_status = s.id
        JOIN venta v_check ON sv.fk_venta = v_check.id
        WHERE sv.fk_venta IS NOT NULL
          AND (
                (v_check.fk_tienda_web IS NOT NULL AND s.nombre = 'Despachando')
                OR
                (v_check.fk_tienda_fisica IS NOT NULL AND s.nombre = 'Completado')
          )
          AND sv.fecha_actualización::DATE BETWEEN fecha_inicio_actual AND fecha_fin_actual
    );

    -- Calcular ventas para el período anterior
    SELECT COALESCE(SUM(v.monto_total), 0)
    INTO ventas_anterior
    FROM venta v
    WHERE v.id IN (
        SELECT sv.fk_venta
        FROM status_venta sv
        JOIN status s ON sv.fk_status = s.id
        JOIN venta v_check ON sv.fk_venta = v_check.id
        WHERE sv.fk_venta IS NOT NULL
          AND (
                (v_check.fk_tienda_web IS NOT NULL AND s.nombre = 'Despachando')
                OR
                (v_check.fk_tienda_fisica IS NOT NULL AND s.nombre = 'Completado')
          )
          AND sv.fecha_actualización::DATE BETWEEN fecha_inicio_anterior AND fecha_fin_anterior
    );

    -- Devolver los resultados
    RETURN QUERY
    SELECT
        'Periodo Actual' AS periodo,
        ventas_actual AS ventas_totales,
        ventas_actual - ventas_anterior AS crecimiento_abs,
        CASE
            WHEN ventas_anterior = 0 THEN NULL
            ELSE ((ventas_actual - ventas_anterior) / ventas_anterior) * 100
        END AS crecimiento_pct
    UNION ALL
    SELECT
        'Periodo Anterior' AS periodo,
        ventas_anterior AS ventas_totales,
        NULL AS crecimiento_abs,
        NULL AS crecimiento_pct;
END;
$$;

