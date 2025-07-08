CREATE OR REPLACE FUNCTION fn_retencion_clientes(p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS NUMERIC AS $$
DECLARE
    v_clientes_recurrentes INTEGER;
    v_total_clientes       INTEGER;
    v_tasa_retencion       NUMERIC;
BEGIN
    /**
     * Fórmula utilizada:
     * Tasa de Retención = (Clientes que compraron más de una vez / Total de clientes únicos) * 100
     */

    WITH ventas_con_cliente AS (
        SELECT DISTINCT
            v.id AS venta_id,
            -- Se crea un ID de cliente unificado para rastrear compras de forma consistente
            COALESCE(
                'natural_' || v.fk_cliente_natural::TEXT,
                'juridico_' || v.fk_cliente_juridico::TEXT,
                'natural_' || cu.fk_cliente_natural::TEXT,
                'juridico_' || cu.fk_cliente_juridico::TEXT
            ) AS cliente_id_unificado
        FROM venta v
        JOIN status_venta sv ON v.id = sv.fk_venta
        -- Se une con cliente_usuario para resolver los clientes de ventas web
        LEFT JOIN cliente_usuario cu ON v.fk_usuario = cu.fk_usuario
        WHERE sv.fecha_actualización::date BETWEEN p_fecha_inicio AND p_fecha_fin
    ),
    compras_por_cliente AS (
        SELECT
            cliente_id_unificado,
            COUNT(venta_id) AS numero_de_compras
        FROM ventas_con_cliente
        WHERE cliente_id_unificado IS NOT NULL
        GROUP BY cliente_id_unificado
    )
    SELECT
        COUNT(*),
        COUNT(*) FILTER (WHERE numero_de_compras > 1)
    INTO
        v_total_clientes,
        v_clientes_recurrentes
    FROM compras_por_cliente;

    /**
     * Paso 3: Calcular la tasa de retención.
     * Si no hay clientes en el período, la tasa es 0 para evitar la división por cero.
     */
    IF v_total_clientes > 0 THEN
        v_tasa_retencion := (v_clientes_recurrentes::NUMERIC / v_total_clientes::NUMERIC) * 100;
    ELSE
        v_tasa_retencion := 0;
    END IF;

    /**
     * Paso 4: Retornar el valor calculado.
     */
    RETURN v_tasa_retencion;

END;
$$ LANGUAGE plpgsql;
